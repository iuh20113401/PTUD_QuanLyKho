<?php
session_start();

    include_once("../controller/cXemDonYeuCauCu.php");
    include_once("../controller/cDonYeuCau.php");
    include_once ("../controller/cPhieuXuat.php");
    include_once ("../controller/cPhieuNhap.php");

    if(isset($_POST["action"])){
        $action = $_POST["action"];
        if($action === "layDonYeuCauCuTheoTaiKhoan"){
            $maTaiKhoan = $_POST["maTaiKhoan"];
        }
        if($action === "layChiTietNguyenLieu"){
            $maDon = $_POST["maDon"];
        }
        if($action === "layPhieuXuatKhoTheoTaiKhoan"){
            $maTaiKhoan = $_POST["maTaiKhoan"];
        }
        if($action === "layChiTietPhieuXuat"){
            $maPhieu = $_POST['maPhieu'];
         }
         if($action === 'layPhieuNhapKhoTheoTaiKhoan'){
            $maTaiKhoan = $_POST['maTaiKhoan'];
         }
         if($action === 'layChiTietPhieuNhap'){
            $maPhieu = $_POST['maPhieu'];
         }

        switch($action){
            case "layDonYeuCauCuTheoTaiKhoan":
                layDonYeuCauCuTheoTaiKhoan($maTaiKhoan);
                break;
            case "layChiTietNguyenLieu":
                layChiTietDonYeuCau($maDon);
                break;
            case "layPhieuXuatKhoTheoTaiKhoan":
                layPhieuXuatKhoTheoTaiKhoan($maTaiKhoan);
                break;
            case "layChiTietPhieuXuat":
                layChiTietPhieuXuat($maPhieu);
                break;
            case "layPhieuNhapKhoTheoTaiKhoan":
                layPhieuNhapKhoTheoTaiKhoan($maTaiKhoan);
                break;
            case "layChiTietPhieuNhap":
                layChiTietPhieuNhap($maPhieu);
                break;
        }
    }
    function layDonYeuCauCuTheoTaiKhoan($maTaiKhoan){
        $p = new ControlDonYeuCauCu(); 
        $res = $p->layDonYeuCauCuTheoTaiKhoan($maTaiKhoan);
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
    function layPhieuXuatKhoTheoTaiKhoan($maTaiKhoan){
        $p = new ControlPhieuXuat(); 
        $res = $p->layPhieuXuatKhoDaXuatTheoTaiKhoan($maTaiKhoan);
        if (!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    
    }
    function layChiTietPhieuXuat($maPhieu){
        $p = new ControlPhieuXuat(); 
        $res = $p->layChiTietPhieuXuat($maPhieu);
        if (!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
     function layPhieuNhapKhoTheoTaiKhoan($maTaiKhoan){
        $p = new ControlPhieuNhap(); 
        $res = $p->layPhieuNhapKhoChoNhapTheoKho($maTaiKhoan);
        if (!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    
    }
    function layChiTietPhieuNhap($maPhieu){
        $p = new ControlPhieuNhap(); 
        $res = $p->layChiTietPhieuNhap($maPhieu);
        if (!$res){
            echo json_encode(false);
        }else{

            echo json_encode($res);
        }
    }
    ?>