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

//$app->register(new Silex\Provider\SecurityServiceProvider(), array(
//    'security.firewalls' => array(
//        'default' => array(
//            'pattern' => '^.*$',
//            'anonymous' => true, // Needed as the login path is under the secured area
//            'form' => array('login_path' => '/login', 'check_path' => 'login_check'),
//            'logout' => array('logout_path' => '/logout'), // url to call for logging out
//            'users' => $app->share(function() use ($app) {
//                // Specific class App\User\UserProvider is described below
//                return new App\User\UserProvider($app['db']);
//            }),
//        ),
//    ),
//));
//
//$app['security.firewalls'] = array(
//    'admin' => array(
//        'pattern' => '^/admin',
//        'http' => true,
//        'users' => array(
//            // raw password is foo
//            'admin' => array('ROLE_ADMIN', '1234'),
//        ),
//    ),
//);

//$app->boot();

$app->post('/auth', function (Request $request) use ($app) {
    $user = $request->request->all();

//    return new \Symfony\Component\HttpFoundation\Response(var_dump($user));
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
        'pass'  => $password),201);
});

$app->get('/account', function () use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login.html');
    }

    return "Welcome {$user['username']}!";
});


/*
 * Angular
 */
$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());

    }
});

/*
 *  Task Routing
 */
$app->get('/gettasks', function (Application $app) {

    $task = $app['db']->select('SELECT id,title,status,created,author,assigner from tasks');

    if (!$task) {
        $error = array('message' => 'The tasks were not found.');

        return $app->json($error, 404);
    }

    return $app->json($task);
});

$app->put('/puttask', function (Request $request) use ($app) {

    $task = $request->request->all();

    $result = $app['db']->insert('tasks', $task[0]);

    if (!$result) {

        $error = array('message' => 'The task was not posted.');

        return $app->json($error, 404);
    }

    return $app->json($result, 201);
});

$app->delete('/deltask/{id}', function (Application $app, $id) {

    $result = $app['db']->delete('tasks', 'id=' . $id);

    if (!$result) {

        $error = array('message' => 'The task was not deleted.');

        return $app->json($error, 404);
    }

    return $app->json($result, 201);
});

/*
 * Users Route
 */
$app->get('/getusers', function (Application $app) {

    $task = $app['db']->select('SELECT id,login,pass from users');

    if (!$task) {
        $error = array('message' => 'The users were not found.');

        return $app->json($error, 404);
    }

    return $app->json($task);
});

$app->put('/putuser', function (Request $request) use ($app) {

    $task = $request->request->all();

    $result = $app['db']->insert('users', $task[0]);

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
