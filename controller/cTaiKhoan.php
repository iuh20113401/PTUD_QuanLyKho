<?php
    include_once("../model/taiKhoan.php");
    class ControlTaiKhoan{
        function themTaiKhoan($maTaiKhoan,$loai, $tenDangNhap, $pass,$themTaiKhoan){
             $p = new TaiKhoan();
             $res = $p->themTaiKhoan($maTaiKhoan,$loai, $tenDangNhap, $pass,$themTaiKhoan);
             if (!$res) {
                 return false;
             } else {
                 return true;
             }
         }
        function doiMatKhau($maTaiKhoan, $pass){
             $p = new TaiKhoan();
             $res = $p->doiMatKhau($maTaiKhoan, $pass);
             if (!$res) {
                 return false;
             } else {
                 return true;
             }
         }
    }

    

?>
