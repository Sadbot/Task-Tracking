/*	based on Angular 1.4.7
	author: Andrey Cherabaev, Master of Kludge
	I'm really sorry but if you see this, then later your eyes may start bleed.
*/
var TaskManager=angular.module('TaskManager',['ngRoute', 'ngStorage']);

TaskManager.config (['$routeProvider', function($routeProvider){
	$routeProvider
		.when ('/my-desk',{
			templateUrl:'tpl/index.tpl',
			controller: 'FillForm'
		})
		.otherwise({ redirectTo: '/my-desk' });
}]);


TaskManager.filter('trusted',['$sce',function($sce){return function(text){return $sce.trustAsHtml(text);};}]);

TaskManager.controller ('FillForm', function($scope, $localStorage){

// Блок конфигурации инструментов разработчика
$scope.enableAdmin		= 	enableAdmin;	// Супер-пользователь "Admin"
$scope.disableDelete	=	disableDelete;	// Кнопка для удаления всех записей "Delete All"
$scope.enableUserList	=	enableUserList;	// Список пользователей 
$scope.enableID			=	enableID;	// Идентификатор задания "id:" (порядковый номер задания в массиве)
// Конец блока

$scope.$storage = $localStorage;//Инициализация Local Storage;
username="";
if ($scope.$storage.i==null || $scope.$storage.i==undefined) {
$scope.$storage.i=0;
$scope.$storage.tasks=[];
//Заполняем массив заданий пользователя Andrew
$scope.$storage.tasks.push(	{id:'0',name:'Andrew',title:'Task 1',date:'Today',state:'to_do'},
							{id:'1',name:'Andrew',title:'Task 2',date:'Today',state:'doing'},
							{id:'2',name:'Andrew',title:'Task 3',date:'Today',state:'done'},
							{id:'3',name:'Andrew',title:'Task 4',date:'Today',state:'done'});
//Заполняем массив заданий пользователя Francis Pritchard
$scope.$storage.tasks.push(	{id:'4',name:'Francis',title:'Task 1',date:'Today',state:'to_do'},
							{id:'5',name:'Francis',title:'Task 2',date:'Today',state:'to_do'},
							{id:'6',name:'Francis',title:'Task 3',date:'Today',state:'doing'},
							{id:'7',name:'Francis',title:'Task 4',date:'Today',state:'done'},
							{id:'8',name:'Francis',title:'Task 5',date:'Today',state:'done'});
//Заполняем массив заданий пользователя Adam Jensen
$scope.$storage.tasks.push(	{id:'9',name:'Adam',title:'Task 1',date:'Today',state:'to_do'},
							{id:'10',name:'Adam',title:'Task 2',date:'Today',state:'to_do'},
							{id:'11',name:'Adam',title:'Task 3',date:'Today',state:'doing'},
							{id:'12',name:'Adam',title:'Task 4',date:'Today',state:'doing'},
							{id:'13',name:'Adam',title:'Task 5',date:'Today',state:'done'},
							{id:'14',name:'Adam',title:'Task 6',date:'Today',state:'done'},
							{id:'15',name:'Adam',title:'Task 7',date:'Today',state:'done'});
//Заполняем массив заданий пользователя Admin
$scope.$storage.tasks.push(	{id:'16',name:'Admin',title:'Task 1',date:'Today',state:'to_do'},
							{id:'17',name:'Admin',title:'Task 2',date:'Today',state:'doing'},
							{id:'18',name:'Admin',title:'Task 3',date:'Today',state:'done'})
$scope.$storage.i=19;
};

$scope.fName=function(){	//Фильтр имен пользователей, применяемый в учетной записи "Admin"
	if($scope.name=='Admin'){
		return $scope.admFilter;
	}
	else{
		return $scope.name;
		}
}; 



$scope.save=function(){
	$scope.$storage.tasks.push({
		id: $scope.$storage.i,
		name:$scope.name,
		title:$scope.title,
		date:$scope.date,
		state:$scope.state});
	$scope.$storage.i++;
};

//Удаление всех заданий
$scope.clear=function(){
	$scope.$storage.tasks=[];
	$scope.$storage.i=0;
}

//Проверка на пустой массив
$scope.empty=function(){
	return ($scope.$storage.tasks.length==0)
};

$scope.tooLong=function(){
	return($scope.title.length>20 || $scope.date.length>20)
};

//Удаление задания
$scope.deleteTask=function(task_id){
	for (var i=0; i < $scope.$storage.tasks.length; i++){
		if (task_id==$scope.$storage.tasks[i].id) {
			$scope.$storage.tasks.splice(i,1);
		}
	}; 
};

//Фнкция Move to, переносит задание между состояниями
$scope.moveTo=function(task_state,task_id){
	for (var i=0; i < $scope.$storage.tasks.length; i++){
		if (task_id==$scope.$storage.tasks[i].id){
			$scope.$storage.tasks[i].state=task_state;
			}
		}
};

//просмотр задания
$scope.showTask=function(){
	for (var i=0; i < $scope.$storage.tasks.length; i++){
		if ($scope.tId==$scope.$storage.tasks[i].id){
			$scope.taskID=$scope.$storage.tasks[i].id;
			$scope.taskName=$scope.$storage.tasks[i].name;
			$scope.taskTitle=$scope.$storage.tasks[i].title;
			$scope.taskDate=$scope.$storage.tasks[i].date;
			$scope.taskState=$scope.$storage.tasks[i].state;
		};
	};
};

$scope.isAuthorised=false;
	$scope.userlist=users;
	id=$scope.id;
	$scope.password="";
	$scope.checkLogin=function(){
	if ($scope.userlist[$scope.id].password==$scope.password){
		id=$scope.id;
		$scope.isAuthorised=true;
		username=$scope.userlist[id].login; //Stop listening for location changes
	}
	else
	{$scope.isAuthorised=false;};
};

});

TaskManager.directive('nameFilter', function() {
  return {
    templateUrl: 'tpl/nameFilter.tpl',
	restrict: 'A',
	replace: true
  };
});

TaskManager.directive('addTask', function() {
	return{
		restrict: 'A',
		templateUrl: 'tpl/addTask.tpl',
		replace: true
	};
});

TaskManager.directive('toDoTask', function() {
	return {
		restrict: 'A',
		templateUrl: 'tpl/toDoTask.tpl',
		replace: true
	}
});

TaskManager.directive('doingTask', function() {
	return {
		restrict: 'A',
		templateUrl: 'tpl/DoingTask.tpl',
		replace: true
	}
});

TaskManager.directive('doneTask', function() {
	return {
		restrict: 'A',
		templateUrl: 'tpl/doneTask.tpl',
		replace: true
	}
});