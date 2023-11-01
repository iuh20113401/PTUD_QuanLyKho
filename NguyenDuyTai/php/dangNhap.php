<?php
  // Kiểm tra xem người dùng đã nhập tên người dùng và mật khẩu chưa
  if (empty($_POST['username']) || empty($_POST['password'])) {
    // Nếu không, hãy hiển thị thông báo lỗi
    echo "Vui lòng nhập tên người dùng và mật khẩu của bạn.";
  } else {
    // Nếu có, hãy kết nối với cơ sở dữ liệu
    $conn = mysqli_connect("localhost", "root", "", "warehouse");

    // Truy vấn cơ sở dữ liệu để tìm người dùng
    $sql = "SELECT * FROM users WHERE username = '{$_POST['username']}' AND password = '{$_POST['password']}'";
    $result = mysqli_query($conn, $sql);

    // Nếu không tìm thấy người dùng, hãy hiển thị thông báo lỗi
    if (mysqli_num_rows($result) == 0) {
      echo "Tên người dùng hoặc mật khẩu không chính xác.";
    } else {
      // Nếu tìm thấy người dùng, hãy đăng nhập họ
      $row = mysqli_fetch_assoc($result);
      session_start();
      $_SESSION['username'] = $row['username'];
      header("Location: index.php");
    }

    // Đóng kết nối với cơ sở dữ liệu
    mysqli_close($conn);
  }
?>