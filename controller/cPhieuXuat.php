<?php
    include_once("../model/phieuXuatKho.php");
    class ControlPhieuXuat{
        // cho chức năng phân phối nhập kho
        function lapPhieuXuat($maPhieu,$maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayXuat,$trangThai){
             $p = new PhieuXuat();
             $res = $p->lapPhieuXuat($maPhieu,$maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayXuat,$trangThai);
             if (!$res) {
                 return false;
             } else {
                 return true;
             }
         }
        function themChiTietPhieuXuat($maPhieu, $maChiTietSanPham, $soLuong){
                $p = new PhieuXuat();
             $res = $p->themChiTietPhieuXuat($maPhieu, $maChiTietSanPham, $soLuong);
             return $res;
        }
        // cho chức năng xác nhận xuất kho 

        function layPhieuXuatKhoChoXuatTheoKho($maKho){
            $p = new PhieuXuat();
            $res = $p->layPhieuXuatKhoChoXuat(null,$maKho);
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
        function layPhieuXuatKhoDaXuatTheoKho($maKho){
            $p = new PhieuXuat();
            $res = $p->layPhieuXuatKhoDaXuat(null,$maKho);
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
        function layPhieuXuatKhoDaXuatTheoTaiKhoan($maTaiKhoan){
            $p = new PhieuXuat();
            $res = $p->layPhieuXuatKhoDaXuat($maTaiKhoan);
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
        function layPhieuXuatKhoChoXuatTheoTaiKhoan($maTaiKhoan){
            $p = new PhieuXuat();
            $res = $p->layPhieuXuatKhoChoXuat($maTaiKhoan);
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
        function layPhieuXuatKhoChoXuat($maTaiKhoan){
            $p = new PhieuXuat();
            $res = $p->layPhieuXuatKhoChoXuat($maTaiKhoan);
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
        function layChiTietPhieuXuat($maPhieu){
            $p = new PhieuXuat();
            $res = $p->layChiTietPhieuXuat($maPhieu);
            if(!$res){
                return false;
            }else{
                 if (count($res) == 0) {
                    return 0;
                } else {
                    return $res;
                }
            }
        }
       function xacNhanXuatKho($maPhieu,$ngayXuat ){

            $p = new PhieuXuat();
            $res = $p->xacNhanXuatKho($maPhieu, $ngayXuat);
            if(!$res){
                return false;
            }else{
                return true;
            }
        }
        function layTrangThaiPhieuXuat($maPhieu){
            $p = new PhieuXuat();
            $res = $p->layTrangThaiPhieuXuat($maPhieu);
            if(!$res){
                return false;
            }else{
                 if (count($res) == 0) {
                    return 0;
                } else {
                    return $res;
                }
            }
        }
    }

    

?>
