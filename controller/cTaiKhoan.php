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
<<<<<<< HEAD
        function doiMatKhau($maTaiKhoan, $pass){
             $p = new TaiKhoan();
             $res = $p->doiMatKhau($maTaiKhoan, $pass);
             if (!$res) {
                 return false;
             } else {
                 return true;
             }
         }
=======
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
    }

    

?>
