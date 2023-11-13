<?php
session_start();

    include_once("../controller/cDonYeuCau.php");
    if(isset($_POST["action"])){
        $action = $_POST["action"];
<<<<<<< HEAD
<<<<<<< HEAD
        $trangThai = null;
        if($action == "layDonYeuCau"){
            if(isset($_POST["trangThai"]) && $_POST["trangThai"] != 'null'){
=======
        $trangThai =null;
        if($action == "layDonYeuCau"){
            if(isset($_POST["trangThai"]) && $_POST["trangThai"] != null){
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
        $trangThai =null;
        if($action == "layDonYeuCau"){
            if(isset($_POST["trangThai"]) && $_POST["trangThai"] != null){
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
                $trangThai = $_POST["trangThai"];
            }
        }
        if($action == "layDonYeuCauTheoTaiKhoan"){
            $maTaiKhoan = $_SESSION['maTaiKhoan'];
<<<<<<< HEAD
<<<<<<< HEAD
            if(isset($_POST["trangThai"]) && $_POST["trangThai"] != 'null'){
=======
            if(isset($_POST["trangThai"]) && $_POST["trangThai"] != null){
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
            if(isset($_POST["trangThai"]) && $_POST["trangThai"] != null){
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
                $trangThai = $_POST["trangThai"];
            }
        }
        if($action === "layChiTietDonYeuCau"){
            $maDon = $_POST["maDon"];
        }
        if($action === "capNhatTrangThaiDonYeuCau"){
            $maDon = $_POST["maDon"];
            $trangThai = $_POST["trangThai"];
        }
        switch($action){
            case "layDonYeuCau":
                layDonYeuCau($trangThai);
                break;
            case 'layChiTietDonYeuCau':
                layChiTietlayDonYeuCau($maDon);
                break;
            case 'capNhatTrangThaiDonYeuCau':
                capNhatTrangThaiDonYeuCau($maDon,$trangThai);
                break;
            case "layDonYeuCauTheoTaiKhoan":
                 layDonYeuCauTheoTaiKhoan($maTaiKhoan, $trangThai);
                break;
        }
    }
    function layDonYeuCau($trangThai){
        $p = new ControlDonYeuCau(); 
        $res = $p->layDonYeuCau($trangThai);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function layDonYeuCauTheoTaiKhoan($maTaiKhoan, $trangThai){
        $p = new ControlDonYeuCau(); 
        $res = $p->layDonYeuCauTheoTaiKhoan($maTaiKhoan, $trangThai);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function layChiTietlayDonYeuCau($maDon){
        $p = new ControlDonYeuCau(); 
        $res = $p->layChiTietDonYeuCau($maDon);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function capNhatTrangThaiDonYeuCau($maDon, $trangThai){
        $p = new ControlDonYeuCau(); 
        $res = $p->capNhatTrangThaiDonYeuCau($maDon,$trangThai);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    
    ?>