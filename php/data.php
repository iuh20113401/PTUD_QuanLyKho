<?php
    header('Content-Type: application/json');
    require_once("database.php");
    $data = array();
    $query = "SELECT  TenSanPham,SoLuongTon FROM sanpham";
    $stmt = $conn->prepare($query);
    if($stmt->execute()){
        if($stmt->rowCount()>0){
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    foreach($result as $row){
        $data[] = $row;
    }
    echo json_encode($data);
?>
