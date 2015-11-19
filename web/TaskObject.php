<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require __DIR__ . '/Database.php';

/**
 * Description of TaskObject
 *
 * @author Sem
 */
class TaskObject {

    private $id;
    private $title;
    private $status;
    private $date;
    private $author;
    private $performer;
    private $db;

    public function __construct() {
        $this->db = new Database();
    }
    
    public function getAllFromTasks(){
        return $this->db->select('SELECT * from users');
    }

    public function getId() {
        return $this->id;
    }

    public function getTitle() {
        return $this->title;
    }

    public function setTitle($title) {
        $this->title = $title;
    }

    public function getStatus() {
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function getPerformer() {
        return $this->performer;
    }

    public function setPerformer($performer) {
        $this->performer = $performer;
    }

    public function getAuthor() {
        return $this->author;
    }

    public function setAuthor($author) {
        $this->author = $author;
    }

}
