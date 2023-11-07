<?php
    include_once('../model//xemTrangThaiDon.php');
    class CtrXemTTDon{
        function layDonTT($maDon1,$tenDon,$DSNL,$trangThai){
            $p = new xemTrangThaiDon();
            $res = $p->layDonTT($maDon1,$tenDon,$DSNL,$trangThai);
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

        function   capNhapTrangThaiDonYeuCau($maDon, $trangThai){
            $p = new xemTrangThaiDon();
            $res = $p-> capNhapTrangThaiDonYeuCau($maDon, $trangThai);
            if (!$res) {
                return false;
            } else {
               return true;
            }
        
    }
}
?>