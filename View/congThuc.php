<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CT</title>
    <link rel="stylesheet" href="../css/form.css">
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
            <a href="#"> <h3>Phân phối > Công thức</h3></a>
            <div class="content-table thongtin">
                <h3>DANH SÁCH CÔNG THỨC</h3>
                <form action="" method="post">
                    <table>
                        <tbody>
                            <tr class="TTCT">
                                <th>Mã</th>
                                <th>Tên </th>
                                <th>Đơn vị</th>
                                <th>Danh sách nguyên liệu</th>
                                <th>Mô tả</th>
                                <th>Số lượng</th>
                                
                                
                                <?php
                                $conn = new mysqli("localhost", "root", "", "quanlykho");
                                mysqli_set_charset($conn, "utf8");
    
    
                                $sql = "SELECT * FROM congthuc WHERE TrangThai=0";
                                $result = $conn->query($sql);
    
                                while ($row = $result->fetch_assoc()) {
                                ?>
                            <tr>
                                <td><?php echo $row["MaCT"]; ?></td>
                                <td><?php echo $row["TenCongThuc"]; ?></td>
                                <td><?php echo $row['DonVi']; ?></td>
                                <td><?php echo $row['DanhSachNguyenLieu']; ?></td>
                                <td><?php echo $row['MoTa']; ?></td>
                                <td><?php echo $row['SoLuongNguyenLieu']; ?></td>
                                
                                
                                <td>
                                <div class="btn-kho">
                                            <button class=" sua" ><a href="suaCongThuc.php?MaCT=<?php echo $row["MaCT"]; ?>">Sửa</a></button>
                                            <button class="xoa" name="xoaCT"><a onclick="return confirm('Bạn có chắc chắn muốn xóa?')" href="xoaCongThuc.php?MaCT=<?php echo $row["MaCT"]; ?>">Xóa</a></button>
                                </div>
                                </td>
                            </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                    <div class="btn">
                        <button class="them"> <a href="themCongThuc.php">Thêm</a></button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</body>
</html>