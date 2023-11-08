<?php
class ModelSanPham {
    public function getNguyenLieu() {
        global $conn;
        $sql = "SELECT MaSanPham, TenSanPham, SoLuongTon, SoLuongChoNhap, SoLuongChoXuat, DonVi
                FROM sanpham where Loai = 'Nguyên liệu'";
        $result = $conn->query($sql);
        return $result;
    }

    public function getThanhPham() {
        global $conn;
        $sql = "SELECT MaSanPham, TenSanPham, SoLuongTon, SoLuongChoNhap, SoLuongChoXuat, DonVi
                FROM sanpham where Loai = 'Thành phẩm'";
        $result = $conn->query($sql);
        return $result;
    }
}
?>
