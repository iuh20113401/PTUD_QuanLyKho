<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Đơn yêu cầu nhập</title>
  <link rel="stylesheet" href="../css/bootstrap.css" />
  <link rel="stylesheet" href="../css/bootstrap.min.css" />
  <link rel="stylesheet" href="../fontawesome-free-6.2.0-web/css/all.css" />
  <link rel="stylesheet" href="../css/phieuNhap.css">

  <script type="text/javascript" src="../js/jquery-3.7.1.min.js"></script>
  <script src="../js/bootstrap.bundle.js"></script>
  <script type="text/javascript" src="../js/bootstrap.bundle.min.js"></script>
  <script src="../js/bootstrap.js"></script>
  <script src="../js/moment.min.js"></script>
  <script type="text/javascript" src="../js/bootstrap.min.js"></script>
  <script src="../js/baoCao.js"></script>
  <script type="text/javascript" src="../js/chiTietDonYeuCau.js"></script>
</head>

<body>
  <div class="section">
    <div class="trai">
      <div class="navbar navbar-brand"><img src="../image/logo.jpg" alt="" height="200px"></div><br></br><br></br>
      <div class="vertical-menu">
        <div class="menu">
          <div class="item"><a href="#">Trang chủ</a></div>
          <div class="item"> <a href="baoCao.php">Báo cáo</a></div>
          <div class="item"> <a href="#" class="sub-btn">Đơn yêu cầu <i class="fas fa-angle-right dropdown"></i> </a>
            <div class="sub-menu">
              <a class="sub-item" href="phieuNhap.php">Đơn yêu cầu nhập</a>
              <a class="sub-item" href="phieuXuat.php">Đơn yêu cầu xuất</a>
            </div>
          </div>
          <div class="item" id="nvls"><a href="#" class="sub-btn">Quản lý nguyên vật liệu/thành phẩm<i class="fas fa-angle-right dropdown"></i></a>
            <div class="sub-menu">
              <a class="sub-item" href="nguyenVatLieu.php">Nguyên vật liệu</a>
              <a class="sub-item" href="thanhPham.php">Thành phẩm</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="phai">
      <div class="phanphoi">
        <a href="#">
          <h3>Đơn yêu cầu > Đơn yêu cầu nhập</h3>
        </a>
      </div>
      <div class="khung">
        <table class="table">
          <div class="LocPhieu" style="display: inline;"><button class="btn-lpxk" style="padding:10px 20px; ">Lọc phiếu trong kho <i class="fa-solid fa-caret-right fa-rotate-90"></i></button>
            <form class="search">
              <input type="text" name="search" id="search" placeholder="Tìm kiếm theo Mã phiếu hoặc Tên phiếu" style="position: relative;left: 68px;top: 0px;">
            </form>
          </div>

          <tr>
            <th class="bang">Mã phiếu </th>
            <th class="bang">Thời gian tạo</th>
            <th class="bang">Tên phiếu</th>
            <th class="bang">Số lượng</th>
            <th class="bang">Người lập</th>
            <th class="bang">Trạng thái</th>

          </tr>


          <?php
          $conn = new mysqli("localhost", "son", "123456", "quanlykho");
          mysqli_set_charset($conn, "utf8");
          $sql = "SELECT * FROM donyeucau WHERE MaLoai IN ('1', '3')";
          $result = $conn->query($sql);

          while ($row = $result->fetch_assoc()) {
            echo
            "<tr onclick=\"window.location='chiTietPhieuNhap.php?MaDon=" . $row['MaDon'] . "'\">
      <td>" . $row['MaDon'] . "</td>
      <td>" . $row['NgayLap'] . "</td>
      <td>" . $row['MaLoai'] . "</td>
      <td>" . $row['SoLuong'] . "</td>
      <td>" . $row['MaTaiKhoan'] . "</td>
      <td>" . $row['TrangThai'] . "</td>
      </tr>";
          }

          ?>
        </table>
      </div>
    </div>





  </div>
</body>

</html>