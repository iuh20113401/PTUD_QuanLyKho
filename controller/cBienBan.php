<?php
    include_once("../model/bienBan.php");
     class ConTrolBienBan{
        function  lapBienBan($maBienBan, $maDon, $maTaiKhoan, $ngayLap, $lyDo){
            $p = new BienBan();
            $res = $p->  lapBienBan($maBienBan, $maDon, $maTaiKhoan, $ngayLap, $lyDo);
            return $res;
        }
        function layBienBan(){
            $p = new BienBan();
            $res = $p->  layBienBan();
            return $res;
        }
        function layChiTietBienBan($maBienBan){
            $p = new BienBan();
            $res = $p->  layChiTietBienBan($maBienBan);
            return $res;
        }
    
    }
        
        
        
?>