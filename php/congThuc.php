<?php
    include_once("../php/condb.php");
     class congThuc{
        function themCT($maCT ,$ten, $donVi, $soLuong1, $DSNL,$moTa1){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                if( $ten !=""&& $donVi !=""&& $soLuong1!=""&& $moTa1 !="" &&$DSNL!="") {
                        // $query = "UPDATE kho SET Ten=$ten, DonVi= $donVi, SoLuong= $soLuong1,DSNL= $DSNL,MoTa = $moTa1";
                        $query = "insert kho values($maCT ,$ten, $donVi, $soLuong1, $DSNL,$moTa1)";
                        $res = mysqli_query($conn,$query);
                        $p->dongKetNoi($conn);
                        if(!$res){
                            return false;
                        }else{
                            return $res;
                        }
                    }else{
                        echo"Yêu cầu nhập đầy đủ thông tin";
                    }
                
            }
        }

        function suaCT($maCT ,$ten, $donVi, $soLuong1, $DSNL,$moTa1){
                $p= new KetNoi();
                $db = $p->ketNoi($conn);
                if(!$db){
                     return false;
                }else{
                    if( $ten !=""&& $donVi !=""&& $soLuong1!=""&& $moTa1 !="" &&$DSNL!="") {
                        $query = "insert kho values(1,$maCT ,$ten, $donVi, $soLuong1, $DSNL,$moTa1)";
                        $res = mysqli_query($conn,$query);
                        $p->dongKetNoi($conn);
                        if(!$res){
                            return false;
                        }else{
                            return $res;
                        }
                    }else{
                        echo"Yêu cầu nhập đầy đủ thông tin";
                    }
                    
                }
            }
        
            function xoaCT($maCT){
                $p= new KetNoi();
                $db = $p->ketNoi($conn);
                if(!$db){
                     return false;
                }else{
                    $query = "DELETE from kho where MaCT=$maCT";
                    $res = mysqli_query($conn,$query);
                    $p->dongKetNoi($conn);
                    if(!$res){
                        return false;
                    }else{
                        return $res;
                    }
                }
            }

        function capNhapDSCT($maCT ,$ten, $donVi, $soLuong1, $DSNL,$moTa1){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "UPDATE kho SET Ten=$ten, DonVi= $donVi, SoLuong= $soLuong1,DSNL= $DSNL,MoTa = $moTa1";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }

        function luuCSDLCT()  {
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                
                $ten = mysqli_real_escape_string($conn, $_POST['name']);
                $donVi = mysqli_real_escape_string($conn, $_POST['donvi']);
                $soLuong1 = mysqli_real_escape_string($conn, $_POST['soluong1']);
                $DSNL = mysqli_real_escape_string($conn, $_POST['DSNL']);
                $moTa1 = mysqli_real_escape_string($conn, $_POST['mota']);
                $sql = "INSERT INTO warehouses (name, donvi, soluong1, DSNL,mota) VALUES ('$ten', '$donVi', '$soLuong1', '$DSNL','$moTa1')";

                if (mysqli_query($conn, $sql)) {
                echo "Thêm công thức thành công.";
                } else {
                echo "Lỗi: " . mysqli_error($conn);
                }

        }
    }
}
?>