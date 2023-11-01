<?php
    include_once ("../controller/cPhieuNhap.php");
    include_once ("../controller/cDonYeuCau.php");
    if (isset($_POST["action"])) {
        $action = $_POST["action"];
        if ($action == "layPhieuNhapKho") {
            $maKho = $_POST['maKho'];
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
            case "layPhieuNhapKho":
                layPhieuNhapKhoTheoKho($maKho);
                break;
            case "layChiTietPhieuNhap":
                layChiTietPhieuNhap($maPhieu);
                break;
            case "xacNhanNhapKho":
                themChiTietNguyenLieu($maDon,$maChiTiet,$maSanPham,$maKho,$maPhieu,$soLuong,$donVi,20000,$ngaySanXuat,$ngayHetHan);  
                break;
        }

    }
    function layPhieuNhapKhoTheoKho($maKho){
        $p = new ControlPhieuNhap(); 
        $res = $p->layPhieuNhapKhoTheoKho($maKho);
        if (!$res){
            echo json_encode(false);
        }else{
            $restbl = [];
            while($row = mysqli_fetch_assoc($res)){
                if($row['soluongnguyenlieu'] == null){
                    echo json_encode([]);
                    return;
                    break;
                }
            array_push($restbl,$row);
            }
            echo json_encode($restbl);
        }
    
    }
    function layChiTietPhieuNhap($maPhieu){
        $p = new ControlPhieuNhap(); 
        $res = $p->layChiTietPhieuNhap($maPhieu);
        if (!$res){
            echo json_encode(false);
        }else{
            $restbl = [];
            while($row = mysqli_fetch_assoc($res)){
            array_push($restbl,$row);
            }
            echo json_encode($restbl);
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
                $p2 = new ControllDonYeuCau();
                $p2->capNhapTrangThaiDonYeuCau($maDon, "Đã nhập kho");
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
            $restbl = [];
            while($row = mysqli_fetch_assoc($res)){
            array_push($restbl,$row);
            }
            if(count($restbl) == 1  and $restbl[0]['TrangThai'] == 'Đã nhập kho') 
            return true;
            else return false;
        }
    }

?>