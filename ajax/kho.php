<?php
session_start();

    include_once("../controller/cKho.php");
    if(isset($_POST["action"])){
        $action = $_POST["action"];
        if($action == "themKho" || $action == 'capNhatKho'){
            $maKho = $_POST['maKho'];
            $tenKho = $_POST['tenKho'];
            $viTri = $_POST['viTri'];
            $moTa = $_POST['moTa'];
            $sucChua = $_POST['sucChua'];
            $loai = $_POST['loai'];
        }
        if($action == 'xoaKho'){
             $maKho = $_POST['maKho'];
             $loai = $_POST['trangThai'];
        }
        switch($action){
            case "layTatCaKho":
                layTatCaKho();
                break;
            case "themKho":
                themKho($maKho, $tenKho, $viTri, $moTa, $sucChua, $loai);
                break;
            case 'capNhatKho':
                 capNhatKho($maKho, $tenKho, $viTri, $moTa, $sucChua, $loai);
                 break;
            case 'xoaKho':
                xoaKho($maKho, $loai);
                break;
        }
    }

    function layTatCaKho(){
        $p = new ControllKho(); 
        $res = $p->layTatCaKho();
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
    }
    function themKho($maKho, $tenKho, $viTri, $moTa, $sucChua, $loai){
        $p = new ControllKho();
        $res = $p->themKho($maKho, $tenKho, $viTri, $moTa, $sucChua, $loai);
        echo json_encode($res);
    }
    function capNhatKho($maKho, $tenKho, $viTri, $moTa, $sucChua, $loai){
        $p = new ControllKho();
        $res = $p->capNhatKho($maKho, $tenKho, $viTri, $moTa, $sucChua, $loai);
        echo json_encode($res);
    }
    function xoaKho($maKho, $loai){
        $p = new ControllKho();
        $res = $p->xoaKho($maKho, $loai);
        echo json_encode($res);
    }
    ?>