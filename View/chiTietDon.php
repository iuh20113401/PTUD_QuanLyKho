<?php
$conn = new mysqli("localhost", "root", "", "quanlykho");
mysqli_set_charset($conn, "utf8");

?>

<?php
 if (isset($_GET["MaDon"])) {
   $MaDon= $_GET["MaDon"];
 }

$sql = "SELECT * FROM donyeucau WHERE MaDon= ".$MaDon;
$result = $conn->query($sql);
if ($result !== false && $result->num_rows > 0) {
    $row =$result->fetch_assoc() ;
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CT</title>
    <link rel="stylesheet" href="../css/form.css>
</head>
<body>
    <div class="container">
        <div class="menu">
            <div class="image"></div>
            <div class="nav">
                <ul>
                    <li><a href="#">Trang chủ</a></li>
                    <li><a href="quanLyKho.php">Quản lý thông tin kho</a></li>
                    <li class="show">
                        <p>Xem trạng thái đơn yêu cầu<i class="fa-solid fa-angle-down"></i></p>
                    </li>
                    <li><a href="congThuc.php">Công thức</a></li>
                </ul>
            </div>
        </div>
        <div class="content">
            <a href="#"> <h3>Phân phối > Xem trạng thái đơn yêu cầu> Chi tiết đơn yêu cầu</h3></a>
            <div class="content-table thongtin">
                <h3>CHI TIẾT ĐƠN YÊU CẦU</h3>
                <form action="">
                    <div class="form-kho madon">
                        <label for="MaDon">Mã đơn :</label>
                        <input type="text"style="width:81%"  value="<?php echo $row['MaDon'];?>" disabled>
                    </div>
                    <div class="form-kho tendon">
                        <label for="TenDon">Tên đơn :</label>
                        <input type="text"  style="width:80%" value="<?php echo $row['TenDon'];?>" disabled>
                    </div>
                    <div class="form-kho ngay">
                        <label for="NgayLap">Ngày lập:</label>
                        <input type="text" style="width: 80%"  value="<?php echo $row['NgayLap'];?>" disabled>
                    </div>
                    <div class="form-kho trangthai">
                        <label for="TrangThai">Trạng Thái:</label>
                        <input type="text" style="width: 77%"  value="<?php echo $row['TrangThai']; ?>" disabled>
                    </div>
                    
                    <div class="form-kho DS">
                        <label for="DSNL">Danh sách nguyên liệu:</label>
                        <table >
                            <th>Mã sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn vị</th>
                            <th>Ngày sản xuát</th>
                            <th>Ngày hết hạn</th>
                        <?php     
                            $sql = "SELECT * FROM chitietdonyeucau WHERE MaDon= ".$MaDon;
                            //MaDon=".$MaDon
                            $result = $conn->query($sql);
                            if($result !== false &&$result->num_rows > 0){
                            while ($row = $result->fetch_assoc()) {
                            ?>
                        <tr>
                            <td><?php echo $row["MaSanPham"]; ?></td>
                            <td><?php echo $row["SoLuong"]; ?></td>
                            <td><?php echo $row["DonVi"]; ?></td>
                            <td><?php echo $row["NgaySanXuat"]; ?></td>
                            <td><?php echo $row["NgayHetHan"]; ?></td>
                        </tr>
                        <?php }  }
                        
                       
                        ?>
                        
                        </table>
                    </div>
                    
                    <div class="btnquaylai">
                        <button class="btn-xuat">Xuất đơn</button>
                        <button class="btn-QL"> <a href="xemTrangThaiDon.php">Quay lại</a></button>
                        
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</body>
</html>