<?php
$conn = new mysqli("localhost", "root", "", "quanlykho");
mysqli_set_charset($conn, "utf8");

?>

<?php
if (isset($_GET["MaKho"])) {
    $MaKho = $_GET["MaKho"];
}

$sql = "SELECT * FROM kho WHERE MaKho= " . $MaKho;
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
}
?>

<?php
if (isset($_POST["xoa"])) {
    
    $TrangThai=$_POST['TrangThai'];

    if($TrangThai !=""){
        $sql = "UPDATE  kho SET TrangThai ='$TrangThai' WHERE MaKho = $MaKho ";
        // $sql= "DELETE  FROM congthuc WHERE MaCT=".$MaCT;
        $result = $conn->query($sql);
        header("location: quanLyKho.php");
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
    <title>Sửa thông tin kho</title>
    <link rel="stylesheet" href="../css/SuaTTK.css">
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
            <a href="#"> <h3>Phân phối > Quản lý thông tin kho > Sửa</h3></a>
            <div class="content-table thongtin">
                <h3>XÓA THÔNG TIN KHO</h3>
                <form class="" method="post">
                    <div class="form-kho ma1">
                        <label for="MaKho">Mã kho:</label>
                        <input type="text" name="MaKho" id="MaKho" value="<?php echo $row['MaKho']; ?>" disabled>
                    </div>
                    <div class="form-kho ten1">
                        <label for="TenKho">Tên kho:</label> 
                        <input type="text" name="TenKho" id="TenKho" value="<?php echo $row['TenKho']; ?>"disabled>
                    </div>
                    <div class="form-kho dia">
                        <label for="ViTri">Địa chỉ:</label>
                        <input type="text" name="ViTri" id="ViTri" value="<?php echo $row['ViTri']; ?>"disabled>
                    </div>
		            <div class="form-kho mo">
                        <label for="MoTa">Mô tả:</label>
                        <input type="text" name="MoTa" id="MoTa" value="<?php echo $row['MoTa']; ?>"disabled>
                    </div>
                    <div class="form-kho suc1">
                        <label for="SucChua">Sức chứa:</label>
                        <input type="number" name="SucChua" id="SucChua" value="<?php echo $row['SucChua']; ?>" min="1" max="99999"disabled>
                    </div>
                    <div class="form-kho so1">
                        <label for="SucChuaDaDung">Số lượng:</label>
                        <input type="number" name="SucChuaDaDung" id="SucChuaDaDung" value="<?php echo $row['SucChuaDaDung']; ?>" min="1" max="99999" disabled >
                    </div>
                    <div class="form-kho loai">
                        <label for="Loai">Loại kho:</label>
                        <select name="Loai" id=""disabled >
                            <option value="Sản xuất">Sản xuất</option>
                            <option value="Nguyên liệu">Nguyên liệu</option>
                            <option value="Thành phẩm">Thành phẩm</option>
                         </select>
                    </div>
                    <div class="form-kho tt1">
                        <label for="TrangThai">Trạng Thái:</label>
                        <input type="number" id="TrangThai" name="TrangThai" value="<?php echo $row['TrangThai']; ?>">
                    </div> 
                    <div class="btn-screen2">
                    <button class="btn-them" name="xoa">Xóa</button>
                    <button class="btn-huy"> <a href="quanLyKho.php">Huỷ</a></button>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
</body>

</html>