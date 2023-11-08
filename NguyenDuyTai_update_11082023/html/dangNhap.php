<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dang nhap</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link rel="stylesheet" href="../css/dangNhap.css">
</head>

<body>
  <div class="DangNhap">
    <div class="logoo" >
      <img src="../imagess/logo.jpg" alt="">
    </div><br><br/>
    <form method="post" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
        <div class="form-group">
          <label for="username">
            <i class="fas fa-user"></i>
          </label>
          <input type="text" id="username" name="username" class="form-control" placeholder="Tên đăng nhập:">
        </div>
        <div class="form-group">
          <label for="password">
            <i class="fas fa-lock"></i>
          </label>
          <input type="password" id="password" name="password" class="form-control" placeholder="Mật khẩu:">
        </div>
        <div class="submit">
          <button type="submit" class="btn btn-primary">Đăng nhập</button>
        </div>
        <?php
        // Kiểm tra xem có dữ liệu được gửi từ form chưa
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $serverName = "localhost";
            $username = "duytai";
            $password = "123456";
            $databaseName = "quanlykho";

            // Kiểm tra tên người dùng và mật khẩu đã được nhập hay chưa
            if (empty($_POST["username"]) || empty($_POST["password"])) {
                echo "<p class='error'>Vui lòng nhập tên người dùng và mật khẩu</p>";
            } else {
                $inputUsername = $_POST["username"];
                $inputPassword = $_POST["password"];

                // Kiểm tra tên người dùng có chỉ chứa số hay không
                if (!is_numeric($inputUsername)) {
                    echo "<p class='error'>Tên người dùng phải chỉ chứa số</p>";
                } else {
                    // Kiểm tra mật khẩu có đủ dài ít nhất 8 ký tự hay không
                    if (strlen($inputPassword) < 8) {
                        echo "<p class='error'>Mật khẩu phải ít nhất 8 ký tự</p>";
                    } else {
                        // Kết nối đến cơ sở dữ liệu
                        $conn = new mysqli($serverName, $username, $password, $databaseName);

                        if ($conn->connect_error) {
                            die("Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error);
                        }

                        // Thực hiện kiểm tra tên người dùng và mật khẩu
                        $query = "SELECT * FROM taikhoan WHERE TenDangNhap='$inputUsername' AND MatKhau='$inputPassword'";
                        $result = $conn->query($query);

                        if ($result->num_rows > 0) {
                            // Đăng nhập thành công, chuyển đến trang xemNguyenLieu.php
                            header("Location: ../html/xemNguyenLieu.php");
                        } else {
                            echo "<p class='error'>Tên đăng nhập hoặc mật khẩu không đúng.</p>";
                        }

                        $conn->close();
                    }
                }
            }
        }
        ?>
      </form>
    </div>
</body>
</html>
