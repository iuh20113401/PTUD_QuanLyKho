<?php
    include_once("../php/condb.php");
     class quanLyKho{
        function themTTK($maKho ,$tenKho, $viTri, $sucChua, $soLuong,$loai,$moTa){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                if($tenKho !=""&&  $viTri !=""&& $sucChua!=""&& $soLuong!=""&& $moTa !=""  ){
                        // $query = "UPDATE kho SET TenKho = $tenKho,ViTri= $viTri, Succhua = $sucChua,SoLuong = $soLuong,Loai= $loai,Mota= $moTa;";
                        $query = "insert kho values(1,$maKho ,$tenKho, $viTri, $sucChua, $soLuong,$loai,$moTa)";
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

        function suaTTK($maKho ,$tenKho, $viTri, $sucChua, $soLuong,$loai,$moTa){
                $p= new KetNoi();
                $db = $p->ketNoi($conn);
                if(!$db){
                     return false;
                }else{
                    if($tenKho !=""&&  $viTri !=""&& $sucChua!=""&& $soLuong!=""&& $moTa !=""){
                        $query = "UPDATE kho SET TenKho = $tenKho,ViTri= $viTri, Succhua = $sucChua,SoLuong = $soLuong,Loai= $loai,Mota= $moTa;";
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
        
            function xoaTTK($maKho){
                $p= new KetNoi();
                $db = $p->ketNoi($conn);
                if(!$db){
                     return false;
                }else{
                    $query = "DELETE from kho where makho=$maKho";
                    $res = mysqli_query($conn,$query);
                    $p->dongKetNoi($conn);
                    if(!$res){
                        return false;
                    }else{
                        return $res;
                    }
                }
            }

        function capNhapDSKho($maKho ,$tenKho, $viTri, $sucChua, $soLuong,$loai,$moTa){
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                $query = "UPDATE kho SET TenKho = $tenKho,ViTri= $viTri, Succhua = $sucChua,SoLuong = $soLuong,Loai= $loai,Mota= $moTa WHERE makho = $maKho";
                $res = mysqli_query($conn,$query);
                $p->dongKetNoi($conn);
                if(!$res){
                    return false;
                }else{
                    return $res;
                }
            }
        }
        function luuCSDLKho()  {
            $p= new KetNoi();
            $db = $p->ketNoi($conn);
            if(!$db){
                return false;
            }else{
                
                $tenKho = mysqli_real_escape_string($conn, $_POST['name']);
                $viTri = mysqli_real_escape_string($conn, $_POST['vitri']);
                $sucChua = mysqli_real_escape_string($conn, $_POST['succhua']);
                $soLuong = mysqli_real_escape_string($conn, $_POST['soluong']);
                $moTa = mysqli_real_escape_string($conn, $_POST['mota']);
                $sql = "INSERT INTO warehouses (name, donvi, soluong1, DSNL,mota) VALUES ('$tenKho', '$viTri', '$sucChua', '$soLuong','$moTa')";

                if (mysqli_query($conn, $sql)) {
                echo "Thêm kho thành công.";
                } else {
                echo "Lỗi: " . mysqli_error($conn);
                }

        }
    }
}
?>