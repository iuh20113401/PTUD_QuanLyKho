<?php

include_once("../model/ketnoi.php");
class SanPham{
    private $conn;

    function __construct(){
        $p = new KetNoi();
        $p->ketNoi($this->conn);
    }

    function layToanBoSanPham(){
        $stmt = $this->conn->prepare("SELECT * FROM sanpham");
        $stmt->execute();
        $menuItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $menuItems ?: false;
    }
    function layToanBoNguyenLieu(){
        $stmt = $this->conn->prepare("SELECT * FROM sanpham where loai = 'Nguyên liệu'");
        $stmt->execute();
        $menuItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $menuItems ?: false;
    }
    function layToanBoThanhPham(){
        $stmt = $this->conn->prepare("SELECT * FROM sanpham where loai = 'Thành phẩm'");
        $stmt->execute();
        $menuItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $menuItems ?: false;
    }
    function laySanPhamTheoTen($ten,$loai){
        $stmt = $this->conn->prepare("SELECT * FROM sanpham where tenSanPham like ? and loai = ?");
        $stmt->execute(['%'.$ten."%", $loai]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
    }
    function laySanPhamTheoKho($kho, $maSanPham = null){
        $query = "SELECT DISTINCT sp.MaSanPham, sp.TenSanPham FROM chitietsanpham as ctsp join sanpham as sp on sp.MaSanPham = ctsp.MaSanPham where maKho = :kho ";
        if($maSanPham != null){
            $sanPham = implode(',', array_map(function($item) { return "'".$item."'"; }, $maSanPham));
            $query .= "AND sp.maSanPham IN ($sanPham)";
        }
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':kho', $kho);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
    }
    function layDanhMucSanPhamTheoKho($kho, $maSanPham = null){
        $query = "SELECT ctsp.MaChiTietSanPham, sp.MaSanPham, sp.TenSanPham, ctsp.DonVi FROM chitietsanpham as ctsp join sanpham as sp on sp.MaSanPham = ctsp.MaSanPham where maKho = :kho ";
        if($maSanPham != null){
            $sanPham = implode(',', array_map(function($item) { return "'".$item."'"; }, $maSanPham));
            $query .= "AND sp.maSanPham IN ($sanPham)";
        }
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':kho', $kho);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
    }
    function layChiTietSanPham($maSanPham){
        $stmt = $this->conn->prepare("SELECT * FROM sanpham as sp join chitietsanpham as ctsp on ctsp.masanpham = sp.masanpham where ctsp.maSanPham = ?");
        $stmt->execute([$maSanPham]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
    }
    function themSanPham($maSanPham,$tenSanPham,$loai){
        $query = "INSERT sanpham value (:maSanPham, :tenSanPham, 0, 'KG', 0,0, :loai)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':maSanPham', $maSanPham);
            $stmt->bindParam(':tenSanPham', $tenSanPham);
            $stmt->bindParam(':loai', $loai);
            return  $stmt->execute();
    }
    function capNhatSanPham($maSanPham,$tenSanPham){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "UPDATE sanpham SET tensanpham = :tenSanPham WHERE maSanPham = :maSanPham";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maSanPham', $maSanPham);
            $stmt->bindParam(':tenSanPham', $tenSanPham);
            return  $stmt->execute();
        }
    }
    function xoaSanPham($maSanPham, $loai){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "UPDATE sanpham SET loai = :loai WHERE maSanPham = :maSanPham";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maSanPham', $maSanPham);
            $stmt->bindParam(':loai', $loai);
            return  $stmt->execute();
        }
    }
}

?>
