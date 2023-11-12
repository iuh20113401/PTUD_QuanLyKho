<?php
session_start();

    include_once ("../controller/cPhieuXuat.php");
    include_once ("../controller/cDonYeuCau.php");
    if (isset($_POST["action"])) {
        $action = $_POST["action"];
        if ($action == "layPhieuXuatKhoChoXuat") {
            $maKho = $_POST['maKho'];
        }
        if ($action == "layPhieuXuatKhoDaXuat") {
            $maKho = $_POST['maKho'];
        }
        if ($action == "layPhieuXuatKhoChoXuatQuanLy") {
            $maTaiKhoan = $_SESSION['maTaiKhoan'];
        }
        if ($action == "layPhieuXuatKhoDaXuatQuanLy") {
            $maTaiKhoan = $_SESSION['maTaiKhoan'];
        }
        if($action == 'layChiTietPhieuXuat'){
            $maPhieu = $_POST['maPhieu'];
        }
        if($action == 'xacNhanXuatKho'){
            $maDon = $_POST['maDon'];
            $maPhieu = $_POST['maPhieu'];
            $ngayXuat = date('Y-m-d');
        }
        switch ($action) { 
            case "layPhieuXuatKhoChoXuat":
                layPhieuXuatKhoChoXuatTheoKho($maKho);
                break;
            case "layPhieuXuatKhoDaXuat":
                layPhieuXuatKhoDaXuatTheoKho($maKho);
                break;
            case "layPhieuXuatKhoChoXuatQuanLy":
                layPhieuXuatKhoChoXuatTheoTaiKhoan($maTaiKhoan);
                break;
            case "layPhieuXuatKhoDaXuatQuanLy":
                layPhieuXuatKhoDaXuatTheoTaiKhoan($maTaiKhoan);
                break;
            case "layChiTietPhieuXuat":
                layChiTietPhieuXuat($maPhieu);
                break;
            case "xacNhanXuatKho":
                xacNhanXuatKho($maDon,$maPhieu, $ngayXuat);
                break;
        }

    }
    function layPhieuXuatKhoChoXuatTheoKho($maKho){
        $p = new ControlPhieuXuat(); 
        $res = $p->layPhieuXuatKhoChoXuatTheoKho($maKho);
        echo json_encode($res);
    }
    function layPhieuXuatKhoDaXuatTheoKho($maKho){
        $p = new ControlPhieuXuat(); 
        $res = $p->layPhieuXuatKhoDaXuatTheoKho($maKho);
        echo json_encode($res);
    }
    function layPhieuXuatKhoDaXuatTheoTaiKhoan($maTaiKhoan){
        $p = new ControlPhieuXuat(); 
        $res = $p->layPhieuXuatKhoDaXuatTheoKho($maTaiKhoan);
        echo json_encode($res);
    }
    function layPhieuXuatKhoChoXuatTheoTaiKhoan($maTaiKhoan){
        $p = new ControlPhieuXuat(); 
        $res = $p->layPhieuXuatKhoChoXuatTheoTaiKhoan($maTaiKhoan);
        echo json_encode($res);
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
    function xacNhanXuatKho($maDon,$maPhieu, $ngayXuat){
        $p = new ControlPhieuXuat(); 
        $res = $p->xacNhanXuatKho($maPhieu, $ngayXuat);
        if (!$res){
            echo json_encode(false);
        }else{
            $res2 = $p->layTrangThaiPhieuXuat($maPhieu);
            if($res2){
                $p2 = new ControlDonYeuCau();
                $p2->capNhatTrangThaiDonYeuCau($maDon, "Đã xuất kho");
            }
            echo json_encode(true);
        }
    }
    function layTrangThaiPhieuXuat($maDon){
        $p = new ControlPhieuXuat(); 
        $res = $p->layTrangThaiPhieuXuat($maDon);
        if (!$res){
            return false;
        }else{
            if(count($res) == 1  and $res[0]['TrangThai'] == 'Đã xuất kho') 
                return true;
            else return false;
        }
    }

?>