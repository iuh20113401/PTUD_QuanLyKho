<?php
session_start();

    include_once("../controller/cDonYeuCau.php");

    if(isset($_POST["action"])){
        $action = $_POST["action"];
        $trangThai = null;
        if($action == "lapDonYeuCau" || $action == "lapDonYeuCauNhapTP"){
            $maDon = $_POST['maDon'];
            $maLoai = $_POST['maLoai'];
            $maTaiKhoan = $_SESSION['maTaiKhoan'];
            $maSanPham = explode(',',$_POST['maSanPham']);
            $soLuong = explode(',',$_POST['soLuong']);
            $donVi =  explode(',',$_POST['donVi']);
            if(isset($_POST['ngaySanXuat'])){
                $ngaySanXuat= explode(',',$_POST['ngaySanXuat']);
                $ngayHetHan= explode(',',$_POST['ngayHetHan']);
            }
            $trangThai = $_POST['trangThai'];
            $ngayLap = $_POST['ngayLap'];
        }

        switch($action){
            case "lapDonYeuCau":
                xuLyThemDonYeuCau($maDon, $maLoai, $maTaiKhoan, $ngayLap, $trangThai, $maSanPham,$soLuong,$donVi);
                break;
           case 'lapDonYeuCauNhapTP':
                xuLyThemDonYeuCauNhapTP($maDon, $maLoai, $maTaiKhoan, $ngayLap, $trangThai,$ngaySanXuat, $ngayHetHan, $maSanPham,$soLuong,$donVi);
                break;
        }
    }
    function lapDonYeuCau($maDon, $maLoai, $maTaiKhoan, $ngayLap, $soLuong, $trangThai){
        $p = new ControlDonYeuCau(); 
        $res = $p->lapDonYeuCau($maDon, $maLoai, $maTaiKhoan, $ngayLap, $soLuong, $trangThai);
        if(!$res){
            return false;
        }else{
            return true ;
        }
    }
    function themChiTietDonYeuCau($maDon, $maSanPham, $soLuong, $donVi, $ngaySanXuat, $ngayHetHan, $viTriKho){
        $p = new ControlDonYeuCau(); 
        $res = $p-> themChiTietDonYeuCau($maDon, $maSanPham, $soLuong, $donVi, $ngaySanXuat, $ngayHetHan, $viTriKho);
        if(!$res){
            return false;
        }else{
            return true;
        }
    }
    function xuLyThemDonYeuCau($maDon, $maLoai, $maTaiKhoan, $ngayLap, $trangThai, $maSanPham,$soLuong,$donVi){
        $res = lapDonYeuCau($maDon, $maLoai, $maTaiKhoan, $ngayLap, count($maSanPham), $trangThai);
        if( !$res){
            echo json_encode(false);
            return;
        }
        for ($i=0; $i < count($maSanPham); $i++) { 
            $res2 = themChiTietDonYeuCau($maDon, $maSanPham[$i], $soLuong[$i], $donVi[$i], null, null, null);
            if(!$res2){
                echo json_encode(false);
                return;
            }
        }
        if($trangThai == 'Đã duyệt'){
            $p = new ControlDonYeuCau();
            $res = $p -> capNhatTrangThaiDonYeuCau($maDon,$trangThai, $maLoai);
        }
        echo json_encode(true);
    }
    function xuLyThemDonYeuCauNhapTP($maDon, $maLoai, $maTaiKhoan, $ngayLap, $trangThai,$ngaySanXuat, $ngayHetHan, $maSanPham,$soLuong,$donVi){
        $res = lapDonYeuCau($maDon, $maLoai, $maTaiKhoan, $ngayLap, count($maSanPham), $trangThai);
        if( !$res){
            echo json_encode($res);
            return;
        }
        for ($i=0; $i < count($maSanPham); $i++) { 
            $res2 = themChiTietDonYeuCau($maDon, $maSanPham[$i], $soLuong[$i], $donVi[$i], $ngaySanXuat[$i], $ngayHetHan[$i], null);
            if(!$res2){
                echo json_encode("false them chi tiet");
                return;
            }
        }
        echo json_encode(true);
    }
    ?>