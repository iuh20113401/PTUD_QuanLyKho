<?php
require_once './db.php';
require_once './helper.php';

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chi tiết nguyên liệu</title>
  <link rel="stylesheet" href="css/menu.css" />
  <link rel="stylesheet" href="css/overlay.css" />
  <link rel="stylesheet" href="css/form.css" />
  <link rel="stylesheet" href="css/button.css" />
  <link rel="stylesheet" href="css/phanPhoiDonYeuCau.css" />
  <link rel="stylesheet" href="fontawesome-free-6.2.0-web/css/all.css" />
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
      <a href="#">
        <h3>Quản lý kho > nguyên liệu</h3>
      </a>
      <form class="search">
        <input type="text" name="search" id="search" />
        <button type="button">
          <i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8"></i>
        </button>
      </form>
      <div class="content__inner chitiet">

        <?php
        if (isset($_GET['id'])) {
          $tableName = 'sanpham';
          $tableJoin = 'chitietsanpham';
          $sql = "SELECT $tableName.MaSanPHam,$tableName.TenSanPham,$tableJoin.SoLuongTon,$tableJoin.DonVi,$tableJoin.NgaySanXuat,$tableJoin.NgayHetHan,$tableJoin.TrangThai FROM $tableName  INNER JOIN $tableJoin ON $tableName.MaSanPHam=$tableJoin.MaSanPHam Where $tableName.MaSanPHam =  " . $_GET['id'] . '';
          $result = $conn->query($sql);
          while ($row = $result->fetch_assoc()) {
            if (ngayHetHan($row['NgayHetHan'], 7) == 'het_han') {
              echo '  <h3>Chi tiết nguyên liệu</h3>
                  <p style="font-size:20px"><span class="deMuc" >Mã chi tiết nguyên liệu:</span>' . $row['MaSanPHam'] . '</p>
            <p style="font-size:20px"><span class="deMuc" >Tên nguyên liệu :</span>' . $row['TenSanPham'] . '</p>
            <p style="font-size:20px"><span class="deMuc" >Số lượng:</span>' . $row['SoLuongTon'] . ' ' . $row['DonVi'] . '</p>
            <p style="font-size:20px"><span class="deMuc" >Ngày nhập kho:</span>24/09/2023</p>
            <p style="font-size:20px"><span class="deMuc" >Ngày xuất kho:</span>24/09/2023</p>
            <p style="font-size:20px"><span class="deMuc" >Ngày hết hạn:</span>' . $row['NgayHetHan'] . '</p>
            <p style="font-size:20px"><span class="deMuc"  style="margin-bottom:20px;">Tình trạng:</span>' . 'Hết hạn' . '</p>
            <div class="buttons" style="margin: auto;justify-content:center">
            <button class="btn primary" style="background:red">Tiêu hủy</button>
           
          </div>';
            } elseif (ngayHetHan($row['NgayHetHan'], 7) == 'sap_het_han') {
              echo '  <h3>Chi tiết nguyên liệu</h3>
                  <p style="font-size:20px"><span class="deMuc" >Mã chi tiết nguyên liệu:</span>' . $row['MaSanPHam'] . '</p>
            <p style="font-size:20px"><span class="deMuc" >Tên nguyên liệu :</span>' . $row['TenSanPham'] . '</p>
            <p style="font-size:20px"><span class="deMuc" >Số lượng:</span>' . $row['SoLuongTon'] . ' ' . $row['DonVi'] . '</p>
            <p style="font-size:20px"><span class="deMuc" >Ngày nhập kho:</span>24/09/2023</p>
            <p style="font-size:20px"><span class="deMuc" >Ngày xuất kho:</span>24/09/2023</p>
            <p style="font-size:20px"><span class="deMuc" >Ngày hết hạn:</span>' . $row['NgayHetHan'] . '</p>
            <p style="font-size:20px"><span class="deMuc" >Tình trạng:</span>' . 'Sắp hết hạn' . '</p>';
            } else {
              echo '  <h3>Chi tiết nguyên liệu</h3>
                <p style="font-size:20px"><span class="deMuc" >Mã chi tiết nguyên liệu:</span>' . $row['MaSanPHam'] . '</p>
          <p style="font-size:20px"><span class="deMuc" >Tên nguyên liệu :</span>' . $row['TenSanPham'] . '</p>
          <p style="font-size:20px"><span class="deMuc" >Số lượng:</span>' . $row['SoLuongTon'] . ' ' . $row['DonVi'] . '</p>
          <p style="font-size:20px"><span class="deMuc" >Ngày nhập kho:</span>24/09/2023</p>
          <p style="font-size:20px"><span class="deMuc" >Ngày xuất kho:</span>24/09/2023</p>
          <p style="font-size:20px"><span class="deMuc" >Ngày hết hạn:</span>' . $row['NgayHetHan'] . '</p>
          <p style="font-size:20px"><span class="deMuc" >Tình trạng:</span>' . $row['TrangThai'] . '</p>';
            }
          }
        } else {
          echo '  <h3>Không tìm thấy dữ liệu</h3>';
        }

        ?>



      </div>
    </div>
  </div>
  <div class="overlayDiv"></div>
</body>

</html>