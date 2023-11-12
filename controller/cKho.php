<?php
    include_once("../model/thongTinKho.php");
     class ControllKho{
        function layKhoPhuHop($loai,$soLuong){
            $p = new Kho();
            $res = $p->layKhoPhuHop($loai,$soLuong);
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
        function layTatCaKho(){
            $p = new Kho();
            $res = $p->layTatCaKho();
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
       function themKho($maKho, $tenKho, $viTri, $moTa, $sucChua, $loai){
            $p = new Kho();
            $res = $p-> themKho($maKho, $tenKho, $viTri, $moTa, $sucChua, $loai);
            return $res;
       }
       function capNhatKho($maKho, $tenKho, $viTri, $moTa, $sucChua, $loai){
            $p = new Kho();
            $res = $p ->capNhatKho($maKho, $tenKho, $viTri, $moTa, $sucChua, $loai);
            return $res;
       }
       function xoaKho($maKho, $loai){
            $p = new Kho();
            $res = $p -> xoaKho($maKho,$loai);
            return $res;
       }
    }
    
?>
