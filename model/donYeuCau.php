<?php
include_once("../model/ketnoi.php");
class DonYeuCau{
    function layDonYeuCau( $maTaiKhoan = null, $trangThai = null){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "SELECT DISTINCT d.MaDon, d.MaLoai,MaTaiKhoan, TenLoai,NgayLap, d.TrangThai,d.SoLuong as soluongnguyenlieu
            FROM donyeucau as d JOIN chitietdonyeucau as ctd on ctd.MaDon = d.MaDon JOIN loaidon as ld on d.MaLoai = ld.MaLoai ";
            if ($trangThai !== null) {
                // Nếu có trạng thái được chỉ định, thêm điều kiện vào câu truy vấn
                $query .= " WHERE d.TrangThai = :trangThai";
                
            }
            if($trangThai !== null && $maTaiKhoan !== null){
                $query .= " and d.mataikhoan = :maTaiKhoan;";
            }
            if($trangThai === null && $maTaiKhoan !== null){
                $query .= " WHERE d.maTaiKhoan = :maTaiKhoan;";
            }
            $stmt = $conn->prepare($query);
            if ($trangThai !== null) {
                // Bind giá trị trạng thái vào câu truy vấn nếu có
                $stmt->bindParam(":trangThai", $trangThai);
            }
            if($maTaiKhoan !== null){
                $stmt->bindParam(":maTaiKhoan", $maTaiKhoan);
            }
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    function layDonYeuCauDaDuyet(){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "CALL layDonYeuCauDaDuyet()";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }

    function layChiTietDonYeuCau($maDon){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "CALL layDonYeuCauTheoMaDon(:maDon)";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maDon', $maDon, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }

    function capNhatChiTietDonYeuCau($maDon, $maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
                $query = "UPDATE chitietdonyeucau SET NgaySanXuat = :ngaySanXuat, NgayHetHan = :ngayHetHan, ViTriKho = :viTriKho WHERE MaDon = :maDon and MaSanPham = :maSanPham";
                $stmt = $conn->prepare($query);
                $stmt->execute([
                    ':ngaySanXuat' => $ngaySanXuat,
                    ':ngayHetHan' => $ngayHetHan,
                    ':viTriKho' => $viTriKho,
                    ':maDon' => $maDon,
                    ':maSanPham' => $maSanPham
                ]);

                $query2 = "UPDATE sanpham as sp join chitietdonyeucau as ctd on sp.MaSanPham = ctd.MaSanPham SET soluongchonhap = soluongchonhap + ctd.soluong where ctd.MaSanPham = :maSanPham and ctd.MaDon = :maDon";
                $stmt2 = $conn->prepare($query2);
                $stmt2->bindParam(':maSanPham', $maSanPham, PDO::PARAM_INT);
                $stmt2->bindParam(':maDon', $maDon, PDO::PARAM_INT);
                return  $stmt2->execute();
        }
    }

    function capNhatTrangThaiDonYeuCau($maDon, $trangThai){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "UPDATE donyeucau SET trangthai = :trangThai WHERE madon = :maDon";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':trangThai', $trangThai, PDO::PARAM_STR);
            $stmt->bindParam(':maDon', $maDon, PDO::PARAM_INT);
            return  $stmt->execute();
        }
    }
    function lapDonYeuCau($maDon, $maLoai, $maTaiKhoan, $ngayLap, $soLuong, $trangThai){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "INSERT donyeucau value (:maDon, :maLoai, :maTaiKhoan, :ngayLap, :soLuong,:trangThai)";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maLoai', $maLoai);
            $stmt->bindParam(':maTaiKhoan', $maTaiKhoan);
            $stmt->bindParam(':ngayLap', $ngayLap);
            $stmt->bindParam(':soLuong', $soLuong);
            $stmt->bindParam(':trangThai', $trangThai);
            $stmt->bindParam(':maDon', $maDon);
            return  $stmt->execute();
        }
    }
    function themChiTietDonYeuCau($maDon, $maSanPham, $soLuong, $donVi, $ngaySanXuat, $ngayHetHan, $viTriKho){
        $p = new KetNoi();
        $p->ketNoi($conn);
        if(!$conn){
            return false;
        } else {
            $query = "INSERT chitietdonyeucau value (:maDon, :maSanPham, :soLuong, :donVi, :ngaySanXuat,:ngayHetHan,:viTriKho)";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':maSanPham', $maSanPham);
            $stmt->bindParam(':soLuong', $soLuong);
            $stmt->bindParam(':donVi', $donVi);
            $stmt->bindParam(':ngaySanXuat', $ngaySanXuat);
            $stmt->bindParam(':ngayHetHan', $ngayHetHan);
            $stmt->bindParam(':viTriKho', $viTriKho);
            $stmt->bindParam(':maDon', $maDon);
            return  $stmt->execute();;
        }
    }
    
}
?>

