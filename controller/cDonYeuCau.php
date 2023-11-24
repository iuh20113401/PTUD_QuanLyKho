<?php
    include_once("../model/donYeuCau.php");
     class ControlDonYeuCau{
        function layDonYeuCau($trangThai){
            $p = new DonYeuCau();
            $res = $p->layDonYeuCau(null, $trangThai);
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
        function layDonYeuCauTheoTaiKhoan($maTaiKhoan, $trangThai){
            $p = new DonYeuCau();
            $res = $p->layDonYeuCau($maTaiKhoan, $trangThai);
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
        function layDonYeuCauDaDuyet(){
            $p = new DonYeuCau();
            $res = $p->layDonYeuCauDaDuyet();
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
            $p = new DonYeuCau();
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
        function   capNhatChiTietDonYeuCau($maDon,$maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho){
            $p = new DonYeuCau();
            $res = $p->capNhatChiTietDonYeuCau($maDon,$maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho);
            if (!$res) {
                return false;
            } else {
               return true;
            }
        }
        function capNhatTrangThaiDonYeuCau($maDon, $trangThai, $loai){
            $p = new DonYeuCau();
            $res = $p->capNhatTrangThaiDonYeuCau($maDon, $trangThai, $loai);
            if (!$res) {
                return false;
            } else {
               return true;
            }
        }
        function lapDonYeuCau($maDon, $maLoai, $maTaiKhoan, $ngayLap, $soLuong, $trangThai){
            $p = new DonYeuCau();
            $res = $p->lapDonYeuCau($maDon, $maLoai, $maTaiKhoan, $ngayLap, $soLuong, $trangThai);
            if (!$res) {
                return false;
            } else {
               return true;
            }
        }
        function  themChiTietDonYeuCau($maDon, $maSanPham, $soLuong, $donVi, $ngaySanXuat, $ngayHetHan, $viTriKho){
            $p = new DonYeuCau();
            $res = $p->themChiTietDonYeuCau($maDon, $maSanPham, $soLuong, $donVi, $ngaySanXuat, $ngayHetHan, $viTriKho);
            if (!$res) {
                return false;
            } else {
               return true;
            }
        }
    }
    
?>
