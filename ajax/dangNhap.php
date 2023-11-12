<?php
session_start();
    include_once ("../controller/cDangNhap.php");
    if (isset($_POST["action"])) {
        $action = $_POST["action"];
        if ($action == "dangNhap") {
           $tk = $_POST['tk'];
           $mk = $_POST['mk'];
        }
        switch ($action) { 
            case "dangNhap":
                dangNhap($tk, $mk);
                break;
        }

    }
    function dangNhap($tk, $mk) {
        $p = new ControlDangNhap(); 
        $res = $p->dangNhap($tk, $mk);
        if (!$res){
            echo json_encode(false);
        }else{
            
            $_SESSION["maVaiTro"] = $res[0]['MaVaiTro'];
            $_SESSION["tenVaiTro"] = $res[0]['TenVaiTro'];
            $_SESSION["maTaiKhoan"] = $res[0]['MaTaiKhoan'];
            $_SESSION["tenTaiKhoan"] = $res[0]['TenDangNhap'];
            echo json_encode($res);
        }
    
    }
    

?>