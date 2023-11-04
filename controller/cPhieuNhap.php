<?php
    include_once("../model/phieuNhap.php");
    class ControlPhieuNhap{
        // cho chức năng phân phối nhập kho
        function lapPhieuNhap($maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayNhap,	$trangThai){
             $p = new PhieuNhap();
             $res = $p->lapPhieuNhap($maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayNhap,	$trangThai);
             if (!$res) {
                 return false;
             } else {
                 return true;
             }
         }
        
         // cho chức năng xác nhận nhập kho
        function layPhieuNhapKhoTheoKho($maKho){
            $p = new PhieuNhap();
            $res = $p->layPhieuNhapKhoTheoKho($maKho);
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
        function layPhieuNhapKhoTheoTaiKhoan($maTaiKhoan){

            $p = new PhieuNhap();
            $res = $p->layPhieuNhapKhoTheoTaiKhoan($maTaiKhoan);
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
        function layChiTietPhieuNhap($maPhieu){
            $p = new PhieuNhap();
            $res = $p->layChiTietPhieuNhap($maPhieu);
            if(!$res){
                return false;
            }else{
                 if (mysqli_num_rows($res) == 0) {
                    return 0;
                } else {
                    return $res;
                }
            }
        }
        function themChiTietNguyenLieu($maChiTiet, $maSanPham, $maPhieu, $maKho, $soLuongTon,$donVi, $gia, $ngaySanXuat, $ngayHetHan){
            $p = new PhieuNhap();
            $res = $p->themChiTietNguyenLieu($maChiTiet, $maSanPham, $maPhieu, $maKho, $soLuongTon,$donVi, $gia, $ngaySanXuat, $ngayHetHan);
            if(!$res){
                return false;
            }else{
                return true;
            }
        }
        function layTrangThaiPhieuNhap($maDon){
            $p = new PhieuNhap();
            $res = $p->layTrangThaiPhieuNhap($maDon);
            if(!$res){
                return false;
            }else{
                 if (mysqli_num_rows($res) == 0) {
                    return 0;
                } else {
                    return $res;
                }
            }
        }
        function xacNhanNhapKho($maPhieu){
            $p = new PhieuNhap();
            $res = $p->xacNhanNhapKho($maPhieu);
            if(!$res){
                return false;
            }else{
                return true;
            }
        }
       
    }

    

?>
