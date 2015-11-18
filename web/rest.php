<?php

//Configure DB
define('DB_TYPE', 'mysql');
define('DB_HOST', 'localhost');
define('DB_NAME', 'tt');
define('DB_USER', 'root');
define('DB_PASS', '071293');

require_once __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/Database.php';

use Silex\Application;

$app = new Application();

$app['debug'] = true;

$app->get('/tasks', function (Application $app) {

    $db = new Database();

    $task = $db->select('SELECT * from users');

    if (!$task) {
        $error = array('message' => 'The task was not found.');

        return $app->json($error, 404);
    }

    return $app->json($task);
});


$app->run();
