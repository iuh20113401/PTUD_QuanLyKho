<?php
    session_start();
    include_once("../controller/cBienBan.php");
    include_once ("../controller/cDonYeuCau.php");
    if(isset($_POST["action"])){
        $action = $_POST["action"];

        if($action === "lapBienBan"){
            $maBienBan = $_POST['maBienBan'];
            $maDon = $_POST['maDon'];
            $maTaiKhoan = $_POST['maTaiKhoan'];
            $ngayLap = $_POST['ngayLap'];
            $lyDo = $_POST['lyDo'];
         }
        if($action === 'layChiTietBienBan'){
            $maBienBan = $_POST['maBienBan'];
        }
        switch($action){
            case "lapBienBan":
                lapBienBan($maBienBan, $maDon, $maTaiKhoan, $ngayLap, $lyDo);
                break;
            case 'layBienBan':
                layBienBan();
                break;
            case 'layChiTietBienBan':
                layChiTietBienBan($maBienBan);
                break;
        }
    }

    function lapBienBan($maBienBan, $maDon, $maTaiKhoan, $ngayLap, $lyDo){
        $p = new ConTrolBienBan(); 
        $res = $p->lapBienBan($maBienBan, $maDon, $maTaiKhoan, $ngayLap, $lyDo);
        if(!$res){
            echo json_encode($res);
        }
         $p2 = new ControlDonYeuCau();
        echo json_encode($res);
    }
    function layBienBan(){
        $p = new ConTrolBienBan();
        $res = $p->layBienBan();
        echo json_encode($res);
    }
    function layChiTietBienBan($maBienBan){
        $p = new ConTrolBienBan();
        $res = $p->layChiTietBienBan($maBienBan);
        echo json_encode($res);
    }
    ?>