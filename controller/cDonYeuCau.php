<?php
    include_once("../model/donYeuCau.php");
     class ControllDonYeuCau{
        function layDonYeuCauDaDuyet(){
            $p = new DonYeuCau();
            $res = $p->layDonYeuCauDaDuyet();
            if (!$res) {
                return false;
            } else {
                if (mysqli_num_rows($res) == 0) {
                    return 0;
                } else {
                    return $res;
                }
            }
        }
        function layChiTietDonYeuCau($maDon){
            $p = new DonYeuCau();
            $res = $p->layChiTietDonYeuCau($maDon);
            if (!$res) {
                return false;
            } else {
                if (mysqli_num_rows($res) == 0) {
                    return 0;
                } else {
                    return $res;
                }
            }
        }
        function   capNhatChiTietDonYeuCau($maDon,$maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho){
            $p = new DonYeuCau();
            $res = $p->capNhatChiTietDonYeuCau($maDon,$maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho);
            if (!$res) {
                return false;
            } else {
               return true;
            }
        }
        function capNhapTrangThaiDonYeuCau($maDon, $trangThai){
            $p = new DonYeuCau();
            $res = $p->capNhapTrangThaiDonYeuCau($maDon, $trangThai);
            if (!$res) {
                return false;
            } else {
               return true;
            }
        }
    }
    
?>
