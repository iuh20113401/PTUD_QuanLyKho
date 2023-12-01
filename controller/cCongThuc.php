<?php
    include_once("../model/congThuc.php");
     class ControlCongThuc{
        function layToanBoCongThuc(){
            $p = new CongThuc();
            $res = $p->layToanBoCongThuc();
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
        function layChiTietCongThuc($maCongThuc){
            $p = new CongThuc();
            $res = $p->layChiTietCongThuc($maCongThuc);
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
        function  themCongThuc($maCongThuc, $tenCongThuc,$donVi, $moTa, $soLuongNguyenLieu){
            $p = new CongThuc();
            $res = $p-> themCongThuc($maCongThuc, $tenCongThuc,$donVi, $moTa, $soLuongNguyenLieu);
            if (!$res) {
                return false;
            } else {
                return $res;
            }
        }
        function  themChiTietCongThuc($maCongThuc, $maSanPham, $soLuong, $donVi){
            $p = new CongThuc();
            $res = $p->themChiTietCongThuc($maCongThuc, $maSanPham, $soLuong, $donVi);
            if (!$res) {
                return false;
            } else {
               return true;
            }
        }
        function xoaCongThuc($maCongThuc){
            $p = new CongThuc();
            $res = $p->xoaCongThuc($maCongThuc);
            if (!$res) {
                return false;
            } else {
               return true;
            }
        }
        function capNhatCongThuc($maCongThuc, $tenCongThuc, $moTa, $soLuongNguyenLieu){
            $p = new CongThuc();
            $res = $p->capNhatCongThuc($maCongThuc, $tenCongThuc, $moTa, $soLuongNguyenLieu);
            if (!$res) {
                return false;
            } else {
               return true;
            }
        }
        function capNhatChiTietCongThuc($maCongThuc, $maSanPham, $soLuong, $donVi){
            $p = new CongThuc();
            $res = $p->capNhatChiTietCongThuc($maCongThuc, $maSanPham, $soLuong, $donVi);
            if (!$res) {
                return false;
            } else {
               return true;
            }
        }
    }
    
?>
