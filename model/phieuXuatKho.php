<?php
    include_once("../model/ketnoi.php");
     class PhieuXuat{
        function layPhieuXuatKhoTheoKho($maKho){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "CALL layPhieuXuatKhoTheoKho($maKho)";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
       function lapPhieuXuat($maPhieu, $maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayXuat,$trangThai){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "INSERT phieuxuat VALUES($maPhieu,$maDon, $maTaiKhoan, '$trangThai','$ngayLap', '$ngayXuat',$maKho)";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
        function themChiTietPhieuXuat($maPhieu, $maChiTietSanPham, $soLuong){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "insert chitietphieuxuat values($maPhieu, $maChiTietSanPham, $soLuong)";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
        function layChiTietPhieuXuat($maPhieu){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "CALL layChiTietPhieuXuat($maPhieu)";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
        function layTrangThaiPhieuNhap($maDon){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = " SELECT DISTINCT pn.TrangThai FROM phieunhap as pn JOIN donyeucau as d on d.MaDon = pn.MaDon JOIN chitietdonyeucau as ctd on ctd.MaDon = $maDon";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
        function xacNhanXuatKho($maPhieu, $ngayXuat){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "UPDATE phieuxuat 
                set ngayxuat = '$ngayXuat',
                trangThai = 'Đã xuất'
                WHERE maphieu = $maPhieu";
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
