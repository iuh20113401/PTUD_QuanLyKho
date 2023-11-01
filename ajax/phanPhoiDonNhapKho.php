<?php
    include_once("../controller/cDonYeuCau.php");
    include_once("../controller/cPhieuNhap.php");
    include_once("../controller/cKho.php");
    if(isset($_POST["action"])){
        $action = $_POST["action"];
        if($action === "layDon"){
            $maDon = $_POST["maDon"];
        }
        if($action === "layKho"){
            $loai = $_POST["loai"];
            $soLuong = $_POST['soLuong'];
        }
        if($action === 'capNhatDonYeuCau'){
            $maDon = $_POST['maDon'];
            $maSanPham = $_POST['maSanPham'];
            $ngaySanXuat = $_POST['ngaySanXuat'];
            $ngayHetHan = $_POST['ngayHetHan'];
            $viTriKho = $_POST['viTriKho'];
            $trangThai = $_POST['trangThai'];}
        switch($action){
            case "layTatCaDon":
                layDonYeuCauDaDuyet();
                break;
            case "layDon":
                layChiTietDonYeuCau($maDon);
                break;
            case "layKho":
                layKhoPhuHop($loai,$soLuong);
                break;
            case 'capNhatDonYeuCau':
                capNhatDonYeuCau($maDon, $maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho, $trangThai, 2);
                break;
        }
    }
    function layDonYeuCauDaDuyet(){
        $p = new ControllDonYeuCau(); 
        $res = $p->layDonYeuCauDaDuyet();
        if(!$res){
            echo json_encode(false);
        }else{
            $restbl = [];
            while($row = mysqli_fetch_assoc($res)){
            
            if($row['soluongnguyenlieu'] == null )
            { 
                echo json_encode($restbl);
                return;
            }
            array_push($restbl,$row);
            }
            echo json_encode($restbl);
        }
    }
    function layChiTietDonYeuCau($maDon){
        $p = new ControllDonYeuCau(); 
        $res = $p->layChiTietDonYeuCau($maDon);
        if(!$res){
            echo json_encode(false);
        }else{
            $restbl = [];
            while($row = mysqli_fetch_assoc($res)){
            array_push($restbl,$row);
            }
            echo json_encode($restbl);
        }
    }
    function layKhoPhuHop($loai,$soLuong){
        
        $p = new ControllKho();
        $res = $p->layKhoPhuHop($loai,$soLuong);
        if(!$res){
            echo json_encode(false);
        }else{
            $restbl = [];
            while($row = mysqli_fetch_assoc($res)){
            array_push($restbl,$row);
            }
            echo json_encode($restbl);
        }
    }
    function capNhatDonYeuCau($maDon, $maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho, $trangThai, $maTaiKhoan){

         for ($i=0; $i < count($maSanPham); $i++) { 
            $res = capNhatChiTietDonYeuCau($maDon,$maSanPham[$i], $ngaySanXuat[$i], $ngayHetHan[$i], $viTriKho[$i]);
         }
         if(!$res) echo json_encode(false); 
         for ($i=0; $i < count(array_unique($viTriKho)); $i++) { 
           $res = lapPhieuNhap($maDon ,$viTriKho[$i], $maTaiKhoan,date("Y-m-d"), null, "Chờ nhập");
         }
            if(!$res) echo json_encode(false); 

         $res = capNhapTrangThaiDonYeuCau($maDon, $trangThai);
         echo json_encode($res);
    }
    function capNhatChiTietDonYeuCau($maDon,$maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho){
        $p = new ControllDonYeuCau(); 
        $res = $p->capNhatChiTietDonYeuCau($maDon,$maSanPham, $ngaySanXuat, $ngayHetHan, $viTriKho);
        if (!$res){
           echo json_encode(false);
        }else{
           echo json_encode(true);
        }
    }
    function capNhapTrangThaiDonYeuCau($maDon, $trangThai){
        $p = new ControllDonYeuCau(); 
        $res = $p->capNhapTrangThaiDonYeuCau($maDon, $trangThai);
        if (!$res){
           echo json_encode(false);
        }else{
           echo json_encode(true);
        }
    }
    function lapPhieuNhap($maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayNhap,	$trangThai){
        $p = new ControlPhieuNhap(); 
        $res = $p->lapPhieuNhap($maDon ,$maKho, $maTaiKhoan, $ngayLap, $ngayNhap,	$trangThai);
        if (!$res){
          return false;
        }else{
           return true;
        }
    }


?>