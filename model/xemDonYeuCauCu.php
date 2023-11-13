<?php

    include_once("../model/ketnoi.php");
     class DonYeuCauCu{
        private $conn;

        function __construct(){
            $p = new KetNoi();
            $p->ketNoi( $this->conn );
        }

        function layDonYeuCauCuTheoTaiKhoan($maTaiKhoan){
             $stmt = $this->conn->prepare("CALL layDonYeuCauTheoTaiKhoan(?)");
            $stmt->execute([$maTaiKhoan]);
            $menuItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $menuItems ?: false;
        }
      
    }
?>
