<?php

include_once("../model/ketnoi.php");
class PhieuNhap{
    private $conn;

    function __construct(){
        $p = new KetNoi();
          $p->ketNoi($this->conn);
    }

    function layPhieuNhapKhoChoNhap($maTaiKhoan = null,$maKho = null){
        if($maTaiKhoan != null){
            $query = "CALL layPhieuNhapKhoTheoKho(:maTaiKhoan, '', 'Chờ nhập')";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":maTaiKhoan", $maTaiKhoan);
        }
        if($maKho != null){
            $query = "CALL layPhieuNhapKhoTheoKho('', :maKho, 'Chờ nhập')";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":maKho", $maKho);
        }
        $stmt->execute();
        $menuItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $menuItems ?: false;
    }

    function layPhieuNhapKhoDaNhap($maTaiKhoan = null, $maKho = null){
        if($maTaiKhoan != null){
            $query = "CALL layPhieuNhapKhoTheoKho(:maTaiKhoan, '', 'Đã nhập kho')";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":maTaiKhoan", $maTaiKhoan);
        }
        if($maKho != null){
            $query = "CALL layPhieuNhapKhoTheoKho('', :maKho, 'Đã nhập kho')";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":maKho", $maKho);
        }
        $stmt->execute();
        $menuItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $menuItems ?: false;
    }

    function lapPhieuNhap($maDon, $maKho, $maTaiKhoan, $ngayLap, $ngayNhap, $trangThai){
        $ngayNhap = date("Y-m-d");
        $maPhieu = rand(1,1000);
        $stmt = $this->conn->prepare("INSERT INTO phieunhap VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$maPhieu, $maDon, $maKho, $maTaiKhoan, $ngayLap, $ngayNhap, $trangThai]);
        return $stmt->rowCount() > 0;
    }

    function layChiTietPhieuNhap($maPhieu){
        $stmt = $this->conn->prepare("CALL layChiTietPhieuNhap(?)");
        $stmt->execute([$maPhieu]);
        $menuItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $menuItems ?: false;
    }

    function layTrangThaiPhieuNhap($maDon){
        $stmt = $this->conn->prepare("SELECT DISTINCT pn.TrangThai FROM phieunhap as pn JOIN donyeucau as d on d.MaDon = pn.MaDon WHERE d.MaDon = ?");
        $stmt->execute([$maDon]);
        $menuItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $menuItems ?: false;
    }

    function themChiTietNguyenLieu($maChiTiet, $maSanPham, $maPhieu, $maKho, $soLuongTon, $donVi, $gia, $ngaySanXuat, $ngayHetHan){
        $stmt = $this->conn->prepare("INSERT INTO chitietsanpham VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0,0)");
        return $stmt->execute([$maChiTiet, $maSanPham, $maPhieu, $maKho, $soLuongTon, $donVi, $gia, $ngaySanXuat, $ngayHetHan]);
    }

    function xacNhanNhapKho($maPhieu){
        $stmt = $this->conn->prepare("CALL xacNhanNhapKho(?)");
        $stmt->execute([$maPhieu]);
        return $stmt->rowCount() > 0;
    }
}
?>
