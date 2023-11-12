<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý thông tin kho</title>
    <link rel="stylesheet" href="../css/form.css">
    
   
</head>
<body>
    <div class="container">
        <div class="menu">
            <div class="image"></div>
            <div class="nav">
                <ul>
                    <li><a href="#">Trang chủ</a> </li>
                    <li><a href="#">
                        <p>Quản lý thông tin kho <i class="fa-solid fa-angle-down"></i></p>
                    </li>
                    <li><a href="xemTrangThaiDon.php">Xem trạng thái đơn yêu cầu</li>
                    <li><a href="congThuc.php">Công thức</li>
                </ul>
            </div>
        </div>
        <div class="content">
            <a href="#"> <h3>Phân phối > Quản lý thông tin kho</h3></a>
            <div class="content-table thongtin">
                <h3>QUẢN LÝ THÔNG TIN KHO</h3>
                <form action="#">
                    <table>
                        <tbody>
                            <tr class="TTkho">
                                <th id="MaKho">Mã kho</th>
                                <th id="TenKho">Tên kho</th>
                                <th id="ViTri">Địa chỉ</th>
                                <th id="Mota">Mô tả</th>
                                <th id="SucChua">Sức chứa</th>
                                <th id="SucChuaDaDung">Số lượng đã dùng</th>
                                <th id="Loai">Loại kho</th>
                                
                            </tr>
                            <?php
                            $conn = new mysqli("localhost", "root", "", "quanlykho");
                            mysqli_set_charset($conn, "utf8");


                            $sql = "SELECT * FROM kho WHERE TrangThai=0  ";
                            // SucChuaDaDung=0
                            $result = $conn->query($sql);

                            while ($row = $result->fetch_assoc()) {
                            ?>
                        <tr>
                            <td><?php echo $row["MaKho"]; ?></td>
                            <td><?php echo $row["TenKho"]; ?></td>
                            <td><?php echo $row["ViTri"]; ?></td>
                            <td><?php echo $row["MoTa"]; ?></td>
                            <td><?php echo $row["SucChua"]; ?></td>
                            <td><?php echo $row["SucChuaDaDung"]; ?></td>
                            <td><?php echo $row["Loai"]; ?></td>
            
                            <td>
                            <div class="btn-kho">
                                        <button class=" sua" ><a href="suaThongTinKho.php?MaKho=<?php echo $row["MaKho"]; ?>">Sửa</a></button>
                                        <button class="xoa" ><a onclick="return confirm('Bạn có muốn xóa?')" href="xoaThongTinKho.php?MaKho=<?php echo $row["MaKho"]; ?>">Xóa</a></button>
                            </div>
                            </td>
                        </tr>
                           
                        </tr>
                    <?php } ?>

                        </tbody>
                    </table>
                    
                </form>
                <div class="btn">
                        <button class="them" > <a href="themThongTinKho.php">THÊM</a></button>
                    </div>
            </div>
        </div>
    </div>
    
</body>
</html>