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
            $donVi = 'KG';
            if(isset($_POST['donVi'])){
                $donVi = $_POST['donVi'];
            }
         }
         if($action === 'capNhatSanPham'){
            $maSanPham = $_POST['maSanPham'];
            $tenSanPham = $_POST['tenSanPham'];
            $donVi = 'KG';
            if(isset($_POST['donVi'])){
                $donVi = $_POST['donVi'];
            }
         }
         if($action === 'xoaSanPham'){
            $maSanPham = $_POST['maSanPham'];
            $loai = $_POST['loai'];
         }
         if($action === 'layMotSoSanPhamTheoKho' ){
            $maSanPham = null;
            if(isset($_POST['maSanPham']) && $_POST['maSanPham'] != 'null'){
                $maSanPham = explode(',', $_POST['maSanPham']);
            }
            $kho = $_POST['kho'];
         }
         if( $action === 'layDanhMucSanPhamTheoKho'){
            $maSanPham = null;
            if(isset($_POST['maSanPham']) && $_POST['maSanPham'] != 'null'){
                $maSanPham = explode(',',$_POST['maSanPham']);
            }
            $kho = $_POST['kho'];
         }
         if( $action === 'xoaChiTietSanPham'){
            $maChiTietSanPham = $_POST['maChiTietSanPham'];
         }
         if($action === 'capNhatXoaChiTietSanPham'){
            $maChiTietSanPham = explode(',', $_POST['maChiTietSanPham']);
           
         }
         if($action === 'laySanPhamHetHan'){
            $tinhTrang = 0;
            if(isset($_POST['tinhTrang']) && $_POST['tinhTrang'] != 'null'){
                $tinhTrang = $_POST['tinhTrang'];
            }
         }
        if( $action ===  'capNhatDanhSachKhoMoi' ){
            $maChiTietSanPham = explode(',', $_POST['dsMa']);
            $maKho =  explode(',', $_POST['dsKho']);
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
            case "laySanPhamHetHan":
                laySanPhamHetHan($tinhTrang);
                break;
            case 'laySanPhamTieuHuy':
                laySanPhamTieuHuy();
                break;
            case "laySanPhamHetSoLuong":
                laySanPhamHetSoLuong();
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
                themSanPham($maSanPham, $tenSanPham, $loai,$donVi);
                break;
            case "capNhatSanPham":
                capNhatSanPham($maSanPham, $tenSanPham, $donVi);
                break;
            case 'capNhatDanhSachKhoMoi':
                capNhatDanhSachKhoMoi($maChiTietSanPham, $maKho);
                break;
            case 'xoaSanPham':
                xoaSanPham($maSanPham,$loai );
                break;
            case 'xoaChiTietSanPham':
                xoaChiTietSanPham($maChiTietSanPham);
                break;
            case 'capNhatXoaChiTietSanPham':
                capNhatXoaChiTietSanPham($maChiTietSanPham);
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
    function laySanPhamHetHan($tinhTrang){
        $p = new ControlSanPham(); 
        $res = $p->laySanPhamHetHan($tinhTrang);
         echo json_encode($res);
    }
    function laySanPhamTieuHuy(){
        $p = new ControlSanPham(); 
        $res = $p->laySanPhamTieuHuy();
         echo json_encode($res);
    }
    function laySanPhamHetSoLuong(){
        $p = new ControlSanPham(); 
        $res = $p->laySanPhamHetSoLuong();
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
    function themSanPham($maSanPham, $tenSanPham,$loai,$donVi){
        $p = new ControlSanPham(); 
        $res = $p->themSanPham($maSanPham, $tenSanPham, $loai,$donVi);
        if (!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function capNhatSanPham($maSanPham, $tenSanPham,$donVi){
        $p = new ControlSanPham(); 
        $res = $p->capNhatSanPham($maSanPham, $tenSanPham,$donVi);
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
    function capNhatXoaChiTietSanPham($maChiTietSanPham){
        $p = new ControlSanPham(); 
        $res = $p->capNhatXoaChiTietSanPham($maChiTietSanPham);
        echo json_encode($res);
    }
    function capNhatDanhSachKhoMoi($maChiTietSanPham, $maKho){
        $p = new ControlSanPham();
        for ($i=0; $i < count($maChiTietSanPham); $i++) { 
            $res = $p->capNhatDanhSachKhoMoi($maChiTietSanPham[$i], $maKho[$i]);
            if(!$res){
                echo json_encode($res);
                return;
            }
        }
         echo json_encode($res);
    }
    function xoaChiTietSanPham($maChiTietSanPham ){
        $p = new ControlSanPham();
        $res = $p->xoaChiTietSanPham($maChiTietSanPham);
        echo json_encode($res);
    }
    
?>