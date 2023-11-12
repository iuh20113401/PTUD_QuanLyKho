<?php
$conn = new mysqli("localhost", "root", "", "quanlykho");
mysqli_set_charset($conn, "utf8");
?>
<?php
$MaCT=$_POST["MaCT"];

$sql = "SELECT * FROM congthuc WHERE MaCT= " . $MaCT;
$result = $conn->query($sql);
if ($result == true && $result->num_rows > 0) {
    $row =$result->fetch_assoc() ;
    echo('Mã công thức đã tồn tại');
}else{
    if (isset($_POST['ThemCT'])) {
        $MaCT=$_POST['MaCT'];
        $TenCongThuc=$_POST['TenCongThuc'];
        $DonVi=$_POST['DonVi'];
        $MoTa=$_POST['MoTa'];
        $SoLuongNguyenLieu=$_POST['SoLuongNguyenLieu'];
        $DanhSachNguyenLieu=$_POST['DanhSachNguyenLieu'];
        if(!is_numeric($MaCT)){
            echo "Mã phải là số";
        }else{
            if ($MaCT == ""&& $TenCongThuc == ""&& $DonVi== ""&&$SoLuongNguyenLieu == ""&&$DanhSachNguyenLieu == "") {
                echo "Vui lòng nhập vào đầy đủ thông tin! ";
             }else{
                 $sql="INSERT INTO `congthuc`(`MaCT`, `TenCongThuc`, `DonVi`, `DanhSachNguyenLieu`, `MoTa`, `SoLuongNguyenLieu`) VALUES ('$MaCT','$TenCongThuc','$DonVi','$DanhSachNguyenLieu','$MoTa','$SoLuongNguyenLieu')";
                 $result = $conn->query($sql);
                 header("location: congThuc.php");
             }
        }
        
    }
}

mysqli_close($conn);

?> 
   

?> 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thêm công thức</title>
    <link rel="stylesheet" href="../css/themCT.css" />
</head>

<body>
    <div class="container">
        <div class="menu">
            <div class="image"></div>
            <div class="nav">
                <ul>
                    <li><a href="#">Trang chủ</a></li>
                    <li><a href="quanLyKho.php">Quản lý thông tin kho</a></li>
                    <li><a href="xemTrangThaiDon.php">Xem trạng thái đơn yêu cầu</a></li>
                    <li class="show">
                        <p>Công thức<i class="fa-solid fa-angle-down"></i></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content">
            <a href="#"> <h3>Phân phối > Công thức > Thêm</h3></a>
            <div class="content-table thongtin">
                <h3>THÊM CÔNG THỨC</h3>
                <form class="" method="post">
                <div class="form-kho ma1">
                        <label for="MaCT">Mã  :</label>
                        <input type="text" id="MaCT" name="MaCT" placeholder="Nhập tên công thức">
                    </div>
                    <div class="form-kho ten1">
                        <label for="TenCongThuc">Tên :</label>
                        <input type="text" id="TenCongThuc" name="TenCongThuc" placeholder="Nhập tên công thức">
                    </div>
                    <div class="form-kho dia">
                        <label for="DonVi">Đơn vị:</label>
                        <input type="text" name="DonVi" id="DonVi" placeholder="Nhập đơn vị(m,kg,....)">
                    </div>
                    <div class="form-kho so">
                        <label for="SoLuongNguyenLieu">Số lượng:</label>
                        <input type="number"name="SoLuongNguyenLieu" id="SoLuongNguyenLieu" placeholder="Nhập số lượng" min="1" max="99999">
                    </div>
                    <div class="form-kho DS">
                        <label for="DanhSachNguyenLieu">DSNL:</label>
                        <input type="text" name="DanhSachNguyenLieu" id="DanhSachNguyenLieu" placeholder="Nhập danh sách nguyên liệu">
                    </div>
                    <div class="form-kho mo">
                        <label for="MoTa">Mô tả:</label>
                        <input type="text" name="MoTa" id="MoTa" placeholder="Nhập mô tả">
                    </div>
                    <div class="btn-screen2">
                    <button class="btn-them"name="ThemCT">Thêm</button>
                    <button class="btn-huy"> <a href="congThuc.php">Huỷ</a></button>
                </div>
                </form>
                
            </div>
        </div>
    </div>
</body>

</html>