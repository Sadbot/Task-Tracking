<?php
$loader = require_once __DIR__ . '/../vendor/autoload.php';
$loader->addPsr4('DB\\',__DIR__.'/DB');
require_once __DIR__.'/config.php';

use Silex\Application;
use DB\Database;

$app = new Application();

$app['debug'] = true;

$app->get('/tasks', function (Application $app) {
    
    $db = new Database(DB_TYPE,DB_HOST,DB_NAME,DB_USER,DB_PASS);
    
    $task = $db->select('SELECT * from tasks');

    if (!$task) {
        $error = array('message' => 'The tasks were not found.');

        return $app->json($error, 404);
    }

    return $app->json($task);
});

$app->get('/users', function (Application $app) {
    
    $db = new Database(DB_TYPE,DB_HOST,DB_NAME,DB_USER,DB_PASS);
    
    $user = $db->select('SELECT * from users');

    if (!$user) {
        $error = array('message' => 'The users were not found.');

        return $app->json($error, 404);
    }

    return $app->json($user);
});


$app->run();
