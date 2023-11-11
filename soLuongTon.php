<?php
require_once './db.php';
require_once './helper.php';

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cập nhật số lượng tồn</title>
  <link rel="stylesheet" href="css/menu.css" />
  <link rel="stylesheet" href="css/overlay.css" />
  <link rel="stylesheet" href="css/form.css" />
  <link rel="stylesheet" href="css/button.css" />
  <link rel="stylesheet" href="css/phanPhoiDonYeuCau.css" />
  <link rel="stylesheet" href="css/phanPhoiDonXuat.css" />
  <link rel="stylesheet" href="fontawesome-free-6.2.0-web/css/all.css" />
  <!-- <script defer type="module" src="js/xacNhanNhapKho.js"></script> -->
  <style>
    a {
      text-decoration: none;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="menu">
      <div class="image"></div>
      <div class="nav">
        <ul>
          <li><a href="#">Trang chủ</a></li>
          <li><a href="timKiem.php">Tìm kiếm</a></li>
          <li class="show">
            <p>Quản lý kho <i class="fa-solid fa-angle-down"></i></p>
            <ul>
              <li><a href="quanLyKho.php">Tất cả nguyên liệu</a></li>
              <li><a href="soLuongTon.php">Cập nhật số lượng tồn</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <a href="quanLyKho.php">
        <h3>Quản lý kho > Tất cả kho</h3>
      </a>
      <form class="search">
        <input type="text" name="search" id="search" />
        <button type="button">
          <i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8"></i>
        </button>
      </form>
      <div class="content__inner">
        <table>
          <tr class="muc">
            <th>Mã chi tiết nguyên liệu</th>
            <th>Tên nguyên liệu</th>
            <th>Số lượng</th>
            <th>Đơn vị</th>
            <th>Ngày hết hạn</th>
            <th>Hành động</th>
          </tr>
          <?php
          $tableName = 'sanpham';
          $tableJoin = 'chitietsanpham';
          $sql = "SELECT $tableName.MaSanPHam,$tableName.TenSanPham,$tableJoin.NgaySanXuat,$tableJoin.SoLuongTon,$tableJoin.NgayHetHan,$tableJoin.DonVi,$tableJoin.TrangThai FROM $tableName INNER JOIN $tableJoin ON $tableName.MaSanPHam=$tableJoin.MaSanPHam ";
          $result = $conn->query($sql);
          foreach ($result as $product) {
            echo '<tr>
              <td>' . $product['MaSanPHam'] . '</td>
              <td>' . $product['TenSanPham'] . '</td>
              <td>' . $product['SoLuongTon'] . '</td>
              <td>' . $product['DonVi'] . '</td>
              <td>' . $product['NgayHetHan'] . "</td>
              <td>
                  <a href='capNhatSoLuongTon.php?id=" . $product['MaSanPHam'] . " ' class='btn primary center large'>
                  Cập nhật
                  </a>
              </td>
          </tr>";
          }

          ?>
        </table>
      </div>
    </div>
  </div>

  <div class="overlayDiv"></div>
</body>

</html>