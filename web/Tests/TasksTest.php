<?php
//namespace Test;

require __DIR__ . '/../../vendor/autoload.php';

use Silex\WebTestCase;
use Silex\Application;

class TasksTest extends WebTestCase
{
    public function createApplication()
    {
        return require __DIR__.'/../api/rest.php';
    }


    public function testGetTasksPage()
    {
        $client = $this->createClient();
        $crawler = $client->request('GET','/api/gettasks');

        $this->assertTrue($client->getResponse()->isOk());

    }
}