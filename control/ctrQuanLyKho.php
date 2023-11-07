<?php
    include_once("../model/quanLyKho.php");
    class CtrQuanLyKho{
        function themTTK($maKho ,$tenKho, $viTri, $sucChua, $soLuong,$loai,$moTa){
            $p= new quanLyKho();
            $res= $p ->themTTK($maKho ,$tenKho, $viTri, $sucChua, $soLuong,$loai,$moTa);
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
        }
        function xoaTTK($maKho ){
            $p= new quanLyKho();
            $res= $p ->xoaTTK($maKho);
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
        function suaTTK($maKho ,$tenKho, $viTri, $sucChua, $soLuong,$loai,$moTa ){
            $p= new quanLyKho();
            $res= $p ->suaTTK($maKho ,$tenKho, $viTri, $sucChua, $soLuong,$loai,$moTa);
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
        function xemKho($maKho ){
            $p= new quanLyKho();
            $res= $p ->xemKho($maKho);
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

        
       
    

?>