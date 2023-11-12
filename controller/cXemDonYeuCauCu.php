<?php
    include_once("../model/xemDonYeuCauCu.php");
    class ControlDonYeuCauCu{
        function layDonYeuCauCuTheoTaiKhoan($maTaiKhoan){
             $p = new DonYeuCauCu();
             $res = $p->layDonYeuCauCuTheoTaiKhoan($maTaiKhoan);
             if (!$res) {
                 return false;
             } else {
                 return $res;
             }
         }
        
    }

    

?>
