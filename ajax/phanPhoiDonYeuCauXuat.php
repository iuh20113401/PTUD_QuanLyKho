<?php
session_start();

    include_once("../controller/cDonYeuCauXuat.php");
    include_once("../controller/cPhieuXuat.php");
    include_once("../controller/cDonYeuCau.php");
    if(isset($_POST["action"])){
        $action = $_POST["action"];
        if($action === "layDon"){
            $maDon = $_POST["maDon"];
        }
        if($action === "layDanhSachSanPham"){
            $maSanPham = $_POST['maSanPham'];
        }
        if($action === 'lapPhieuXuatKho'){
            $maDon = $_POST['maDon'];
<<<<<<< HEAD
<<<<<<< HEAD
            $maChiTietSanPham = explode(",",$_POST['MaChiTietSanPham']);
            $soLuong = explode(",",$_POST['SoLuong']);
            $maKho = explode(",",$_POST['Kho']);
=======
            $maChiTietSanPham = $_POST['MaChiTietSanPham'];
            $soLuong = $_POST['SoLuong'];
            $maKho = $_POST['Kho'];
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
            $maChiTietSanPham = $_POST['MaChiTietSanPham'];
            $soLuong = $_POST['SoLuong'];
            $maKho = $_POST['Kho'];
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
            $maTaiKhoan = 2;
            $ngayLap = date('Y-m-d');
            $trangThai = 'Chờ xuất';
        }
        switch($action){
            case "layTatCaDon":
                layDonYeuCauXuatDaDuyet();
                break;
            case "layDon":
                layChiTietDonYeuCau($maDon);
                break;
            case "layDanhSachSanPham":
                layDanhSachSanPham($maSanPham);
                break;
            case 'lapPhieuXuatKho':
                lapPhieuXuatKho($maDon, $maKho, $maTaiKhoan, $ngayLap,$trangThai,$maChiTietSanPham, $soLuong);    
                break;
        }
    }
    function layDonYeuCauXuatDaDuyet(){
        $p = new ControlDonYeuCauXuat(); 
        $res = $p->layDonYeuCauXuatDaDuyet();
        if(!$res){
            echo json_encode(false);
        }else{

            echo json_encode($res);
        }
    }
    function layChiTietDonYeuCau($maDon){
        $p = new ControlDonYeuCauXuat(); 
        $res = $p->layChiTietDonYeuCau($maDon);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function layDanhSachSanPham($maSanPham){
        $p = new ControlDonYeuCauXuat(); 
        $res = $p->layDanhSachSanPham($maSanPham);
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function lapPhieuXuatKho($maDon, $maKho, $maTaiKhoan, $ngayLap,$trangThai,$maChiTietSanPham, $soLuong){
        $maPhieu = [];
<<<<<<< HEAD
<<<<<<< HEAD
        $uniqueArray = array_unique($maKho);
         $uniqueArray = array_values($uniqueArray);
        for($i = 0; $i < count($uniqueArray); $i++){
            array_push($maPhieu,rand(0,1000));
            $res = lapPhieuXuat($maPhieu[$i],$maDon ,$uniqueArray[$i], $maTaiKhoan, $ngayLap, null,$trangThai);
=======
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
        echo json_encode($maKho);
        for($i = 0; $i < count(array_unique($maKho)); $i++){
            array_push($maPhieu,rand(0,1000));
            $res = lapPhieuXuat($maPhieu[$i],$maDon ,$maKho[$i], $maTaiKhoan, $ngayLap, null,$trangThai);
<<<<<<< HEAD
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
        }
        if(!$res){
            echo json_encode(false);
            return;
        }
        $i =0;
        $n = 0;
        while($i < count($maChiTietSanPham)){
             $res = themChiTietPhieuXuat($maPhieu[$n], $maChiTietSanPham[$i], $soLuong[$i]);
             $i++;
             if($i < count ($maChiTietSanPham)){
               $maKho[$i] != $maKho[$i-1] ? $n++ : $n;
             }
        } 
           
        if(!$res){
            echo json_encode(false);
            return;
        }
        $res = capNhatTrangThaiDonYeuCau($maDon, "Đã phân phối");
        echo json_encode($res);
    }
    function lapPhieuXuat($maPhieu,$maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayXuat,$trangThai){
             $p = new ControlPhieuXuat();
             $res = $p->lapPhieuXuat($maPhieu,$maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayXuat,$trangThai);
             if (!$res) {
                 return false;
             } else {
                 return true;
             }
         }
    function themChiTietPhieuXuat($maPhieu, $maChiTietSanPham, $soLuong){
<<<<<<< HEAD
<<<<<<< HEAD
            $p = new ControlPhieuXuat();
            $res = $p->themChiTietPhieuXuat($maPhieu, $maChiTietSanPham, $soLuong);
            return $res;
=======
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
                $p = new ControlPhieuXuat();
             $res = $p->themChiTietPhieuXuat($maPhieu, $maChiTietSanPham, $soLuong);
             if (!$res) {
                 return false;
             } else {
                 return true;
             }
<<<<<<< HEAD
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
        }
    function capNhatTrangThaiDonYeuCau($maDon, $trangThai){
        $p = new ControlDonYeuCau(); 
        $res = $p->capNhatTrangThaiDonYeuCau($maDon, $trangThai);
<<<<<<< HEAD
<<<<<<< HEAD
        return $res;
=======
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
        if (!$res){
           echo json_encode(false);
        }else{
           echo json_encode(true);
        }
<<<<<<< HEAD
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
    }

?>