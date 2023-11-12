<?php

include_once("../model/ketnoi.php");
class Kho{
    private $conn;

    function __construct(){
        $p = new KetNoi();
        $p->ketNoi( $this->conn );
    }

    function layKhoPhuHop($loai, $soLuong){
        $stmt = $this->conn->prepare("SELECT * FROM kho WHERE loai = :loai AND SucChua - SucChuaDaDung > :soLuong");
        $stmt->bindParam(':loai', $loai, PDO::PARAM_STR);
        $stmt->bindParam(':soLuong', $soLuong, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
    }
    function layTatCaKho(){
         $stmt = $this->conn->prepare("SELECT * FROM kho ");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
    }
    function themKho($maKho, $tenKho, $viTri, $moTa, $sucChua, $loai){
        $query = 'INSERT kho values (:maKho, :tenKho, :viTri, :moTa, :sucChua, 0,:loai)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':maKho', $maKho);
        $stmt->bindParam(':tenKho', $tenKho);
        $stmt->bindParam(':viTri', $viTri);
        $stmt->bindParam(':moTa', $moTa);
        $stmt->bindParam(':sucChua', $sucChua);
        $stmt->bindParam(':loai', $loai);
        return $stmt->execute();
    }
    function capNhatKho($maKho, $tenKho, $viTri, $moTa, $sucChua, $loai){
        $query = 'UPDATE kho 
        SET tenKho = :tenKho, 
        viTri = :viTri, 
        moTa = :moTa, 
        sucChua = :sucChua, 
        loai = :loai
        where maKho = :maKho';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':maKho', $maKho);
        $stmt->bindParam(':tenKho', $tenKho);
        $stmt->bindParam(':viTri', $viTri);
        $stmt->bindParam(':moTa', $moTa);
        $stmt->bindParam(':sucChua', $sucChua);
        $stmt->bindParam(':loai', $loai);
        return $stmt->execute();
    }
    function xoaKho($maKho,$loai){
        $query = 'UPDATE kho 
        SET  loai = :loai
        where maKho = :maKho';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':maKho', $maKho);
        $stmt->bindParam(':loai', $loai);
        return $stmt->execute();
    }
}

?>
