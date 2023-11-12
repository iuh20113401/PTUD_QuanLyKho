<?php
include_once("../model/ketnoi.php");
class KiemKe{
    function lapDonKiemKe( $maKiemKe,$maTaiKhoan,$ngayLap,$tinhTrang,$kho,$loai,$moTa){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "INSERT kiemke values (:maKiemKe,:maTaiKhoan, :ngayLap,:tinhTrang,:kho,:loai,:moTa) ";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maKiemKe', $maKiemKe);
            $stmt->bindParam(':maTaiKhoan', $maTaiKhoan);
            $stmt->bindParam(':ngayLap', $ngayLap);
            $stmt->bindParam(':tinhTrang', $tinhTrang);
            $stmt->bindParam(':kho', $kho);
            $stmt->bindParam(':loai', $loai);
            $stmt->bindParam(':moTa', $moTa);
            return $stmt->execute();
        }
    }
    function layDonKiemKe($trangThai, $maTaiKhoan = null){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "SELECT TenDangNhap, kk.MaTaiKhoan, NgayLap, Kho, MoTa, MaKiemKe, 
                CASE 
                    WHEN Loai = 1 THEN 'Toàn bộ'
                    else 'Theo sản phẩm'
                END AS Loai,
                CASE 
                    WHEN TinhTrang = 0 THEN 'Chờ duyệt'
                    WHEN TinhTrang = 1 THEN 'Không duyệt'
                    WHEN TinhTrang = 2 THEN 'Đã duyệt'
                    WHEN TinhTrang = 3 THEN 'Bình thường'
                    WHEN TinhTrang = 4 THEN 'Lỗi'
                    else 'Đã tiêu hủy'
                END AS TinhTrang
            	 FROM kiemke as kk join taikhoan as tk on tk.MaTaiKhoan = kk.MaTaiKhoan";
            if($trangThai != null){
                $query .= "WHERE tinhtrang = :trangThai";
            }
            if($trangThai != null && $maTaiKhoan != null){
                $query .= "AND mataikhoan = :maTaiKhoan";
            }
            if($trangThai == null && $maTaiKhoan != null){
                 $query .= "WHERE mataikhoan = :maTaiKhoan";
            }
            $stmt = $conn->prepare($query);
            if($trangThai != null){
                $stmt->bindParam(':trangThai', $trangThai);
            }
            if($maTaiKhoan != null){
                $stmt->bindParam(':maTaiKhoan', $maTaiKhoan );
            }
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    function layChiTietDonKiemKeLoi($maDon){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "SELECT kk.MaChiTietSanPham,sp.TenSanPham, 
                CASE 
                    WHEN kk.TinhTrang = 0 THEN 'Thiếu'
                    WHEN kk.TinhTrang = 1 THEN 'Dư'
                    else 'Hư hỏng'
                END AS TinhTrang, kk.MoTa, kk.SoLuong, sp.DonVi
            	 FROM chitietkiemke as kk join chitietsanpham as ctsp on ctsp.MaChiTietSanPham = kk.MaChiTietSanPham join sanpham as sp on sp.MaSanPham = ctsp.MaSanPham where kk.MaKiemKe = :maDon ";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maDon', $maDon, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    function capNhatTrangThai($maDon, $trangThai){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "UPDATE kiemke SET tinhTrang = :trangThai where makiemke = :maDon";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maDon', $maDon, PDO::PARAM_INT);
            $stmt->bindParam(':trangThai', $trangThai);
            return  $stmt->execute();
        }
    }
    function themChiTietDonKiemKe($maKiemKe,$maChiTietSanPham,$tinhTrang,$soLuong,$moTa){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "INSERT chitietkiemke values (:maKiemKe,:maChiTietSanPham,:tinhTrang,:soLuong,:moTa) ";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maKiemKe', $maKiemKe);
            $stmt->bindParam(':maChiTietSanPham', $maChiTietSanPham);
            $stmt->bindParam(':tinhTrang', $tinhTrang);
            $stmt->bindParam(':soLuong', $soLuong);
            $stmt->bindParam(':moTa', $moTa);
            return $stmt->execute();
        }
    }
}
?>

