<?php

    class KetNoi{
        function ketNoi(&$conn){
            if(isset($_SESSION["tenVaiTro"])){
                $user = $_SESSION["tenVaiTro"];
            }else{
                $user = "nguoidung";
            }
            $conn = new PDO('mysql:host=localhost;dbname=new_unity', $user, '');
        }
        function dongKetNoi($conn){
            $conn = null;

            return true;
        }
    }


?>