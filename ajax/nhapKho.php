<?php
session_start();

    include_once ("../controller/cPhieuNhap.php");
    include_once ("../controller/cDonYeuCau.php");
    if (isset($_POST["action"])) {
        $action = $_POST["action"];
        if ($action == "layPhieuNhapKhoChoNhap") {
            $maKho = $_POST['maKho'];
        }
        if ($action == "layPhieuNhapKhoDaNhap") {
            $maKho = $_POST['maKho'];
        }
        if ($action == "layPhieuNhapKhoChoNhapQuanLy") {
            $maTaiKhoan = $_SESSION['maTaiKhoan'];
        }
        if ($action == "layPhieuNhapKhoDaNhapQuanLy") {
            $maTaiKhoan = $_SESSION['maTaiKhoan'];
        }
        if($action == 'layChiTietPhieuNhap'){
            $maPhieu = $_POST['maPhieu'];
        }
        if($action == 'xacNhanNhapKho'){
            $maDon = $_POST['maDon'];
            $maChiTiet = [rand(1, 1000), rand(1, 1000)];
            $maPhieu = $_POST['maPhieu'];
            $maSanPham = $_POST['maSanPham'];
            $maKho = $_POST['maKho'];
            $soLuong = $_POST['soLuong'];
            $donVi = $_POST['donVi'];
            $ngaySanXuat = $_POST['ngaySanXuat'];
            $ngayHetHan = $_POST['ngayHetHan'];
        }
        switch ($action) { 
            case "layPhieuNhapKhoChoNhap":
                layPhieuNhapKhoChoNhapTheoKho($maKho);
                break;
            case "layPhieuNhapKhoDaNhap":
                layPhieuNhapKhoDaNhapTheoKho($maKho);
                break;
            case "layPhieuNhapKhoChoNhapQuanLy":
                layPhieuNhapKhoChoNhapTheoTaiKhoan($maTaiKhoan);
                break;
            case "layPhieuNhapKhoDaNhapQuanLy":
                layPhieuNhapKhoDaNhapTheoTaiKhoan($maTaiKhoan);
                break;
            case "layChiTietPhieuNhap":
                layChiTietPhieuNhap($maPhieu);
                break;
            case "xacNhanNhapKho":
                themChiTietNguyenLieu($maDon,$maChiTiet,$maSanPham,$maPhieu,$maKho,$soLuong,$donVi,20000,$ngaySanXuat,$ngayHetHan);  
                break;
        }

    }
    function layPhieuNhapKhoChoNhapTheoKho($maKho){
        $p = new ControlPhieuNhap(); 
        $res = $p->layPhieuNhapKhoChoNhapTheoKho($maKho);
        if (!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function layPhieuNhapKhoDaNhapTheoKho($maKho){
        $p = new ControlPhieuNhap(); 
        $res = $p->layPhieuNhapKhoDaNhapTheoKho($maKho);
        if (!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function layPhieuNhapKhoDaNhapTheoTaiKhoan($maTaiKhoan){
        $p = new ControlPhieuNhap(); 
        $res = $p->layPhieuNhapKhoDaNhapTheoTaiKhoan($maTaiKhoan);
        if (!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    
    }
    function layPhieuNhapKhoChoNhapTheoTaiKhoan($maTaiKhoan){
        $p = new ControlPhieuNhap(); 
        $res = $p->layPhieuNhapKhoChoNhapTheoTaiKhoan($maTaiKhoan);
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
    function  themChiTietNguyenLieu($maDon,$maChiTiet, $maSanPham, $maPhieu, $maKho, $soLuongTon,$donVi, $gia, $ngaySanXuat, $ngayHetHan){
        $p = new ControlPhieuNhap();
        for ($i=0; $i < count($maSanPham) ; $i++) { 
            $res = $p->themChiTietNguyenLieu($maChiTiet[$i], $maSanPham[$i], $maPhieu, $maKho, $soLuongTon[$i],$donVi[$i], $gia, $ngaySanXuat[$i], $ngayHetHan[$i]);
        }
        if(!$res){
            echo json_encode($res);
            return;
        }
        $res = $p-> xacNhanNhapKho($maPhieu);
        if($res){
            $res2 = layTrangThaiPhieuNhap($maDon);
            if($res2){
                $p2 = new ControlDonYeuCau();
                $p2->capNhatTrangThaiDonYeuCau($maDon, "Đã nhập kho");
            }
           
        }
         echo json_encode($res);
    }
    function layTrangThaiPhieuNhap($maDon){
        $p = new ControlPhieuNhap(); 
        $res = $p->layTrangThaiPhieuNhap($maDon);
        if (!$res){
            return false;
        }else{
            if(count($res) == 1  and $res[0]['TrangThai'] == 'Đã nhập kho') 
                return true;
            else return false;
        }
    }

?>