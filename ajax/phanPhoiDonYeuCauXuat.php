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
            $maChiTietSanPham = explode(",",$_POST['MaChiTietSanPham']);
            $soLuong = explode(",",$_POST['SoLuong']);
            $maKho = explode(",",$_POST['Kho']);
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
        $uniqueArray = array_unique($maKho);
        $uniqueArray = array_values($uniqueArray);
        for($i = 0; $i < count($uniqueArray); $i++){
            // Chuyển đổi $maSanPham[$i] thành chuỗi
            $maDonStr = strval($maDon);

            // Lấy số đầu tiên và 3 số cuối
            $soDauTien = intval($maDonStr[1]) + 1;
            $baSoCuoi = rand(100, 999);

            // Lấy ngày, tháng, và 2 số cuối của năm hiện tại
            $ngayHienTai = date("d"); // Ngày hiện tại
            $thangHienTai = date("m"); // Tháng hiện tại
            // Tạo mã chi tiết
            $maChiTiet = $soDauTien  . $ngayHienTai . $thangHienTai . $baSoCuoi;
            array_push($maPhieu,$maChiTiet);
            $res = lapPhieuXuat($maPhieu[$i],$maDon ,$uniqueArray[$i], $maTaiKhoan, $ngayLap, null,$trangThai);
        }
        if(!$res){
            echo json_encode(false);
            return;
        }
        $i =0;
        $n = 0;
        while($i < count($maChiTietSanPham)){
             $index = array_search($maKho[$i], $uniqueArray);
             $res = themChiTietPhieuXuat($maPhieu[$index], $maChiTietSanPham[$i], $soLuong[$i]);
             $i++;
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
            return $res;
        }
    function capNhatTrangThaiDonYeuCau($maDon, $trangThai){
        $p = new ControlDonYeuCau(); 
        $res = $p->capNhatTrangThaiDonYeuCau($maDon, $trangThai,null);
        return $res;
    }

?>