<?php
// Kết nối đến cơ sở dữ liệu
$servername = "localhost";
$username = "kieuu";
$password = "kieu123";
$dbname = "unity";

$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối không thành công: " . $conn->connect_error);
}

// Truy vấn dữ liệu từ cơ sở dữ liệu
$sql = "SELECT TenDangNhap FROM taikhoan  LIMIT 1"; // Thay thế your_table và your_condition bằng thông tin thực tế

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Lấy dữ liệu từ kết quả truy vấn
    $row = $result->fetch_assoc();
    $taiKhoan = $row["taikhoan"];
} else {
    $taiKhoan = "20010021"; // Giá trị mặc định nếu không tìm thấy dữ liệu
}

// Đóng kết nối đến cơ sở dữ liệu
$conn->close();
?>

<div class="content">
  <h5>Lập biên bản</h5>
  <form class="don">
    <h2 class="tittle">BIÊN BẢN</h2>
    <table>
      <tr>
        <td><label for="">Ngày lập đơn</label></td>
        <td><input type="date" name="ngayLapDon" id="ngayLapDon" value="01-11-2023" /></td>
      </tr>

      <tr>
        <td><label for="">Người lập đơn</label></td>
        <td><input type="text" class="" name="taiKhoan" value="<?php echo $taikhoan; ?>" readonly /></td>
      </tr>

      <tr>
        <td><label for="">Mã đơn truy xuất</label></td>
        <td><input type="text" class="" name="madon" value="<?php echo $madon; ?>" /></td>
      </tr>

      <tr>
        <td><label for="">Lý do lập đơn</label></td>
        <td><textarea type="text" class="" name="lydo" rows="4"></textarea></td>
      </tr>
    </table>
    <div class="warning"></div>
    <button class="btn large center primary" id="tiepTuc">Tiếp tục</button>
  </form>
</div>
</php>