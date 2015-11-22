<?php
$loader = require_once __DIR__ . '/../vendor/autoload.php';
$loader->addPsr4('DB\\', __DIR__ . '/DB');
$loader->addPsr4('G\\', __DIR__ . '/G');
require_once __DIR__ . '/config.php';

use Silex\Application;
use DB\Database;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ParameterBag;

$app = new Application();

$app['debug'] = true;
//$app->register(new AngularPostRequestServiceProvider());

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());

    }
});


$app->get('/gettasks', function (Application $app) {

    $db = new Database(DB_TYPE, DB_HOST, DB_NAME, DB_USER, DB_PASS);

    $task = $db->select('SELECT id,title,status,created,author,assigner from tasks');

    if (!$task) {
        $error = array('message' => 'The tasks were not found.');

        return $app->json($error, 404);
    }

    return $app->json($task);
});

$app->put('/puttask', function (Request $request) use ($app) {

    $db = new Database(DB_TYPE, DB_HOST, DB_NAME, DB_USER, DB_PASS);

    $task = $request->request->all();

    $result = $db->insert('tasks',$task[0]);

    if (!$result) {

        $error = array('message' => 'The tasks were not found.');

        return $app->json($error, 404);
    }

    return $app->json($result,201);
});

$app->delete('/deltask/{id}', function (Application $app, $id) {

    $db = new Database(DB_TYPE, DB_HOST, DB_NAME, DB_USER, DB_PASS);



//    if (!$result) {
//
//        $error = array('message' => 'The tasks were not found.');
//
//        return $app->json($error, 404);
//    }

    return $app->json($result,201);
});

$app->run();
