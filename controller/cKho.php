<?php
    include_once("../model/thongTinKho.php");
     class ControllKho{
        function layKhoPhuHop($loai,$soLuong){
            $p = new Kho();
            $res = $p->layKhoPhuHop($loai,$soLuong);
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
    
?>
