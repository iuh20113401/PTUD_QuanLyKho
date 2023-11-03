<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Các thẻ meta và tiêu đề -->
    <link rel="stylesheet" href="../css/xemNguyenLieu.css">
</head>
<body>
    <!-- Mã HTML trang -->
    <div class="section">
                    <?php while ($row = $nguyenLieuData->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $row["MaSanPham"]; ?></td>
                            <td><?php echo $row["TenSanPham"]; ?></td>
                            <td><?php echo $row["SoLuongTon"]; ?></td>
                            <td><?php echo $row["SoLuongChoNhap"]; ?></td>
                            <td><?php echo $row["SoLuongChoXuat"]; ?></td>
                            <td><?php echo $row["DonVi"]; ?></td>
                        </tr>
                    <?php endwhile; ?>
    </div>
</body>
</html>
