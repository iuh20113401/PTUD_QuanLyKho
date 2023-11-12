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
        }
        switch ($action) { 
            case "themTaiKhoan":
                themTaiKhoan($maTaiKhoan,$loai, $tenDangNhap, $pass);
                break;
        }

    }
    function themTaiKhoan($maTaiKhoan,$loai, $tenDangNhap, $pass){
        $p = new ControlTaiKhoan(); 
        $res = $p->themTaiKhoan($maTaiKhoan,$loai, $tenDangNhap, $pass);
        if (!$res){
            echo json_encode(false);
        }else{
           echo json_encode(true);
        }
    
    }
  

?>