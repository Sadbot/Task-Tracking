<?php
use \Silex\WebTestCase;

class TasksTest extends \Silex\WebTestCase {

    public function createApplication() {
        // app.php must return an Application instance
        return require __DIR__ . '/../api/rest.php';
//        $app['session.test'] = true;

//        return $app;
    }

    public function testInitialPage() {
        $client = $this->createClient();
        $crawler = $client->request('GET', '/api/gettasks');

        $this->assertTrue($client->getResponse()->isOk());
//        $this->assertCount(1, $crawler->filter('h1:contains("Contact us")'));
//        $this->assertCount(1, $crawler->filter('form'));
    }

}
