var TaskTracker=angular.module('TaskTracker',[]);

TaskTracker.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

TaskTracker.controller('TaskCtrl', ['$scope', '$http', 'Task', 'taskMan', function($scope, $http){
    $scope.task=new Task;   
    $scope.task.load(1);
    
    $scope.tasks=[];

    var taskID;
    
    $http.get('/tasks/'+taskID).success(function(TaskData){ 
        $scope.task=TaskData;
    });
        
    $scope.deleteTask = function() {  
          $http.delete('/tasks/' + taskID);  
     };   
    
    $scope.updateTask = function() {  
          $http.put('/tasks/' + taskID, $scope.task);
      };
}]);

TaskTracker.factory('Task',['$http', function($http){
    function Task(taskData){
        if (taskData)  {
            this.setData(taskData);
        }
    };
    
    Task.prototype = {
        setData: function(taskData) {
            angular.extend(this.taskData);
        },
            
        delete: function(){
            $http.delete('/tasks/'+taskID);
        },
        
        update: function(){
            $http.put('/tasks/'+taskID, this);
        }
    };
    return Task;
}]);

TaskTracker.factory('taskMan', ['$http', '$q', 'Task', function($http, $q, $book){
        var taskMan = {
            _pool: {},
            _retrieveInstance: function(taskID, taskData) {
                var instance = this._pool[taskID];
                if (instance) {
                    instance.setData(taskData);
                }else {
                    instance=new Task(taskData);
                    this._pool[taskID]=instance;
                }
                return instance;
            },
            _search:function(taskID){
                this._pool[taskID];
            },
            _load: function(taskID, differed){
                var scope = this;
                $http.get('/tasks/'+taskID)
                        .success(function(taskData){
                            var task = scope._retrieveInstance(taskData.id, taskData);
                            deferred.resolve(task);
                        })
                        .error(function(){
                            deferred.reject();
                        });
            },
            getTask: function(taskID){
                var deferred = $q.defer();
                var task = this._search(taskID);
                if (task) {
                    deferred.resolve(task);
                } else {
                    this._load(taskID, deferred);
                }
                return deferred.promise;
            },
            loadAllTasks: function() {
                var deferred = $q.defer();
                var scope = this;
                $http.get('/tasks')
                        .success(function(tasksArray){
                            var tasks=[];
                            tasksArray.forEach(function(taskData){
                                var task = scope._retrieveInstance(taskData.id, taskData);
                                tasks.push(task);
                            });
                            deferred.resolve(tasks);
                        })
                        .error(function(){
                            deferred.reject();
                        });
                return deferred.promise;
            },
            
            setTask: function(taskData){
                var scope = this;
                var task = this._search(taskData.id);
                if (task) {
                    task.setData(taskData);
                } else {
                    task = scope._retrieveInstance(taskData);
                }
                return task;
            }
        };
    return taskMan;
}]);