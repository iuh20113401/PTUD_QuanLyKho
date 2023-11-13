<?php
session_start();

    include_once("../controller/cBaoCao.php");

    if(isset($_POST["action"])){
        $action = $_POST["action"];
        
        switch($action){
            case "nguyenLieu":
                nguyenLieu();
                break;
            case "thanhPham":
                thanhPham();
                break;
            
        }
    }
    function nguyenLieu(){
        $p = new ConTrolBaoCao(); 
        $res = $p->nguyenLieu();
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
        
    }
    function thanhPham(){
        $p = new ConTrolBaoCao(); 
        $res = $p->thanhPham();
        if(!$res){
            echo json_encode(false);
        }else{
            echo json_encode($res);
        }
        
    }
    
    ?>