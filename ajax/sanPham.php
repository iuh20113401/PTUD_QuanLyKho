<?php
session_start();

    include_once("../controller/cSanPham.php");

    if(isset($_POST["action"])){
        $action = $_POST["action"];
        if($action === "laySanPhamTheoTen"){
            $ten = $_POST['ten'];
            $loai = $_POST['loai'];
         }
        if($action === "laySanPhamTheoKho"){
            $kho = $_POST['kho'];
         }
         if($action === 'layChiTietSanPham'){
            $maSanPham = $_POST['maSanPham'];
         }
         if($action === 'themSanPham'){
            $maSanPham = $_POST['maSanPham'];
            $tenSanPham = $_POST['tenSanPham'];
            $loai = $_POST['loai'];
         }
         if($action === 'capNhatSanPham'){
            $maSanPham = $_POST['maSanPham'];
            $tenSanPham = $_POST['tenSanPham'];
         }
         if($action === 'xoaSanPham'){
            $maSanPham = $_POST['maSanPham'];
            $loai = $_POST['loai'];
         }
         if($action === 'layMotSoSanPhamTheoKho' ){
            $maSanPham = null;
            if(isset($_POST['maSanPham'])){
                $maSanPham = $_POST['maSanPham'];
            }
            $kho = $_POST['kho'];
         }
         if( $action === 'layDanhMucSanPhamTheoKho'){
            $maSanPham = null;
            if(isset($_POST['maSanPham']) && $_POST['maSanPham'] != null){
                $maSanPham = explode(',',$_POST['maSanPham']);
            }
            $kho = $_POST['kho'];
         }

        switch($action){
            case "layToanBoSanPham":
                layToanBoSanPham();
                break;
            case "layToanBoNguyenLieu":
                layToanBoNguyenLieu();
                break;
            case "layToanBoThanhPham":
                layToanBoThanhPham();
                break;
            case "laySanPhamTheoTen":
                laySanPhamTheoTen($ten,$loai);
                break;
            case "laySanPhamTheoKho":
                laySanPhamTheoKho($kho);
                break;
            case "layMotSoSanPhamTheoKho":
                layMotSoSanPhamTheoKho($kho, $maSanPham);
                break;
            case "layDanhMucSanPhamTheoKho":
                layDanhMucSanPhamTheoKho($kho, $maSanPham);
                break;
            case 'layChiTietSanPham':
                layChiTietSanPham($maSanPham);
                break;
            case "themSanPham":
                themSanPham($maSanPham, $tenSanPham, $loai);
                break;
            case "capNhatSanPham":
                capNhatSanPham($maSanPham, $tenSanPham);
                break;
            case 'xoaSanPham':
                xoaSanPham($maSanPham,$loai );
                break;
        }
    }
    function layToanBoSanPham(){
        $p = new ControlSanPham(); 
        $res = $p->layToanBoSanPham();
         echo json_encode($res);
        
    }
    function layToanBoNguyenLieu(){
        $p = new ControlSanPham(); 
        $res = $p->layToanBoNguyenLieu();
         echo json_encode($res);
    }
    function layToanBoThanhPham(){
        $p = new ControlSanPham(); 
        $res = $p->layToanBoThanhPham();
         echo json_encode($res);
    }
    function laySanPhamTheoTen($ten,$loai){
        $p = new ControlSanPham(); 
        $res = $p->laySanPhamTheoTen($ten,$loai);
         echo json_encode($res);
    }
    function layMotSoSanPhamTheoKho($kho,$maSanPham){
        $p = new ControlSanPham(); 
        $res = $p->layMotSoSanPhamTheoKho($kho,$maSanPham);
        echo json_encode($res);
    }
    function layDanhMucSanPhamTheoKho($kho,$maSanPham){
        $p = new ControlSanPham(); 
        $res = $p->layDanhMucSanPhamTheoKho($kho,$maSanPham);
        echo json_encode($res);
    }
    function laySanPhamTheoKho($kho){
        $p = new ControlSanPham(); 
        $res = $p->laySanPhamTheoKho($kho);
        if (!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function layChiTietSanPham($maSanPham){
        $p = new ControlSanPham(); 
        $res = $p->layChiTietSanPham($maSanPham);
        if (!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function themSanPham($maSanPham, $tenSanPham,$loai){
        $p = new ControlSanPham(); 
        $res = $p->themSanPham($maSanPham, $tenSanPham, $loai);
        if (!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function capNhatSanPham($maSanPham, $tenSanPham){
        $p = new ControlSanPham(); 
        $res = $p->capNhatSanPham($maSanPham, $tenSanPham);
        if (!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function xoaSanPham($maSanPham,$loai ){
        $p = new ControlSanPham(); 
        $res = $p->xoaSanPham($maSanPham,$loai );
         echo json_encode($res);
    }
    ?>