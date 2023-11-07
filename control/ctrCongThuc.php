<?php
    include_once("../model/congThuc.php");
    class CtrCongThuc{
        function themCT($maCT ,$ten, $donVi, $soLuong1, $DSNL,$moTa1){
            $p= new congThuc();
            $res= $p ->themCT($maCT ,$ten, $donVi, $soLuong1, $DSNL,$moTa1);
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
        function xoaCT($maCT ){
            $p= new congThuc();
            $res= $p ->xoaCT($maCT);
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
        function suaCT($ten, $donVi, $soLuong1, $DSNL,$moTa1 ){
            $p= new congThuc();
            $res= $p -> suaCT($ten, $donVi, $soLuong1, $DSNL,$moTa1);
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
        function xemCT($maCT ){
            $p= new congThuc();
            $res= $p ->xemCT($maCT);
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