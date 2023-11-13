<?php
    include_once("../model/sanPham.php");
    class ControlSanPham{
        function layToanBoSanPham(){
             $p = new SanPham();
             $res = $p->layToanBoSanPham();
             if (!$res) {
                 return false;
             } else {
                 return $res;
             }
         }
        function layToanBoNguyenLieu(){
             $p = new SanPham();
             $res = $p->layToanBoNguyenLieu();
             if (!$res) {
                 return false;
             } else {
                 return $res;
             }
         }
        function layToanBoThanhPham(){
             $p = new SanPham();
             $res = $p->layToanBoThanhPham();
             if (!$res) {
                 return false;
             } else {
                 return $res;
             }
         }
        function laySanPhamTheoTen($ten, $loai){
             $p = new SanPham();
             $res = $p->laySanPhamTheoTen($ten,$loai);
             if (!$res) {
                 return false;
             } else {
                 return $res;
             }
         }
         function laySanPhamTheoKho($kho){
            $p=new SanPham();   
            $res = $p->laySanPhamTheoKho($kho) ;
            if (!$res) {
                 return false;
             } else {
                 return $res;
             }
         }
         function layMotSoSanPhamTheoKho($kho, $maSanPham){
            $p=new SanPham();   
            $res = $p->laySanPhamTheoKho($kho, $maSanPham) ;
            return $res;
         }
         function layDanhMucSanPhamTheoKho($kho, $maSanPham){
            $p=new SanPham();   
            $res = $p->layDanhMucSanPhamTheoKho($kho, $maSanPham) ;
            if (!$res) {
                 return false;
             } else {
                 return $res;
             }
         }
         function layChiTietSanPham($maSanPham){
            $p = new SanPham();
             $res = $p->layChiTietSanPham($maSanPham);
             if (!$res) {
                 return false;
             } else {
                 return $res;
             }
         }
<<<<<<< HEAD
         function themSanPham($maSanPham,$tenSanPham,$loai, $donVi){
            $p = new SanPham();
            $res = $p->themSanPham($maSanPham, $tenSanPham, $loai, $donVi);
            return $res;
        }
        function capNhatSanPham($maSanPham,$tenSanPham, $donVi ){
            $p = new SanPham();
                $res = $p->capNhatSanPham($maSanPham,$tenSanPham, $donVi);
=======
         function themSanPham($maSanPham,$tenSanPham,$loai){
            $p = new SanPham();
            $res = $p->themSanPham($maSanPham, $tenSanPham, $loai);
            return $res;
        }
        function capNhatSanPham($maSanPham,$tenSanPham){
            $p = new SanPham();
                $res = $p->capNhatSanPham($maSanPham,$tenSanPham);
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
                return $res;
        }
        function xoaSanPham($maSanPham , $loai ){
            $p = new SanPham();
                $res = $p->xoaSanPham($maSanPham, $loai);
                return $res;
        }
    }

    

?>
