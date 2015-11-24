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

/*
 * Login Controller
 */

$app->post('/auth', function (Request $request) use ($app) {
    $user = $request->request->all();

    $username = strtolower($user['user']);
    $password = sha1($user['pass']);

    $check = $app['db']->select('SELECT login,pass from users where login=:login and pass=:pass',array(
        'login' => $username,
        'pass'  => $password,
    ));

    if(!$check){
        return $app->json('error',401);
    }

    return $app->json(array(
        'login' => $username,
        '_token'  => $password), 201);
});

$app->get('/account', function () use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login.html');
    }

    return "Welcome {$user['username']}!";
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

$app->put('/puttask', function (Request $request) use ($app) {

    $task = $request->request->all();
    
    $task = array(
      'title'  => $request->get('title'),
      'assigner'  => $request->get('assigner'),
      'author'  => $request->get('author'),
      'created'  => mktime(),
      'status'  => 1,
    );
    
    $result = $app['db']->insert('tasks', $task);

    if (!$result) {
        $error = array('message' => 'The task was not posted.');
        return $app->json($error, 404);
    }

    return $app->json($result, 202);
});

$app->delete('/deltask/{id}', function (Application $app, $id) {

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
    
    $result = $app['db']->insert('users', $user);

    if (!$result) {

        $error = array('message' => 'The user was not posted.');

        return $app->json($error, 404);
    }

    return $app->json($result, 201);
});

$app->delete('/deluser/{id}', function (Application $app, $id) {

    $result = $app['db']->delete('users', 'id=' . $id);

    if (!$result) {

        $error = array('message' => 'The user was not deleted.');

        return $app->json($error, 404);
    }

    return $app->json($result, 201);
});

$app->run();
