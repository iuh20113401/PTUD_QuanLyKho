<?php
    include_once("../model/ketnoi.php");
     class PhieuNhap{
        function layPhieuNhapKhoTheoKho($maKho){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "CALL layPhieuNhapKhoTheoKho('',$maKho, 'Chờ nhập')";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
        function layPhieuNhapKhoTheoTaiKhoan($maTaiKhoan){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "CALL layPhieuNhapKhoTheoKho($maTaiKhoan,'', 'Đã nhập kho')";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
       function lapPhieuNhap($maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayNhap,	$trangThai){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $ngayNhap = date("Y-m-d");
                $maPhieu = rand(1,1000);
                $query = "insert phieunhap values($maPhieu,$maDon ,$maKho, $maTaiKhoan, '$ngayLap', '$ngayNhap','$trangThai')";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
        function layChiTietPhieuNhap($maPhieu){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "CALL layChiTietPhieuNhap($maPhieu)";
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
        function themChiTietNguyenLieu($maChiTiet, $maSanPham, $maPhieu, $maKho, $soLuongTon,$donVi, $gia, $ngaySanXuat, $ngayHetHan){
             $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "INSERT chitietsanpham values ($maChiTiet, $maSanPham, $maPhieu, $maKho, $soLuongTon, '$donVi', $gia, '$ngaySanXuat', '$ngayHetHan','Tồn kho')";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    echo json_encode($query);
                    return false;
                }else{
                    return $res;
                }
            }
        }
        function xacNhanNhapKho($maPhieu){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "CALL xacNhanNhapKho($maPhieu)";
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
