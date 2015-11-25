<?php
$loader = require_once __DIR__ . '/../../vendor/autoload.php';

// Load Database (extend PDO) class. Path = /DB/Database.php
$loader->addPsr4('DB\\', __DIR__ . '/DB');


// Load DB configuration file /config.php
require_once __DIR__ . '/config.php';

use Silex\Application;
use DB\Database;
use Symfony\Component\HttpFoundation\Request;

$app = new Application();

$app['debug'] = true;

$app['db'] = new Database(DB_TYPE, DB_HOST, DB_NAME, DB_USER, DB_PASS);

$app->register(new Silex\Provider\SessionServiceProvider());

/*
 * Login Controller
 */
$app->post('/auth', function (Request $request) use ($app) {
    
    $login = $request->get('login');
    $pass = $request->get('pass');        

    $check = $app['db']->select('SELECT login,pass,role from users where login=:login and pass=:pass',array(
        'login' => htmlspecialchars(strtolower($login)),
        'pass'  => sha1($pass),
    ));        
    
    if(!$check){
        return $app->json(array('error'=>'User is not found'),401);
    }    
    
//    return new Symfony\Component\HttpFoundation\Response(var_dump($check));
    
    $app['session']->set('user',array(
       'login'      => $check[0]['login'],
        '_token'    => $check[0]['pass'],
        'role'      => $check[0]['role'],
    ));

    return $app->json(array(
        'login'     => $check[0]['login'],
        '_token'    => $check[0]['pass'],
        'role'      => $check[0]['role'],
        ), 201);
});

$app->post('/checkuser', function(Request $request) use ($app){
    $user = $request->request->all();

    $username = strtolower($user['user']);
    $password = sha1($user['pass']);
    $role = (int)$user['role'];
    
    if ($username === $app['session']->get('login') && $password === $app['session']->get('_token') && $role === $app['session']->get('role')){
        return true;
    }
    
    return false;
});

/*
 * Accepting a JSON Request Body
 */
$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

/*
 *  Task Controller
 */
$app->get('/gettasks', function (Application $app) {

    $tasks = $app['db']->select('SELECT id,title,status,created,author,assigner from tasks');
    $users = $app['db']->select('SELECT id, login from users');

    if (!$tasks and !$users) {
        $error = array('message' => 'The tasks were not found.');
        return $app->json($error, 404);
    }

    return $app->json(array(
        'users' => $users,
        'tasks' => $tasks,
    ), 200);
});
/*
 * @request In request must be 
 */
$app->put('/puttask', function (Request $request) use ($app) {

    $task = $request->request->all();
    
    $task = array(

      'title'  => htmlspecialchars($request->get('title')),
      'assigner'  => (int)$request->get('assigner'),
      'author'  => (int)$request->get('author'),
      'created'  => date('Y-m-d H:i:s'),
      'status'  => 1,
    );
    
    if (empty($task['title']) && empty($task['assigner']) && empty($task['author'])){
        return $app->json(array('error'=>'Variables couldn\'t be empty'),405);
    }
    
    $result = $app['db']->insert('tasks', $task);

    if (!$result) {
        $error = array('message' => 'The task was not posted.');
        return $app->json($error, 404);
    }

    return $app->json($result, 202);
});

$app->delete('/deltask/{id}', function ($id) use ($app) {

    $result = $app['db']->delete('tasks', 'id=' . $id);

    if (!$result) {

        $error = array('message' => 'The task was not deleted.');

        return $app->json($error, 404);
    }

    return $app->json($result, 202);
});

/*
 * Admin Controller
 */
$app->get('/getusers', function (Application $app) {

    $users = $app['db']->select('SELECT id,login,pass,is_deleted,role from users');

    if (!$users) {
        $error = array('error' => 'The users were not found.');

        return $app->json($error, 404);
    }

    return $app->json($users,200);
});

$app->put('/putuser', function (Request $request) use ($app) {

    $user = $request->request->all();
    
    $user = array(
        'login' => htmlspecialchars($request->get('login')),
        'pass' => SHA1($request->get('pass')),
        'is_deleted' => 0,
        'role' => 0,
    );
    
    $result = $app['db']->insert('users', $user);

    if (!$result) {

        $error = array('message' => 'The user was not posted.');

        return $app->json($error, 404);
    }

    return $app->json($result, 201);
});

$app->delete('/deluser/{id}', function ($id) use ($app) {

    $result = $app['db']->delete('users', 'id=' . $id);

    if (!$result) {
        $error = array('message' => 'The user was not deleted.');
        return $app->json($error, 405);
    }

    return $app->json($result, 201);
});

$app->run();