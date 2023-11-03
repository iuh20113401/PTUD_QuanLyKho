<?php
if (empty($_POST['username']) || empty($_POST['password'])) {
    // Nếu không, hãy hiển thị thông báo lỗi
    echo "Vui lòng nhập tên người dùng và mật khẩu của bạn.";
    echo '<script>setTimeout(function(){ window.location = "../NguyenDuyTai/html/dangNhap.html"; }, 2000);</script>';
} elseif (!is_numeric($_POST['username'])) {
  // Kiểm tra tên đăng nhập có chứa chỉ số không
  echo "Tên đăng nhập chỉ được chứa số.";
  echo '<script>setTimeout(function(){ window.location = "../NguyenDuyTai/html/dangNhap.html"; }, 2000);</script>';
} elseif (strlen($_POST['password']) < 8) {
    // Kiểm tra độ dài của mật khẩu
    echo "Mật khẩu phải chứa ít nhất 8 ký tự.";
    echo '<script>setTimeout(function(){ window.location = "../NguyenDuyTai/html/dangNhap.html"; }, 2000);</script>';
} else {
    // Nếu tất cả các điều kiện đều đúng, hãy kết nối với cơ sở dữ liệu
    $conn = mysqli_connect("localhost", "duytai", "123456", "quanlykho");

    // Truy vấn cơ sở dữ liệu để tìm người dùng
    $sql = "SELECT * FROM taikhoan WHERE TenDangNhap = '{$_POST['username']}' AND MatKhau = '{$_POST['password']}'";
    $result = mysqli_query($conn, $sql);

    // Nếu không tìm thấy người dùng, hãy hiển thị thông báo lỗi
    if (mysqli_num_rows($result) == 0) {
        echo "Tên người dùng hoặc mật khẩu không chính xác.";
        echo '<script>setTimeout(function(){ window.location = "../NguyenDuyTai/html/dangNhap.html"; }, 2000);</script>';
    } else {
        // Nếu tìm thấy người dùng, hãy đăng nhập họ
        $row = mysqli_fetch_assoc($result);
        session_start();
        $_SESSION['username'] = $row['username'];
        header("Location: html/xemNguyenLieu.php");
    }

    // Đóng kết nối với cơ sở dữ liệu
    mysqli_close($conn);
}
?>
