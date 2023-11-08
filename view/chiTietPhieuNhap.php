<?php
$conn = new mysqli("localhost", "son", "123456", "quanlykho");
mysqli_set_charset($conn, "utf8");

?>

<?php
if (isset($_GET['MaDon'])) {
  $MaDon = $_GET['MaDon']; // $id only exists within the scope of this block
}
// $id no longer exists here
$sql = "SELECT * FROM donyeucau WHERE MaDon= " . $MaDon;
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chi tiết đơn yêu cầu</title>

  <link rel="stylesheet" href="../css/bootstrap.css" />
  <link rel="stylesheet" href="../css/bootstrap.min.css" />
  <link rel="stylesheet" href="../fontawesome-free-6.2.0-web/css/all.css" />
  <link rel="stylesheet" href="../css/phieuNhap.css" />
  <link rel="stylesheet" href="../css/nguyenVatLieu.css">
  <link rel="stylesheet" href="../css/themNguyenVatLieu.css">
  <link rel="stylesheet" href="../css/chiTietPhieuNhap.css">

  <script type="text/javascript" src="../js/jquery-3.7.1.min.js"></script>
  <script type="text/javascript" src="../js/bootstrap.bundle.js"></script>
  <script type="text/javascript" src="../js/bootstrap.bundle.min.js"></script>
  <script type="text/javascript" src="../js/bootstrap.js"></script>
  <script type="text/javascript" src="../js/moment.min.js"></script>
  <script type="text/javascript" src="../js/bootstrap.min.js"></script>
  <script type="text/javascript" src="../js/baoCao.js"></script>
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
          <h3>Đơn yêu cầu > Đơn yêu cầu nhập > Chi tiết</h3>
        </a>
      </div>
      <div class="khung">
        <div class="content-table thongtin">
          <h3>CHI TIẾT ĐƠN YÊU CẦU NHẬP</h3>
          <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true"><a href="phieuNhap.php">&times;</a></span>
          </button>
          <form class="form" action="/action_page.php">
            <div class="form-group">
              <label for="MaPhieu" class="control-label">Mã đơn</label>
              <input type="text" value="<?php echo $row['MaDon']; ?>" class="form-control" disabled>
            </div>
            <div class="form-group">
              <label for="MaPhieu" class="control-label">Tên đơn</label>
              <input type="text" value="<?php echo $row['TenDon']; ?>" class="form-control" disabled>
            </div>
            <div class="form-group">
              <label for="NguoiLap" class="control-label">Người lập</label>
              <input type="text" value="<?php echo $row['MaTaiKhoan']; ?>" class="form-control" disabled>
            </div>
            <div class="form-group">
              <label for="ThoiGianTao" class="control-label">Thời gian tạo</label>
              <input type="text" value="<?php echo $row['NgayLap']; ?>" class="form-control" disabled>
            </div>


            <table class="small">
              <tbody>
                <tr>
                  <th>Tên nguyên liệu</th>
                  <th>Số lượng</th>
                  <th>Đơn vị</th>
                </tr>
              <tbody>
                <?php
                // Thực hiện truy vấn và hiển thị thông tin chi tiết nguyên liệu
                $sql = "SELECT * FROM chitietdonyeucau WHERE MaDon = " . $MaDon;
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row['MaSanPham'] . "</td>";
                    echo "<td>" . $row['SoLuong'] . "</td>";
                    echo "<td>" . $row['DonVi'] . "</td>";
                    echo "</tr>";
                  }
                }
                ?>

              </tbody>
            </table>

            <div class="btn-Phieu">
              <button class="btn btn-primary"><a href="duyetPhieu.php?MaDon=<?php echo $MaDon; ?>">Duyệt</a></button>
              <button class="btn btn-danger"><a href="tuChoiPhieu.php?MaDon=<?php echo $MaDon; ?>">Từ chối</a></button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</body>

</html>