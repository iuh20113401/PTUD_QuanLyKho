<?php
    include_once("../model/ketnoi.php");
     class DonYeuCauXuat{
        function layDonYeuCauXuatDaDuyet(){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "CALL layDonYeuCauXuatDaDuyet()";
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
        function layDanhSachSanPham($maSanPham){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "SELECT ctsp.MaChiTietSanPham,sp.MaSanPham, sp.TenSanPham, ctsp.soluongton, ctsp.DonVi, ctsp.NgaySanXuat, ctsp.NgayHetHan,ctsp.MaKho FROM chitietsanpham as ctsp join sanpham as sp on sp.MaSanPham = ctsp.MaSanPham where sp.masanpham = $maSanPham";
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
