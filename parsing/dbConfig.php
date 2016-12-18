<?php

const HOST = "localhost";
const USERNAME = "root";
const PASSWORD = "qrtmnkl1205";
const DBNAME = "studr";

function getConnection () {
    $conn = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, USERNAME, PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    return $conn;
}