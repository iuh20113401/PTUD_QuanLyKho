<?php
include_once("../model/ketnoi.php");
class BienBan{
    function lapBienBan($maBienBan, $maDon, $maTaiKhoan, $ngayLap, $lyDo){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "INSERT bienBan value(:maBienBan, :maDon, :maTaiKhoan, :ngayLap, :lyDo)";
            $stmt = $conn->prepare($query);
            $stmt->bindParam("maBienBan", $maBienBan);
            $stmt->bindParam("maDon", $maDon);
            $stmt->bindParam("maTaiKhoan", $maTaiKhoan);
            $stmt->bindParam("ngayLap", $ngayLap);
            $stmt->bindParam("lyDo", $lyDo);
            return $stmt->execute();
        }
    }
    function layBienBan(){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "SELECT MaBienBan, MaDon, TenDangNhap, NgayLap, LyDo FROM bienban as bb join taikhoan as tk on tk.MaTaiKhoan = bb.MaTaiKhoan ";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    function layChiTietBienBan($maBienBan){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "SELECT ld.TenLoai, tk.TenDangNhap, sp.TenSanPham, ctd.SoLuong, ctd.DonVi, d.TrangThai
            FROM bienban as bb JOIN
            donyeucau as d on d.MaDon = bb.MaDon JOIN
            loaidon as ld on ld.MaLoai = d.MaLoai JOIN
            chitietdonyeucau as ctd on ctd.MaDon = d.MaDon JOIN
            taikhoan as tk on d.MaTaiKhoan = tk.MaTaiKhoan JOIN 
            sanpham as sp on sp.MaSanPham = ctd.MaSanPham
             where mabienban = :maBienBan";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(":maBienBan", $maBienBan);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
}


?>