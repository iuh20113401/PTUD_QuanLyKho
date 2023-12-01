<?php
session_start();

    include_once("../controller/cDonYeuCau.php");
    include_once("../controller/cPhieuNhap.php");
    include_once("../controller/cKho.php");
    if(isset($_POST["action"])){
        $action = $_POST["action"];
        if($action === "layDon"){
            $maDon = $_POST["maDon"];
        }
        if($action === "layKho"){
            $loai = $_POST["loai"];
            $soLuong = $_POST['soLuong'];
        }
        if($action === 'capNhatDonYeuCau'){
            $maDon = $_POST['maDon'];
            $maSanPham = explode(',', $_POST['maSanPham']);
            $ngaySanXuat =  explode(',',$_POST['ngaySanXuat']);
            $ngayHetHan =  explode(',',$_POST['ngayHetHan']);
            $viTriKho =  explode(',',$_POST['viTriKho']);
            $soLuong = explode(',',$_POST['soLuong']);
            $trangThai =  $_POST['trangThai'];
        }
        switch($action){
            case "layTatCaDon":
                layDonYeuCauDaDuyet();
                break;
            case "layDon":
                layChiTietDonYeuCau($maDon);
                break;
            case "layKho":
                layKhoPhuHop($loai,$soLuong);
                break;
            case 'capNhatDonYeuCau':
                capNhatDonYeuCau($maDon, $maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho, $trangThai, 2, $soLuong);
                break;
        }
    }
    function layDonYeuCauDaDuyet(){
        $p = new ControlDonYeuCau(); 
        $res = $p->layDonYeuCauDaDuyet();
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function layChiTietDonYeuCau($maDon){
        $p = new ControlDonYeuCau(); 
        $res = $p->layChiTietDonYeuCau($maDon);
        if(!$res){
            echo json_encode(false);
        }else{
            
            echo json_encode($res);
        }
    }
    function layKhoPhuHop($loai,$soLuong){
        
        $p = new ControllKho();
        $res = $p->layKhoPhuHop($loai,$soLuong);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function capNhatDonYeuCau($maDon, $maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho, $trangThai, $maTaiKhoan,$soLuong){
        // Mảng kết hợp để lưu giá trị theo mã sản phẩm
            $uniqueValues = array();
            for ($i = 0; $i < count($maSanPham); $i++) {
                $ma = $maSanPham[$i];
                if (!isset($uniqueValues[$ma])) {
                    $uniqueValues[$ma] = array(
                        'maSanPham' => $ma,
                        'ngaySanXuat' => $ngaySanXuat[$i],
                        'ngayHetHan' => $ngayHetHan[$i],
                    );
                }
            }
        $uniqueValuesArray = array_values($uniqueValues);
        for ($i=0; $i < count($uniqueValuesArray); $i++) { 
            $res = capNhatChiTietDonYeuCau($maDon,$uniqueValuesArray[$i]['maSanPham'], $uniqueValuesArray[$i]['ngaySanXuat'], $uniqueValuesArray[$i]['ngayHetHan'], $viTriKho[$i]);
        }
        $maPhieu = rand(0,1000); 
        $uniqueViTriKho = array_unique($viTriKho);
        $uniqueViTriKho = array_values($uniqueViTriKho);
        $soLuongMaPhieu = count($uniqueViTriKho);
        $maPhieu = array();
        // Tạo mã phiếu ngẫu nhiên
        for ($i = 0; $i < $soLuongMaPhieu; $i++) {
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
            array_push( $maPhieu, $maChiTiet);
            $res = lapPhieuNhap($maPhieu[$i],$maDon ,$uniqueViTriKho[$i], $maTaiKhoan,date("Y-m-d"), "Chờ nhập");
            if(!$res) {
                echo json_encode(false);
                return;
            };
        }
        for ($i=0; $i < count($maSanPham); $i++) { 
            $index = array_search($viTriKho[$i], $uniqueViTriKho);
            $res = lapChiTietPhieuNhap($maPhieu[$index], $maSanPham[$i], $soLuong[$i], "Chờ nhập", null);
            if(!$res) {
                echo json_encode(false);
                return;
            };
        }
        if(!$res) {
                echo json_encode(false);
                return;
            };
        $res = capNhapTrangThaiDonYeuCau($maDon, $trangThai);
        echo json_encode($res);
        return;
    }
    
    function capNhatChiTietDonYeuCau($maDon,$maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho){
        $p = new ControlDonYeuCau(); 
        $res = $p->capNhatChiTietDonYeuCau($maDon,$maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho);
        return $res;
    }
    function capNhapTrangThaiDonYeuCau($maDon, $trangThai){
        $p = new ControlDonYeuCau(); 
        $res = $p->capNhatTrangThaiDonYeuCau($maDon, $trangThai, null);
        return $res;
    }
    function lapPhieuNhap($maPhieu,$maDon,$maKho, $maTaiKhoan, $ngayLap,$trangThai){
        $p = new ControlPhieuNhap(); 
        $res = $p->lapPhieuNhap($maPhieu,$maDon ,$maKho, $maTaiKhoan, $ngayLap,	$trangThai);
        return $res;
    }
    function  lapChiTietPhieuNhap($maPhieu, $maSanPham, $soLuong, $trangThai, $ngayNhap){
        $p = new ControlPhieuNhap();
        $res = $p->lapChiTietPhieuNhap($maPhieu, $maSanPham, $soLuong, $trangThai, $ngayNhap);
        return $res;
    }

?>