<?php
session_start();

    include_once("../controller/cDonYeuCau.php");
    if(isset($_POST["action"])){
        $action = $_POST["action"];
        $trangThai = null;
        if($action == "layDonYeuCau"){
            if(isset($_POST["trangThai"]) && $_POST["trangThai"] != 'null'){
                $trangThai = $_POST["trangThai"];
            }
        }
        if($action == "layDonYeuCauTheoTaiKhoan"){
            $maTaiKhoan = $_SESSION['maTaiKhoan'];
            if(isset($_POST["trangThai"]) && $_POST["trangThai"] != 'null'){
                $trangThai = $_POST["trangThai"];
            }
        }
        if($action === "layChiTietDonYeuCau"){
            $maDon = $_POST["maDon"];
        }
        if($action === "capNhatTrangThaiDonYeuCau"){
            $maDon = $_POST["maDon"];
            $trangThai = $_POST["trangThai"];
            $loai = null;
            if(isset($_POST["loai"]) && $_POST["loai"] != 'null'){
                $loai = $_POST["loai"];
            }
        }
        switch($action){
            case "layDonYeuCau":
                layDonYeuCau($trangThai);
                break;
            case 'layChiTietDonYeuCau':
                layChiTietlayDonYeuCau($maDon);
                break;
            case 'capNhatTrangThaiDonYeuCau':
                capNhatTrangThaiDonYeuCau($maDon,$trangThai, $loai);
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
    function capNhatTrangThaiDonYeuCau($maDon, $trangThai,$loai){
        $p = new ControlDonYeuCau(); 
        $res = $p->capNhatTrangThaiDonYeuCau($maDon,$trangThai,$loai);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    
    ?>