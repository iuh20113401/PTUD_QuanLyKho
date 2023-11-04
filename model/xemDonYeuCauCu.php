<?php
    include_once("../model/ketnoi.php");
     class DonYeuCauCu{
        function layDonYeuCauCuTheoTaiKhoan($maTaiKhoan){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "CALL layDonYeuCauTheoTaiKhoan($maTaiKhoan)";
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
