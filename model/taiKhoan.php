<?php
    include_once("../model/ketnoi.php");
     class TaiKhoan{
        function themTaiKhoan($maTaiKhoan,$loai, $tenDangNhap, $pass){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "INSERT taikhoan VALUES ($maTaiKhoan,$loai,' $tenDangNhap', '$pass')";
                $res = mysqli_query($conn,$query);
                echo json_decode($query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return true;
                }
            }
        }
       
    }
?>
