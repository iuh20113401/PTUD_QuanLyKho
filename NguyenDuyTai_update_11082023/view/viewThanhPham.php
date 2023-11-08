<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Các thẻ meta và tiêu đề -->
    <link rel="stylesheet" href="../css/xemThanhPham.css">
</head>
<body>
    <!-- Mã HTML trang -->
    <div class="section">
                    <?php while ($row = $thanhPhamData->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $row["MaSanPham"]; ?></td>
                            <td><?php echo $row["TenSanPham"]; ?></td>
                            <td><?php echo $row["SoLuongTon"]; ?></td>
                            <td><?php echo $row["SoLuongChoNhap"]; ?></td>
                            <td><?php echo $row["SoLuongChoXuat"]; ?></td>
                            <td><?php echo $row["DonVi"]; ?></td>
                            <td>
                                <button onclick="" style="background-color:#3366FF">Xem</button>
                            </td>
                        </tr>
                    <?php endwhile; ?>
    </div>
</body>
</html>
