var TaskTracker=angular.module('TaskTracker',[]);

TaskTracker.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

TaskTracker.controller('TaskList', function($scope){
    var i=1;
    $scope.list=[{
            id:0,
            title:"Первое задание", 
            state:"true", 
            date:"Today",
            customer:"Заказчик",
            performer:"Исполнитель"},
    {
            id:1,
            title:"Второе задание", 
            state:"true", 
            date:"Today",
            customer:"Заказчик",
            performer:"Исполнитель"}];
    
    $scope.title="Еще одно задание";
    $scope.state="true | false";
    $scope.date="Today";
    $scope.customer="Заказчик";
    $scope.performer="Исполнитель";
    
    $scope.addTask=function(){
	$scope.list.push({
		id: ++i,
		name:$scope.name,
		title:$scope.title,
		date:$scope.date,
		state:$scope.state,
                customer:$scope.customer,
                performer:$scope.performer});
    };
    
    $scope.delTask=function(id){
        for (var i=0; i < $scope.list.length; i++){
		if (id==$scope.list[i].id) {
			$scope.list.splice(i,1);
		}
	}; 
    };/*
    $scope.deleteTask=function(task_id){
	for (var i=0; i < $scope.list.length; i++){
		if (task_id==$scope.list[i].id) {
			$scope.list.splice(i,1);
		}
	}; 
    };*/
});