<?php
  // Kết nối với cơ sở dữ liệu
  $conn = mysqli_connect("localhost", "root", "", "warehouse");

  // Truy vấn cơ sở dữ liệu để lấy danh sách nguyên liệu
  $sql = "SELECT * FROM materials";
  $result = mysqli_query($conn, $sql);

  // Tạo mảng để lưu trữ danh sách nguyên liệu
  $materials = array();
  while ($row = mysqli_fetch_assoc($result)) {
    $materials[] = $row;
  }

  // Đóng kết nối với cơ sở dữ liệu
  mysqli_close($conn);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Xem nguyên liệu</title>
</head>
<body>
  <h1>Danh sách nguyên liệu</h1>
  <table border="1">
    <thead>
      <tr>
        <th>Mã nguyên liệu</th>
        <th>Tên nguyên liệu</th>
        <th>Số lượng tồn</th>
        <th>Chờ nhập</th>
        <th>Chờ xuất</th>
        <th>Đơn vị</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($materials as $material) { ?>
        <tr>
          <td><?php echo $material['id']; ?></td>
          <td><?php echo $material['name']; ?></td>
          <td><?php echo $material['quantity']; ?></td>
          <td><?php echo $material['pending_import']; ?></td>
          <td><?php echo $material['pending_export']; ?></td>
          <td><?php echo $material['unit']; ?></td>
        </tr>
      <?php } ?>
    </tbody>
  </table>
</body>
</html>