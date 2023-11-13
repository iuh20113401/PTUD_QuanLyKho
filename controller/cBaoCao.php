<?php
    include_once("../model/baoCao.php");
     class ConTrolBaoCao{
        function nguyenLieu(){
            $p = new BaoCao();
            $res = $p->nguyenLieu();
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
        function thanhPham(){
            $p = new BaoCao();
            $res = $p->thanhPham();
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
        
    }
    
?>
