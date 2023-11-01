<?php
    include_once("../model/ketnoi.php");
     class DonYeuCau{
        function layDonYeuCauDaDuyet(){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "CALL layDonYeuCauDaDuyet()";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
       function layChiTietDonYeuCau($maDon){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "CALL layDonYeuCauTheoMaDon($maDon)";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
        function capNhatChiTietDonYeuCau($maDon,$maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "UPDATE chitietdonyeucau SET NgaySanXuat = '$ngaySanXuat', NgayHetHan = '$ngayHetHan', ViTriKho = $viTriKho WHERE MaDon = $maDon and MaSanPham = $maSanPham; 
                ";
                $res = mysqli_query($conn,$query);
                $query2 = "UPDATE sanpham as sp join chitietdonyeucau as ctd on sp.MaSanPham = ctd.MaSanPham SET soluongchonhap = soluongchonhap + soluong where ctd.MaSanPham = $maSanPham;";
                $res2 = mysqli_query($conn,$query2);
                $p->dongKetNoi($conn);
                if(!$res || !$res2){
                    return false;
                }else{
                    return true;
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
