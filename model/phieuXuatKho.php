<?php

include_once("../model/ketnoi.php");
class PhieuXuat{
    private $conn;

    function __construct(){
        $p = new KetNoi();
        $p->ketNoi($this->conn);
    }

    function layPhieuXuatKhoChoXuat($maTaiKhoan = null,$maKho = null){
        if($maTaiKhoan != null){
            $query = "CALL layPhieuXuatKhoTheoKho(:maTaiKhoan, '', 'Chờ xuất')";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":maTaiKhoan", $maTaiKhoan);
        }
        if($maKho != null){
            $query = "CALL layPhieuXuatKhoTheoKho('', :maKho, 'Chờ xuất')";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":maKho", $maKho);
        }
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
    }

    function layPhieuXuatKhoDaXuat($maTaiKhoan = null, $maKho = null){
        
        if($maTaiKhoan != null){
            $query = "CALL layPhieuXuatKhoTheoKho(:maTaiKhoan, '', 'Đã xuất kho')";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":maTaiKhoan", $maTaiKhoan);
        }
        if($maKho != null){
            $query = "CALL layPhieuXuatKhoTheoKho('', :maKho, 'Đã xuất kho')";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":maKho", $maKho);
        }
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
    }

    function lapPhieuXuat($maPhieu, $maDon, $maKho, $maTaiKhoan, $ngayLap, $ngayXuat, $trangThai){
        $stmt = $this->conn->prepare("INSERT INTO phieuxuat VALUES (:maPhieu, :maDon, :maTaiKhoan, :trangThai, :ngayLap, :ngayXuat, :maKho)");
        return $stmt->execute([
            ':maPhieu' => $maPhieu,
            ':maDon' => $maDon,
            ':maKho' => $maKho,
            ':maTaiKhoan' => $maTaiKhoan,
            ':ngayLap' => $ngayLap,
            ':ngayXuat' => $ngayXuat,
            ':trangThai' => $trangThai
        ]);
    }

    function themChiTietPhieuXuat($maPhieu, $maChiTietSanPham, $soLuong){
        $stmt = $this->conn->prepare("INSERT INTO chitietphieuxuat VALUES (:maPhieu, :maChiTietSanPham, :soLuong)");
        $stmt->execute([
            ':maPhieu' => $maPhieu,
            ':maChiTietSanPham' => $maChiTietSanPham,
            ':soLuong' => $soLuong
        ]);
        $query2 = "UPDATE sanpham as sp join chitietsanpham as ctsp on sp.MaSanPham = ctsp.MaSanPham SET sp.soluongchoxuat = sp.soluongchonhap + :soLuong_1, ctsp.soluongchoxuat = ctsp.soluongchoxuat + :soLuong_2 WHERE ctsp.MaChiTietSanPham = :maChiTietSanPham ";
        $stmt2 = $this->conn->prepare($query2);
        $stmt2->bindParam(':maChiTietSanPham', $maChiTietSanPham, PDO::PARAM_INT);
        $stmt2->bindParam(':soLuong_1', $soLuong, PDO::PARAM_INT);
        $stmt2->bindParam(':soLuong_2', $soLuong, PDO::PARAM_INT);
        return  $stmt2->execute();
    }

    function layChiTietPhieuXuat($maPhieu){
        $stmt = $this->conn->prepare("CALL layChiTietPhieuXuat(:maPhieu)");
        $stmt->bindParam(':maPhieu', $maPhieu, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
    }

    function layTrangThaiPhieuXuat($maPhieu){
        $stmt = $this->conn->prepare("SELECT DISTINCT px.TrangThai FROM phieuxuat as px JOIN donyeucau as d on d.MaDon = px.MaDon WHERE px.MaPhieu = :maPhieu");
        $stmt->bindParam(':maPhieu', $maPhieu, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
    }

    function xacNhanXuatKho($maPhieu, $ngayXuat){
        $stmt = $this->conn->prepare("UPDATE phieuxuat SET ngayxuat = :ngayXuat, trangThai = 'Đã xuất' WHERE maphieu = :maPhieu");
        return $stmt->execute([
            ':ngayXuat' => $ngayXuat,
            ':maPhieu' => $maPhieu
        ]);
    }
}
?>
