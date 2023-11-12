<?php
include_once("../model/ketnoi.php");
class CongThuc{
    function layToanBoCongThuc(){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "SELECT * FROM congthuc where trangthai = 1";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }


    function layChiTietCongThuc($maCongThuc){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "SELECT ct.MaCongThuc, ct.TenCongThuc, ct.MoTa, ctct.MaSanPham, sp.TenSanPham, ctct.SoLuong, ctct.DonVi FROM CongThuc as ct JOIN chitietcongthuc as ctct on ctct.MaCongTHuc = ct.MaCongTHuc JOIN sanpham as sp on sp.MaSanPham = ctct.MaSanPHam WHERE ct.MaCongThuc = :maCongThuc";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maCongThuc', $maCongThuc, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }

    function themCongThuc($maCongThuc, $tenCongThuc, $moTa, $soLuongNguyenLieu){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
                $query = "INSERT congthuc values (:maCongThuc, :tenCongThuc, :moTa, :soLuongNguyenLieu, 1)";
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':maCongThuc', $maCongThuc);
                $stmt->bindParam(':tenCongThuc', $tenCongThuc);
                $stmt->bindParam(':moTa', $moTa);
                $stmt->bindParam(':soLuongNguyenLieu', $soLuongNguyenLieu);
                return $stmt->execute();
        }
    }

    function themChiTietCongThuc($maCongThuc, $maSanPham, $soLuong, $donVi){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "INSERT chitietcongthuc values (:maCongThuc, :maSanPham, :soLuong, :donVi)";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maCongThuc', $maCongThuc);
            $stmt->bindParam(':maSanPham', $maSanPham);
            $stmt->bindParam(':soLuong', $soLuong);
            $stmt->bindParam(':donVi', $donVi);
            return $stmt->execute();
        }
    }
    function xoaCongThuc($maCongThuc){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "UPDATE congthuc set trangThai = 0 WHERE macongthuc = ?";
            $stmt = $conn->prepare($query);
            $stmt->execute([$maCongThuc]);
            return $stmt->execute([$maCongThuc]);
        }
    }
    function capNhatCongThuc($maCongThuc, $tenCongThuc, $moTa, $soLuongNguyenLieu){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "UPDATE congthuc set tenCongThuc = :tenCongThuc, soluongnguyenlieu = :soLuongNguyenLieu, moTa = :moTa WHERE macongthuc = :maCongThuc";
             $stmt = $conn->prepare($query);
            $stmt->bindParam(':maCongThuc', $maCongThuc);
            $stmt->bindParam(':tenCongThuc', $tenCongThuc);
            $stmt->bindParam(':moTa', $moTa);
            $stmt->bindParam(':soLuongNguyenLieu', $soLuongNguyenLieu);
            $stmt->execute();
            return $stmt->execute();
            return $stmt->execute([$maCongThuc]);
        }
    }
    function capNhatChiTietCongThuc($maCongThuc, $maSanPham, $soLuong, $donVi){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "UPDATE chitietcongthuc set maSanPham = :maSanPham, soLuong = :soLuong, donVi = :donVi WHERE maCongThuc = :maCongThuc";
             $stmt = $conn->prepare($query);
            $stmt->bindParam(':maCongThuc', $maCongThuc);
            $stmt->bindParam(':maSanPham', $maSanPham);
            $stmt->bindParam(':soLuong', $soLuong);
            $stmt->bindParam(':donVi', $donVi);
            $stmt->execute();
            return $stmt->execute();
            return $stmt->execute([$maCongThuc]);
        }
    }
}
?>

