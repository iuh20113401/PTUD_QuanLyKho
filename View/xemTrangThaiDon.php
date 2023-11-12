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
                    <li class="show">
                        <p>Xem trạng thái đơn yêu cầu<i class="fa-solid fa-angle-down"></i></p>
                    </li>
                    <li><a href="congThuc.php">Công thức</a></li>
                </ul>
            </div>
        </div>
        <div class="content">
            <a href="#"> <h3>Phân phối > Xem trạng thái đơn yêu cầu</h3></a>
            <div class="content-table thongtin">
                <h3>DANH SÁCH ĐƠN YÊU CẦU</h3>
                <form action="">
                    <table>
                        <tbody>
                            <tr class="TTkho">
                                <th >Mã đơn</th>
                                <th >Tên đơn </th>
                                <th >Ngày lập</th>
                                <th >Trạng thái</th>
                                
                            </tr>
                            
                            <?php
                            $conn = new mysqli("localhost", "root", "", "quanlykho");
                            mysqli_set_charset($conn, "utf8");


                            $sql = "SELECT * FROM donyeucau WHERE 1";
                            $result = $conn->query($sql);

                            while ($row = $result->fetch_assoc()) {
                            ?>
                            <tr>
                                <td><?php echo $row["MaDon"]; ?></td>
                                <td><?php echo $row["TenDon"]; ?></td>
                                <td><?php echo $row["NgayLap"]; ?></td>
                                <td><?php echo $row["TrangThai"]; ?></td>
                                    <td>
                                        <button class="xem" ><a href="chiTietDon.php?MaDon=<?php echo $row["MaDon"]; ?>">Xem</a></button>
                                    </td>
                            </tr>
                            <?php } ?>
                           
                        </tbody>
                    </table>
                    
                </form>
            </div>
        </div>
    </div>
</body>
</html>