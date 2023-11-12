<?php
$conn = new mysqli("localhost", "root", "", "quanlykho");
mysqli_set_charset($conn, "utf8");
?>
<?php

$MaKho=$_POST["MaKho"];

$sql = "SELECT * FROM kho WHERE MaKho= " . $MaKho;
$result = $conn->query($sql);
if ($result == true && $result->num_rows > 0) {
    $row =$result->fetch_assoc() ;
    echo('Mã kho đã tồn tại');
}else{
    if (isset($_POST['ThemTTK'])) {
        $MaKho=$_POST['MaKho'];
        $TenKho=$_POST['TenKho'];
        $ViTri=$_POST['ViTri'];
        $MoTa=$_POST['MoTa'];
        $SucChua=$_POST['SucChua'];
        $SucChuaDaDung=$_POST['SucChuaDaDung'];
        $Loai=$_POST['Loai'];
        if(!is_numeric($MaKho)){
            echo "Mã phải là số";
        }else{
            if ($MaKho == ""&& $TenKho == ""&& $ViTri== ""&&$SucChua== ""&&$Loai == ""&&$MoTa=="") {
                echo "Vui lòng nhập vào đầy đủ thông tin! ";
             }else{
                 $sql="INSERT INTO `kho`(`MaKho`, `TenKho`, `ViTri`, `MoTa`, `SucChua`, `SucChuaDaDung`, `Loai`)  VALUES ('$MaKho', '$TenKho', '$ViTri', '$MoTa', '$SucChua','$SucChuaDaDung','$Loai')";
                 $result = $conn->query($sql);
                 header('location:quanLyKho.php');
             }
        }
        
    }
 }

mysqli_close($conn);

?> 

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thêm thông tin kho</title>
    <link rel="stylesheet" href="../css/form.css" />
</head>

<body>
    <div class="container">
        <div class="menu">
            <div class="image"></div>
            <div class="nav">
                <ul>
                    <li><a href="#">Trang chủ</a></li>
                    <li class="show">
                        <p>Quản lý thông tin kho<i class="fa-solid fa-angle-down"></i></p>
                    </li>
                    <li><a href="xemTrangThaiDon.php">Xem trạng thái đơn yêu cầu</a></li>
                    <li><a href="congThuc.php">Công thức</a></li>
                </ul>
            </div>
        </div>
        <div class="content">
            <a href="#"> <h3>Phân phối > Quản lý thông tin kho > Thêm</h3></a>
            <div class="content-table thongtin">
                <h3>THÊM THÔNG TIN KHO</h3>
                <form  action="" method="post">
                    <div class="form-kho ma">
                        <label for="MaKho">Mã kho:</label>
                        <input type="text" name="MaKho" id="MaKho"placeholder="Nhập tên mã">
                    </div>
                    <div class="form-kho ten">
                        <label for="TenKho">Tên kho:</label>
                        <input type="text" name="TenKho" id="TenKho"placeholder="Nhập tên kho">
                    </div>
                    <div class="form-kho dia">
                        <label for="ViTri">Địa chỉ:</label>
                        <input type="text" name="ViTri" id="ViTri" placeholder="Nhập địa chỉ">
                    </div>
		            <div class="form-kho mo">
                        <label for="MoTa">Mô tả:</label>
                        <input type="text" name="MoTa" id="Mota" placeholder="Nhập mô tả">
                    </div>
                    <div class="form-kho suc">
                        <label for="SucChua">Sức chứa:</label>
                        <input type="number" name="SucChua" id="SucChua" placeholder="Nhập sức chứa" min="1" max="99999">
                    </div>
                    <div class="form-kho so">
                        <label for="SucChuaDaDung">Số lượng:</label>
                        <input type="number" name="SucChuaDaDung" id="SucChuaDaDung" placeholder="Nhập số lượng" min="1" max="99999" >
                    </div>
                    <div class="form-kho loai">
                        <label for="Loai">Loại kho:</label>
                        <select name="Loai" id="" >
                            
                            <option value="Sản xuất">Sản xuất</option>
                            <option value="Nguyên liệu">Nguyên liệu</option>
                            <option value="Thành phẩm">Thành phẩm</option>
                         </select>
                    </div>
                    
		            <div class="btn-screen2">
                    	<button class="btn-them " name="ThemTTK"> Thêm</button>
                    	<button class="btn-huy"> <a href="quanLyKho.php">Huỷ</a></button>
                    </div>

                </form>
                
            </div>
        </div>
    </div>
</body>

</html>