<?php
namespace Test;

require __DIR__ . '/../../vendor/autoload.php';

require_once __DIR__.'/../api/DB/Database.php';
require_once __DIR__ . '/../api/config.php';

use Silex\Application;
use DB\Database;

class TasksTest extends \PHPUnit_Framework_TestCase
{
    public function testGetTasksPage()
    {
        $app = new Application();

        $app['debug'] = true;

        $app['db'] = new Database(DB_TYPE, DB_HOST, DB_NAME, DB_USER, DB_PASS);

        $response = $app->get('/gettasks', function (Application $app) {

            if (!isAuth($app)) {
                return $app->json(array('error' => 'not authorized'), 405);
            }

            $tasks = $app['db']->select('SELECT id,title,status,created,author,assigner from tasks');
            $users = $app['db']->select('SELECT id, login from users');

            if (!$tasks and ! $users) {
                $error = array('message' => 'The tasks were not found.');
                return $app->json($error, 404);
            }

            return $app->json(array(
                'users' => $users,
                'tasks' => $tasks,
            ), 200);
        });


        $this->assertSame('{"users":[{"id":"1","login":"admin"},{"id":"2","login":"sem"}],"tasks":[{"id":"4","title":"test1","status"
:"1","created":"2015-11-18 13:45:13","author":"1","assigner":"1"},{"id":"7","title":"test2","status"
:"1","created":"2015-11-18 13:57:44","author":"1","assigner":"1"},{"id":"8","title":"test","status":"1"
,"created":"2015-11-18 13:57:44","author":"1","assigner":"1"},{"id":"9","title":"test","status":"1","created"
:"2015-11-18 13:57:44","author":"1","assigner":"1"},{"id":"17","title":"test","status":"1","created"
:"2015-11-18 13:57:44","author":"1","assigner":"1"},{"id":"18","title":"test","status":"1","created"
:"2015-11-18 13:57:44","author":"1","assigner":"1"},{"id":"20","title":"test","status":"1","created"
:"2015-11-18 13:57:44","author":"1","assigner":"1"},{"id":"21","title":"test","status":"1","created"
:"2015-11-27 14:49:14","author":"1","assigner":"2"}]}', );
    }
}