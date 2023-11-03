<?php
$servername = "localhost";
$username = "duytai";
$password = "123456";
$database = "quanlykho";

// Kết nối CSDL
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Kết nối CSDL thất bại: " . $conn->connect_error);
}
?>
