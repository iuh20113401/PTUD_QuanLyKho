<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "quanlykho";
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;", $username, $password);
    if(!$conn){
        die("Connect database failed");
    }
?>
