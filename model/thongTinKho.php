<?php
    include_once("../model/ketnoi.php");
     class Kho{
        function layKhoPhuHop($loai, $soLuong){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "SELECT * FROM kho where loai = '$loai' and SucChua - SucChuaDaDung > $soLuong";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
        

    }
?>
