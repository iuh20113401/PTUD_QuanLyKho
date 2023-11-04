<?php
    include_once("../model/taiKhoan.php");
    class ControlTaiKhoan{
        function themTaiKhoan($maTaiKhoan,$loai, $tenDangNhap, $pass){
             $p = new TaiKhoan();
             $res = $p->themTaiKhoan($maTaiKhoan,$loai, $tenDangNhap, $pass);
             if (!$res) {
                 return false;
             } else {
                 return true;
             }
         }
    }

    

?>
