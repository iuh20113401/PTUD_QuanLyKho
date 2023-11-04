<?php
    include_once ("../controller/cPhieuXuat.php");
    include_once ("../controller/cDonYeuCau.php");
    if (isset($_POST["action"])) {
        $action = $_POST["action"];
        if ($action == "layPhieuXuatKho") {
            $maKho = $_POST['maKho'];
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
            case "layPhieuXuatKho":
                layPhieuXuatKhoTheoKho($maKho);
                break;
            case "layChiTietPhieuXuat":
                layChiTietPhieuXuat($maPhieu);
                break;
            case "xacNhanXuatKho":
                xacNhanXuatKho($maDon,$maPhieu, $ngayXuat);
                break;
        }

    }
    function layPhieuXuatKhoTheoKho($maKho){
        $p = new ControlPhieuXuat(); 
        $res = $p->layPhieuXuatKhoTheoKho($maKho);
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
    function layChiTietPhieuXuat($maPhieu){
        $p = new ControlPhieuXuat(); 
        $res = $p->layChiTietPhieuXuat($maPhieu);
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
    function xacNhanXuatKho($maDon,$maPhieu, $ngayXuat){
        $p = new ControlPhieuXuat(); 
        $res = $p->xacNhanXuatKho($maPhieu, $ngayXuat);
        if (!$res){
            echo json_encode(false);
        }else{
            $res2 = $p->layTrangThaiPhieuXuat($maPhieu);
            if($res2){
                $p2 = new ControllDonYeuCau();
                $p2->capNhapTrangThaiDonYeuCau($maDon, "Đã xuất kho");
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