<?php
    include_once("../model/kiemKe.php");
     class ControlKiemKe{
        function lapDonKiemKe( $maKiemKe,$maTaiKhoan, $ngayLap,$tinhTrang,$kho,$loai,$moTa){
            $p = new KiemKe();
            $res = $p->lapDonKiemKe( $maKiemKe,$maTaiKhoan,$ngayLap,$tinhTrang,$kho,$loai,$moTa);
            if (!$res) {
                return false;
            } else {
                return $res;
            }
        }
        function layDonKiemKe($trangThai){
            $p = new KiemKe();
            $res = $p->layDonKiemKe($trangThai);
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
        function themChiTietDonKiemKe($maKiemKe,$maChiTietSanPham,$tinhTrang,$soLuong,$moTa){
            $p = new KiemKe();
            $res = $p->themChiTietDonKiemKe($maKiemKe,$maChiTietSanPham,$tinhTrang,$soLuong,$moTa);
            return $res;
        }
        function layChiTietDonKiemKeLoi($maDon){
            $p = new KiemKe();
            $res = $p->layChiTietDonKiemKeLoi($maDon);
            return $res;
        }
        function layDonKiemKeTheoTaiKhoan($trangThai, $maTaiKhoan){
            $p = new KiemKe();
            $res = $p->layDonKiemKe($trangThai, $maTaiKhoan);
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
        function   capNhatTrangThai($maDon, $trangThai){
            $p = new KiemKe();
            $res = $p->  capNhatTrangThai($maDon, $trangThai);
            if (!$res) {
                return false;
            } else {
                return $res;
            }
        }
    }
    
?>
