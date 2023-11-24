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
    function laySanPhamHetHan($tinhTrang = 0){
        $query = "SELECT ctsp.MaChiTietSanPham, sp.MaSanPham, sp.TenSanPham, ctsp.SoLuongTon, ctsp.NgaySanXuat, ctsp.NgayHetHan, sp.Loai, ctsp.SoLuongChoXuat,k.TenKho, ctsp.DonVi 
        FROM chitietsanpham as ctsp JOIN
        sanpham as sp on sp.MaSanPham = ctsp.MaSanPHam JOIN
        Kho as k on k.MaKho = ctsp.MaKho
        WHERE ctsp.NgayHetHan <= CURRENT_DATE() and ctsp.tinhtrang = :tinhTrang";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":tinhTrang", $tinhTrang);
        $stmt->execute();
        $menuItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $menuItems ?: false;
    }
    function laySanPhamTieuHuy(){
        $query = "SELECT ctsp.MaChiTietSanPham, sp.MaSanPham, sp.TenSanPham, ctsp.SoLuongTon, ctsp.NgaySanXuat, ctsp.NgayHetHan, sp.Loai, ctsp.SoLuongChoXuat,k.TenKho, ctsp.DonVi 
        FROM chitietsanpham as ctsp JOIN
        sanpham as sp on sp.MaSanPham = ctsp.MaSanPHam JOIN
        Kho as k on k.MaKho = ctsp.MaKho
        WHERE ctsp.tinhtrang = 2";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $menuItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $menuItems ?: false;
    }
    function laySanPhamHetSoLuong(){
        $query = "SELECT  sp.MaSanPham, sp.TenSanPham, sp.SoLuongTon,sp.SoLuongChoNhap, sp.SoLuongChoXuat, sp.Loai
        FROM sanpham as sp
        WHERE sp.SoLuongTon < 10 ";
        $stmt = $this->conn->prepare($query);
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
        $query = "SELECT DISTINCT ctsp.MaChiTietSanPham, sp.MaSanPham, sp.TenSanPham, ctsp.SoLuongTon, ctsp.DonVi FROM chitietsanpham as ctsp join sanpham as sp on sp.MaSanPham = ctsp.MaSanPham where maKho = :kho and ctsp.TinhTrang = 0 ";
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
        $query = "SELECT ctsp.MaChiTietSanPham, sp.MaSanPham, sp.TenSanPham, ctsp.DonVi, ctsp.SoLuongTon FROM chitietsanpham as ctsp join sanpham as sp on sp.MaSanPham = ctsp.MaSanPham where maKho = :kho and ctsp.TinhTrang = 0 ";
        if($maSanPham != null){
            $sanPham = implode(',', array_map(function($item) { return "'".$item."'"; }, $maSanPham));
            $query .= "AND sp.maSanPham IN ($sanPham)";
        }
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':kho', $kho);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
    }
    function capNhatXoaChiTietSanPham($maChiTietSanPham, $soLuong = null){
        $sanPham = implode(',', array_map(function($item) { return "'".$item."'"; }, $maChiTietSanPham));
        if($soLuong != null){
            $query = "UPDATE chitietsanpham set TinhTrang = 2, soluongchotieuhuy = soluongchotieuhuy + :soLuong where MaChiTietSanPham IN ($sanPham)";
        }else{
            $query = "UPDATE chitietsanpham set TinhTrang = 2, soluongchotieuhuy = soluongton where MaChiTietSanPham IN ($sanPham)";
        }
        $stmt = $this->conn->prepare($query);
        if($soLuong != null){
            $stmt->bindParam(':soLuong', $soLuong);
        }
        return  $stmt->execute();
    }
    function layChiTietSanPham($maSanPham){
        $stmt = $this->conn->prepare("SELECT * FROM sanpham as sp join chitietsanpham as ctsp on ctsp.masanpham = sp.masanpham where ctsp.maSanPham = ?");
        $stmt->execute([$maSanPham]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
    }
    function themSanPham($maSanPham,$tenSanPham,$loai, $donVi){
        $query = "INSERT sanpham value (:maSanPham, :tenSanPham, 0, :donVi, 0,0, :loai)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':maSanPham', $maSanPham);
            $stmt->bindParam(':tenSanPham', $tenSanPham);
            $stmt->bindParam(':donVi', $donVi);
            $stmt->bindParam(':loai', $loai);
            return  $stmt->execute();
    }
    
    function capNhatSanPham($maSanPham,$tenSanPham, $donVi){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "UPDATE sanpham SET tensanpham = :tenSanPham, donVi = :donVi WHERE maSanPham = :maSanPham";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maSanPham', $maSanPham);
            $stmt->bindParam(':tenSanPham', $tenSanPham);
            $stmt->bindParam(':donVi', $donVi);
            return  $stmt->execute();
        }
    }
    function capNhatDanhSachKhoMoi($maChiTietSanPham,$maKho){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "UPDATE chitietsanpham SET makho = :maKho WHERE maChiTietSanPham = :maChiTietSanPham";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maChiTietSanPham', $maChiTietSanPham);
            $stmt->bindParam(':maKho', $maKho);
            $stmt->execute();
            $query2 = "UPDATE kho as k join chitietsanpham as ctsp on ctsp.MaKho = k.MaKho SET k.SucChuaDaDung = k.SucChuaDaDung + ctsp.SoLuongTon WHERE ctsp.maChiTietSanPham = :maChiTietSanPham";
            $stmt2 = $conn->prepare($query2);
            $stmt2->bindParam(':maChiTietSanPham', $maChiTietSanPham);
            return  $stmt2->execute();
        }
    }
    function xoaChiTietSanPham($maChiTietSanPham){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "Call tieuHuyChiTietSanPham(:maChiTietSanPham)";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maChiTietSanPham', $maChiTietSanPham);
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
