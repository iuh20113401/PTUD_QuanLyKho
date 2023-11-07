<?php
    class KetNoi{
        function ketNoi(&$conn){
            $conn = mysqli_connect('localhost','root','');
            mysqli_set_charset($conn,"utf8");
            
            if(!$conn){
                echo "hello ket noi that bai";
                return false;
            }else{
                return mysqli_select_db($conn,"new_unity");
            }
        }
        function dongKetNoi($conn){
            mysqli_close($conn);
        }
    }


?>