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
<<<<<<< HEAD
<<<<<<< HEAD
        if ($action == 'doiMatKhau') {
            $maTaiKhoan = $_SESSION['maTaiKhoan'];
            $pass = $_POST['matKhau'];
        }
=======
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
        switch ($action) { 
            case "themTaiKhoan":
                themTaiKhoan($maTaiKhoan,$loai, $tenDangNhap, $pass);
                break;
<<<<<<< HEAD
<<<<<<< HEAD
            case 'doiMatKhau':
                doiMatKhau($maTaiKhoan, $pass);
                break;
=======
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
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
<<<<<<< HEAD
<<<<<<< HEAD
    function doiMatKhau($maTaiKhoan, $pass){
        $p = new ControlTaiKhoan(); 
        $res = $p->doiMatKhau($maTaiKhoan, $pass);
        if (!$res){
            echo json_encode(false);
        }else{
           echo json_encode(true);
        }
    
    }
=======
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
  

?>