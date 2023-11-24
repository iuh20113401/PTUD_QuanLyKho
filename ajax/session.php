<?php
    session_start();
    if (isset($_POST["action"])) {
        $action = $_POST["action"];

        switch ($action) { 
            case "getSession":
                getSession();
                break;
            case "layThongTinTaiKhoan":
                layThongTinTaiKhoan();
                break;
            case    "dangXuat":
                dangXuat();
                break;
        }

    }
    function getSession(){
        if(isset($_SESSION['maVaiTro'])){
            echo json_encode($_SESSION['maVaiTro']);
        }else{
            echo json_encode(false);
        }
    }
    function layThongTinTaiKhoan(){
        if(isset($_SESSION['viTriKho'])){
            echo json_encode([$_SESSION["maVaiTro"],$_SESSION["tenVaiTro"],$_SESSION["maTaiKhoan"],$_SESSION["tenTaiKhoan"], $_SESSION['viTriKho']]);
            return;
        }
        echo json_encode([$_SESSION["maVaiTro"],$_SESSION["tenVaiTro"],$_SESSION["maTaiKhoan"],$_SESSION["tenTaiKhoan"]]);
    }
    function dangXuat(){
        session_unset();
        echo json_encode(true);
    }
?>