<?php
    include_once("../model/donYeuCauXuat.php");
     class ControlDonYeuCauXuat{
        function layDonYeuCauXuatDaDuyet(){
            $p = new DonYeuCauXuat();
            $res = $p->layDonYeuCauXuatDaDuyet();
            if (!$res) {
                return false;
            } else {
                if (count($res) == 0) {
                    return 0;
                } else {
                    return $res;
                }
            }
        }
        function layChiTietDonYeuCau($maDon){
            $p = new DonYeuCauXuat();
            $res = $p->layChiTietDonYeuCau($maDon);
            if (!$res) {
                return false;
            } else {
                if (count($res) == 0) {
                    return 0;
                } else {
                    return $res;
                }
            }
        }
        function layDanhSachSanPham($maSanPham){
            $p = new DonYeuCauXuat();
            $res = $p->layDanhSachSanPham($maSanPham);
            if (!$res) {
                return false;
            } else {
                if (count($res) == 0) {
                    return 0;
                } else {
                    return $res;
                }
            }
        }
    }
    
?>
