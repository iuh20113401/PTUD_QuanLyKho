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
            $maSanPham = $_POST['maSanPham'];
            $ngaySanXuat = $_POST['ngaySanXuat'];
            $ngayHetHan = $_POST['ngayHetHan'];
            $viTriKho = $_POST['viTriKho'];
            $trangThai = $_POST['trangThai'];
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
                capNhatDonYeuCau($maDon, $maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho, $trangThai, 2);
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
    function capNhatDonYeuCau($maDon, $maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho, $trangThai, $maTaiKhoan){

         for ($i=0; $i < count($maSanPham); $i++) { 
            $res = capNhatChiTietDonYeuCau($maDon,$maSanPham[$i], $ngaySanXuat[$i], $ngayHetHan[$i], $viTriKho[$i]);
         }
         if(!$res) echo json_encode(false); 
         $uniqueArray = array_unique($viTriKho);
         $uniqueArray = array_values($uniqueArray);
         for ($i=0; $i < count($uniqueArray); $i++) { 
           $res = lapPhieuNhap($maDon ,$uniqueArray[$i], $maTaiKhoan,date("Y-m-d"), null, "Chờ nhập");
         }
            if(!$res) echo json_encode(false); 
         $res = capNhapTrangThaiDonYeuCau($maDon, $trangThai);
         echo json_encode($res);
    }
    function capNhatChiTietDonYeuCau($maDon,$maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho){
        $p = new ControlDonYeuCau(); 
        $res = $p->capNhatChiTietDonYeuCau($maDon,$maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho);
        if (!$res){
           echo json_encode(false);
        }else{
           echo json_encode(true);
        }
    }
    function capNhapTrangThaiDonYeuCau($maDon, $trangThai){
        $p = new ControlDonYeuCau(); 
        $res = $p->capNhatTrangThaiDonYeuCau($maDon, $trangThai);
        if (!$res){
           echo json_encode(false);
        }else{
           echo json_encode(true);
        }
    }
    function lapPhieuNhap($maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayNhap,	$trangThai){
        $p = new ControlPhieuNhap(); 
        $res = $p->lapPhieuNhap($maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayNhap,	$trangThai);
        if (!$res){
          return false;
        }else{
           return true;
        }
    }


?>