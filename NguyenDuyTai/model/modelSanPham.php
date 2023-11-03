<?php
class ModelSanPham {
    public function getNguyenLieu() {
        global $conn;
        $sql = "SELECT MaSanPham, TenSanPham, SoLuongTon, SoLuongChoNhap, SoLuongChoXuat, DonVi
                FROM sanpham";
        $result = $conn->query($sql);
        return $result;
    }
}
?>
