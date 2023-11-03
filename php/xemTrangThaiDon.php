<?php
    include_once("../php/condb.php");
     class xemTrangThaiDon{
        
        function layDonTT($maDon1,$tenDon,$trangThai){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "SELECT * FROM kho where MaDon = $maDon1, TenDon=$tenDon,Trangthai=$trangThai";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
        
        function capNhapTrangThaiDonYeuCau($maDon, $trangThai){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "UPDATE donyeucau 
                            SET trangthai = '$trangThai'
                        WHERE madon = $maDon";
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