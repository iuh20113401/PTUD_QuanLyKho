
 <?php
include_once("../model/ketnoi.php");
class BaoCao{
    function nguyenLieu(){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "SELECT sp.TenSanPham,sp.SoLuongTon, sp.SoLuongChoNhap, sp.SoLuongChoXuat, pn.NgayNhap, ctd.SoLuong FROM sanpham as sp JOIN chitietsanpham as ctsp on ctsp.MaSanPHam = sp.MaSanPham JOIN phieunhap AS pn on pn.MaPhieu = ctsp.MaPhieuNhap JOIN donyeucau as d on d.MaDon = pn.MaDon JOIN chitietdonyeucau as ctd on ctd.MaDon = d.MaDon and ctd.MaSanPham = sp.MaSanPham where loai = 'Nguyên liệu'; ";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    function thanhPham(){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "SELECT d.MaDon,sp.TenSanPham,sp.SoLuongTon, sp.SoLuongChoNhap, sp.SoLuongChoXuat, pn.NgayNhap, ctd.SoLuong FROM sanpham as sp JOIN chitietsanpham as ctsp on ctsp.MaSanPHam = sp.MaSanPham JOIN phieunhap AS pn on pn.MaPhieu = ctsp.MaPhieuNhap JOIN donyeucau as d on d.MaDon = pn.MaDon JOIN chitietdonyeucau as ctd on ctd.MaDon = d.MaDon and ctd.MaSanPham = sp.MaSanPham where loai = 'Thành phẩm'; ";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
}
?>