<?php
$conn = new mysqli("localhost", "root", "", "quanlykho");
mysqli_set_charset($conn, "utf8");

?>

<?php
if (isset($_GET["MaCT"])) {
    $MaCT = $_GET["MaCT"];
}

$sql = "SELECT * FROM congthuc WHERE MaCT= " . $MaCT;
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
}
?>

<?php
if (isset($_POST["xoaCT"])) {
    
    $TrangThai=$_POST['TrangThai'];

    if($TrangThai !=""){
        $sql = "UPDATE  congthuc SET TrangThai ='$TrangThai' WHERE MaCT = $MaCT ";
        // $sql= "DELETE  FROM congthuc WHERE MaCT=".$MaCT;
        $result = $conn->query($sql);
        header("location: congThuc.php");
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
    <title>Xóa công thức</title>
    <link rel="stylesheet" href="../css/SuaCT.css">
</head>

<body>
    <div class="container">
        <div class="menu">
            <div class="image"></div>
            <div class="nav">
                <ul>
                    <li><a href="#">Trang chủ</a></li>
                    <li><a href="quanLyKho.html">Quản lý thông tin kho</a></li>
                    <li><a href="xemTrangThaiDon.html">Xem trạng thái đơn yêu cầu</a></li>
                    <li class="show">
                        <p>Công thức<i class="fa-solid fa-angle-down"></i></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content">
            <a href="#"> <h3>Phân phối > Công thức > Xóa</h3></a>
            <div class="content-table thongtin">
                <h3>XÓA CÔNG THỨC</h3>
                <form class="" method="post">
                    <div class="form-kho ma2">
                        <label for="MaCT">Mã :</label>
                        <input type="text" id="MaCT" name="MaCT" value="<?php echo $row['MaCT']; ?>" disabled>
                    </div>
                    <div class="form-kho ten2">
                        <label for="TenCongThuc">Tên :</label>
                        <input type="text" id="TenCongThuc" name="TenCongThuc" value="<?php echo $row['TenCongThuc']; ?>" disabled>
                    </div>
                    <div class="form-kho dia2">
                        <label for="DonVi">Đơn vị:</label>
                        <input type="text" id="DonVi" name="DonVi" value="<?php echo $row['DonVi']; ?>"disabled >
                    </div>
                    <div class="form-kho so2">
                        <label for="SoLuongNguyenLieu">Số lượng:</label>
                        <input type="number" id="SoLuongNguyenLieu" name="SoLuongNguyenLieu"value="<?php echo $row['SoLuongNguyenLieu']; ?>">
                    </div>
                    <div class="form-kho DS">
                        <label for="DanhSachNguyenLieu">DSNL:</label>
                        <input type="text" id="DanhSachNguyenLieu" name="DanhSachNguyenLieu" value="<?php echo $row['DanhSachNguyenLieu']; ?>"disabled>
                    </div>
                    <div class="form-kho mo2">
                        <label for="MoTa">Mô tả:</label>
                        <input type="text" id="MoTa" name="MoTa" value="<?php echo $row['MoTa']; ?>"disabled>
                    </div> 
                    <div class="form-kho tt1">
                        <label for="TrangThai">Trạng Thái:</label>
                        <input type="number" id="TrangThai" name="TrangThai" value="<?php echo $row['TrangThai']; ?>">
                    </div> 
                    <div class="btn-screen2">
                    <button class="btn-them" name="xoaCT" value="xoaCT">Xóa</button>
                    <button class="btn-huy" > <a href="congThuc.php">Huỷ</a></button>
                </div>
                </form>
                
            </div>
        </div>
    </div>
</body>

</html>