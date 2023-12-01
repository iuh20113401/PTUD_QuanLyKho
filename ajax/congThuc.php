<?php
session_start();

    include_once("../controller/cCongThuc.php");

    if(isset($_POST["action"])){
        $action = $_POST["action"];
        $trangThai =null;
        if($action == "layChiTietCongThuc"){
           $maCongThuc = $_POST['maCongThuc'];
        }

        if($action === "themCongThuc"){
            $maCongThuc = $_POST["maCongThuc"];
            $tenCongThuc = $_POST["tenCongThuc"];
            $donViCT = $_POST["donViCT"];
            $moTa = $_POST["moTa"];
            $maSanPham = explode(',',$_POST["maSanPham"]);
            $soLuong = explode(',',$_POST["soLuong"]);
            $donVi = explode(',',$_POST["donVi"]);
        }
        if($action === "capNhatCongThuc"){
            $maCongThuc = $_POST['maCongThuc'];
            $tenCongThuc = $_POST["tenCongThuc"];
            $moTa = $_POST["moTa"];
            $maSanPham = explode(',',$_POST["maSanPham"]);
            $soLuong = explode(',',$_POST["soLuong"]);
            $donVi = explode(',',$_POST["donVi"]);
        }
        if($action === "xoaCongThuc"){
            $maCongThuc = $_POST['maCongThuc'];
        }
        
        switch($action){
            case "layCongThuc":
                layCongThuc();
                break;
            case 'layChiTietCongThuc':
                layChiTietCongThuc($maCongThuc);
                break;
            case "themCongThuc":
                xuLyThemCongThuc($maCongThuc,$tenCongThuc,$donViCT,$moTa,$maSanPham,$soLuong,$donVi);
                break;
            case 'capNhatCongThuc':
                xuLyCapNhatCongThuc($maCongThuc,$tenCongThuc,$moTa,$maSanPham,$soLuong,$donVi);
                break;
            case "xoaCongThuc":
                xoaCongThuc($maCongThuc);
                break;
        }
    }
    function layCongThuc(){
        $p = new ControlCongThuc(); 
        $res = $p->layToanBoCongThuc();
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function layChiTietCongThuc($maCongThuc){
        $p = new ControlCongThuc(); 
        $res = $p->layChiTietCongThuc($maCongThuc);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function themCongThuc($maCongThuc, $tenCongThuc,$donVi, $moTa, $soLuongNguyenLieu){
        $p = new ControlCongThuc(); 
        $res = $p->themCongThuc($maCongThuc, $tenCongThuc,$donVi, $moTa, $soLuongNguyenLieu);
        if(!$res){
            return false;
        }else{
            return true;
        }
    }
    function themChiTietCongThuc($maCongThuc, $maSanPham, $soLuong, $donVi){
        $p = new ControlCongThuc(); 
        $res = $p->themChiTietCongThuc($maCongThuc, $maSanPham, $soLuong, $donVi);
        if(!$res){
           return false;
        }else{
           return true;
        }
    }
    function xuLyThemCongThuc($maCongThuc,$tenCongThuc,$donViCT, $moTa,$maSanPham,$soLuong,$donVi){
        $res = themCongThuc($maCongThuc, $tenCongThuc, $donViCT, $moTa, count($maSanPham));
        if(!$res){
            echo json_encode("false Them công thức");
            return;
        }
        for ($i = 0; $i <  count($maSanPham); $i++) { 
            $res2 = themChiTietCongThuc($maCongThuc, $maSanPham[$i], $soLuong[$i], $donVi[$i]);
            if(!$res2){
                echo json_encode("false Them chi tiet");
                return;
            }
        }
        echo json_encode(true);
    }
    function xoaCongThuc($maCongThuc){
        $p = new ControlCongThuc(); 
        $res = $p->xoaCongThuc($maCongThuc);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function capNhatCongThuc($maCongThuc, $tenCongThuc, $moTa, $soLuongNguyenLieu){
        $p = new ControlCongThuc(); 
        $res = $p->capNhatCongThuc($maCongThuc, $tenCongThuc, $moTa, $soLuongNguyenLieu);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function capNhatChiTietCongThuc($maCongThuc, $maSanPham, $soLuong, $donVi){
        $p = new ControlCongThuc(); 
        $res = $p->capNhatChiTietCongThuc($maCongThuc, $maSanPham, $soLuong, $donVi);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function xuLyCapNhatCongThuc($maCongThuc,$tenCongThuc,$moTa,$maSanPham,$soLuong,$donVi){
        $res = capNhatCongThuc($maCongThuc, $tenCongThuc, $moTa, count($maSanPham));
        if(!$res){
            echo json_encode(false);
            return;
        }
        for ($i=0; $i <  count($maSanPham); $i++) { 
            $res2 = capNhatChiTietCongThuc($maCongThuc, $maSanPham[$i], $soLuong[$i], $donVi[$i]);
            if(!$res2){
                echo json_encode("false Them chi tiet");
                return;
            }
        }
        echo json_encode($res2);
    }
    ?>