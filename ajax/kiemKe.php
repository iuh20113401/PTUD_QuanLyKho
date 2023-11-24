<?php
session_start();

    include_once("../controller/cKiemKe.php");

    if(isset($_POST["action"])){
        $action = $_POST["action"];
        $trangThai =null;
        if($action == "lapDonKiemKe"){
            $maDon = $_POST['maDon'];
            $loai = $_POST['loai'];
            $maTaiKhoan = $_SESSION['maTaiKhoan'];
            $kho = $_POST['kho'];
            $ngayLap = $_POST['ngayLap'];
            $tinhTrang = $_POST['tinhTrang'];
            $moTa =  $_POST['moTa'];
        }
        if($action == 'layDonKiemKe'){
            $maDon = $_POST['maDon'];
            $trangThai = null;
            if(isset($_POST['trangThai'])){
                $trangThai = $_POST['trangThai'];
            }
        }
        if($action == 'capNhatTrangThai'){
            $maDon = $_POST['maDon'];
            $trangThai = $_POST['trangThai'];
        }
        if($action == 'layDonYeuCauTheoTaiKhoan'){
            $trangThai = null;
            if(isset($_POST['trangThai'])){
                $trangThai = $_POST['trangThai'];
            }
            $maTaiKhoan = $_SESSION['maTaiKhoan'];
        }
        if($action == "themChiTietKiemKe"){
            $maKiemKe= $_POST['maKiemKe'];
            $maChiTietSanPham= explode(',',$_POST['maChiTietSanPham']);
            $tinhTrang=  explode(',',$_POST['tinhTrang']);
            $soLuong=  explode(',',$_POST['soLuong']);
            $moTa=  explode(',',$_POST['moTa']);
        }
        if($action == 'layChiTietDonKiemKeLoi'){
            $maDon = $_POST['maKiemKe'];
        }
        switch($action){
            case "lapDonKiemKe":
                 lapDonKiemKe($maDon,$maTaiKhoan,$ngayLap,$tinhTrang,$kho,$loai,$moTa);
                break;
           case 'layDonKiemKe':
                layDonKiemKe($trangThai);
                break;
            case 'capNhatTrangThai':
                capNhatTrangThai($maDon, $trangThai);
                break;
            case 'layDonYeuCauTheoTaiKhoan':
                layDonKiemKeTheoTaiKhoan($trangThai, $maTaiKhoan);
                break;
            case 'layChiTietDonKiemKeLoi':
                layChiTietDonKiemKeLoi($maDon);
                break;
            case 'themChiTietKiemKe':
                themChiTietDonKiemKe($maKiemKe,$maChiTietSanPham,$tinhTrang,$soLuong,$moTa);
                break;
        }
    }
    function lapDonKiemKe( $maKiemKe,$maTaiKhoan,$ngayLap,$tinhTrang,$kho,$loai,$moTa){
        $p = new ControlKiemKe(); 
        $res = $p->lapDonKiemKe( $maKiemKe,$maTaiKhoan,$ngayLap,$tinhTrang,$kho,$loai,$moTa);
        echo json_encode($res);
    }
    function layDonKiemKe( $trangThai){
        $p = new ControlKiemKe(); 
        $res = $p-> layDonKiemKe($trangThai);
        echo json_encode($res);
    }
    function  capNhatTrangThai($maDon, $trangThai){
        $p = new ControlKiemKe(); 
        $res =  $p->capNhatTrangThai($maDon, $trangThai);
        echo json_encode($res);
    }
    function layChiTietDonKiemKeLoi($maDon){
        $p = new ControlKiemKe(); 
        $res =  $p->layChiTietDonKiemKeLoi($maDon);
        echo json_encode($res);
    }
    function layDonKiemKeTheoTaiKhoan($trangThai,$maTaiKhoan){
        $p = new ControlKiemKe(); 
        $res = $p-> layDonKiemKe($trangThai, $maTaiKhoan);
        echo json_encode($res);
    }
    function themChiTietDonKiemKe($maKiemKe,$maChiTietSanPham,$tinhTrang,$soLuong,$moTa){
        $p = new ControlKiemKe();
        for ($i=0; $i < count($maChiTietSanPham); $i++) { 
            $res = $p-> themChiTietDonKiemKe($maKiemKe,$maChiTietSanPham[$i],$tinhTrang[$i],$soLuong[$i],$moTa[$i]);
            if (!$res) {
                echo json_encode(false);
                return;
            }
        }
        echo json_encode($res);
    }
    ?>