<?php
session_start();

    include_once ("../controller/cTaiKhoan.php");
    if (isset($_POST["action"])) {
        $action = $_POST["action"];
        if ($action == "themTaiKhoan") {
            $maTaiKhoan = rand(0,1000);
            $loai = $_POST['loai'];
            $tenDangNhap = $_POST['tenDangNhap'];
            $pass = $_POST['pass'];
            $viTriKho = $_POST['viTriKho'];
        }
        if ($action == 'doiMatKhau') {
            $maTaiKhoan = $_SESSION['maTaiKhoan'];
            $pass = $_POST['matKhau'];
        }
        switch ($action) { 
            case "themTaiKhoan":
                themTaiKhoan($maTaiKhoan,$loai, $tenDangNhap, $pass,$viTriKho);
                break;
            case 'doiMatKhau':
                doiMatKhau($maTaiKhoan, $pass);
                break;
        }

    }
    function themTaiKhoan($maTaiKhoan,$loai, $tenDangNhap, $pass,$viTriKho){
        $p = new ControlTaiKhoan(); 
        $res = $p->themTaiKhoan($maTaiKhoan,$loai, $tenDangNhap, $pass,$viTriKho);
        if (!$res){
            echo json_encode(false);
        }else{
           echo json_encode(true);
        }
    
    }
    function doiMatKhau($maTaiKhoan, $pass){
        $p = new ControlTaiKhoan(); 
        $res = $p->doiMatKhau($maTaiKhoan, $pass);
        if (!$res){
            echo json_encode(false);
        }else{
           echo json_encode(true);
        }
    
    }
  

?>