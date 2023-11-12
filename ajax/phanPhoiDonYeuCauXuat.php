<?php
session_start();

    include_once("../controller/cDonYeuCauXuat.php");
    include_once("../controller/cPhieuXuat.php");
    include_once("../controller/cDonYeuCau.php");
    if(isset($_POST["action"])){
        $action = $_POST["action"];
        if($action === "layDon"){
            $maDon = $_POST["maDon"];
        }
        if($action === "layDanhSachSanPham"){
            $maSanPham = $_POST['maSanPham'];
        }
        if($action === 'lapPhieuXuatKho'){
            $maDon = $_POST['maDon'];
            $maChiTietSanPham = $_POST['MaChiTietSanPham'];
            $soLuong = $_POST['SoLuong'];
            $maKho = $_POST['Kho'];
            $maTaiKhoan = 2;
            $ngayLap = date('Y-m-d');
            $trangThai = 'Chờ xuất';
        }
        switch($action){
            case "layTatCaDon":
                layDonYeuCauXuatDaDuyet();
                break;
            case "layDon":
                layChiTietDonYeuCau($maDon);
                break;
            case "layDanhSachSanPham":
                layDanhSachSanPham($maSanPham);
                break;
            case 'lapPhieuXuatKho':
                lapPhieuXuatKho($maDon, $maKho, $maTaiKhoan, $ngayLap,$trangThai,$maChiTietSanPham, $soLuong);    
                break;
        }
    }
    function layDonYeuCauXuatDaDuyet(){
        $p = new ControlDonYeuCauXuat(); 
        $res = $p->layDonYeuCauXuatDaDuyet();
        if(!$res){
            echo json_encode(false);
        }else{

            echo json_encode($res);
        }
    }
    function layChiTietDonYeuCau($maDon){
        $p = new ControlDonYeuCauXuat(); 
        $res = $p->layChiTietDonYeuCau($maDon);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function layDanhSachSanPham($maSanPham){
        $p = new ControlDonYeuCauXuat(); 
        $res = $p->layDanhSachSanPham($maSanPham);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function lapPhieuXuatKho($maDon, $maKho, $maTaiKhoan, $ngayLap,$trangThai,$maChiTietSanPham, $soLuong){
        $maPhieu = [];
        echo json_encode($maKho);
        for($i = 0; $i < count(array_unique($maKho)); $i++){
            array_push($maPhieu,rand(0,1000));
            $res = lapPhieuXuat($maPhieu[$i],$maDon ,$maKho[$i], $maTaiKhoan, $ngayLap, null,$trangThai);
        }
        if(!$res){
            echo json_encode(false);
            return;
        }
        $i =0;
        $n = 0;
        while($i < count($maChiTietSanPham)){
             $res = themChiTietPhieuXuat($maPhieu[$n], $maChiTietSanPham[$i], $soLuong[$i]);
             $i++;
             if($i < count ($maChiTietSanPham)){
               $maKho[$i] != $maKho[$i-1] ? $n++ : $n;
             }
        } 
           
        if(!$res){
            echo json_encode(false);
            return;
        }
        $res = capNhatTrangThaiDonYeuCau($maDon, "Đã phân phối");
        echo json_encode($res);
    }
    function lapPhieuXuat($maPhieu,$maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayXuat,$trangThai){
             $p = new ControlPhieuXuat();
             $res = $p->lapPhieuXuat($maPhieu,$maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayXuat,$trangThai);
             if (!$res) {
                 return false;
             } else {
                 return true;
             }
         }
    function themChiTietPhieuXuat($maPhieu, $maChiTietSanPham, $soLuong){
                $p = new ControlPhieuXuat();
             $res = $p->themChiTietPhieuXuat($maPhieu, $maChiTietSanPham, $soLuong);
             if (!$res) {
                 return false;
             } else {
                 return true;
             }
        }
    function capNhatTrangThaiDonYeuCau($maDon, $trangThai){
        $p = new ControlDonYeuCau(); 
        $res = $p->capNhatTrangThaiDonYeuCau($maDon, $trangThai);
        if (!$res){
           echo json_encode(false);
        }else{
           echo json_encode(true);
        }
    }

?>