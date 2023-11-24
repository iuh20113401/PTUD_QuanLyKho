<?php

include_once("../model/ketnoi.php");
class TaiKhoan{
    private $conn;

    function __construct(){
        $p = new KetNoi();
        $p->ketNoi($this->conn);
    }

    function themTaiKhoan($maTaiKhoan, $loai, $tenDangNhap, $pass, $viTriKho){
        $stmt = $this->conn->prepare("INSERT INTO taikhoan VALUES (:maTaiKhoan, :loai, :tenDangNhap, :pass, :viTriKho)");
        $stmt->bindParam(':maTaiKhoan', $maTaiKhoan, PDO::PARAM_INT);
        $stmt->bindParam(':loai', $loai, PDO::PARAM_STR);
        $stmt->bindParam(':tenDangNhap', $tenDangNhap, PDO::PARAM_STR);
        $stmt->bindParam(':pass', $pass, PDO::PARAM_STR);
        $stmt->bindParam(':viTriKho', $viTriKho, PDO::PARAM_STR);
        $result = $stmt->execute();
        return $result ?: false;
    }
    function doiMatKhau($maTaiKhoan, $pass){
        $stmt = $this->conn->prepare("UPDATE taikhoan set matkhau = :pass WHERE mataikhoan = :maTaiKhoan");
        $stmt->bindParam(':maTaiKhoan', $maTaiKhoan, PDO::PARAM_INT);
        $stmt->bindParam(':pass', $pass, PDO::PARAM_STR);
        $result = $stmt->execute();
        return $result ?: false;
    }
}

?>
