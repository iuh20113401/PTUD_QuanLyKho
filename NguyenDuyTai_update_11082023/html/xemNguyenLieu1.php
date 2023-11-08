<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
body, html {
  height: 100%;
  margin: 0;
  padding: 0;
}

.section {
  display: grid;
  grid-template-columns: 1fr 6fr; /* Chia thành hai cột bằng 1:6 */
  grid-gap: 1px; /* Khoảng cách giữa hai cột */
  height: 100%;
  text-align: left;
}

.trai {
  background-color: #030303;
  color: aliceblue;
  text-align: left;
  overflow: hidden; /* Đảm bảo không xuất hiện thanh cuộn ngang */
}

.phai {
  background-color: #ffffff;
  text-align: left;
  overflow: auto; /* Thêm thanh cuộn ngang khi nội dung quá dài */
}

/* Thêm các phần CSS khác ở đây */

.vertical-menu {
    width: 200px; /* Độ rộng của menu dọc */
}

.vertical-menu a {
    display: block;
    padding: 10px; /* Khoảng cách bên trong mỗi mục */
    text-decoration: none;
    color: #faf8f8; /* Màu chữ */
    border-bottom: 1px solid #ccc; /* Đường kẻ ngang */
}

.vertical-menu a:hover {
    background-color: #60df35; /* Màu nền khi hover */
}
.khung {
    display: table;
    width: 80%; /* Độ rộng của khung */
    height: auto; /* Chiều cao của khung */
    border: 1px solid #000; /* Viền của khung */
    padding: 10px; /* Khoảng cách bên trong khung */
    background-color: #ffffff; /* Màu nền của khung */
    margin-left: 80px;
    text-align: center;
}

.phanphoi{
    margin-top: 30px;
    margin-left: 76px;
}
table{
    border-collapse: collapse; /* Loại bỏ khoảng cách mặc định giữa các ô */
}
.bang {
    padding: 20px; /* Khoảng cách bên trong tiêu đề */
}
th, td {
    padding: 10px; /* Khoảng cách bên trong các ô */
}
tr{
    border-bottom: 1px solid #0f0505; /* Đường gạch dưới của dòng dữ liệu */
}
.xem {
    display: inline-block; /* Hiển thị nút như một khối inline */
    padding: 10px 20px; /* Kích thước nút */
    background-color: #0077CC; /* Màu nền */
    color: #fff; /* Màu chữ */
    text-decoration: none; /* Loại bỏ đường gạch chân của liên kết */
    border-radius: 5px; /* Góc bo tròn */
}
.xem:hover {
    background-color: #005599; /* Màu nền khi di chuột qua */
}

</style>
<body>
    <div class="section">
        <div class="trai">
            <h1>Unity</h1><br></br><br></br>
            <div class="vertical-menu">
            <a href="xemNguyenLieu.php">Trang chủ</a>
                <a href="#">Lập đơn yêu cầu</a>
                <a href="#">Lập biên bản</a>
                <a href="#">Phân phối</a>
                <a href="#">Nhập kho</a>
                <a href="#">Xuất kho</a>
                <a href="#" style="color: rgb(0, 255, 0);">Nguyên liệu</a>
                <a href="xemThanhPham.php">Xem thành phẩm</a>
                <a href="dangNhap.php" style="color: red">Đăng xuất</a>
            </div>
        </div>

        <div class="phai">
            <div class="phanphoi"><h3>Phân phối > Đơn nhập nguyên liệu</h3></div><br>
            <div class="khung">
                <table>
                    <tr>
                        <th class="bang">Mã nguyên liệu</th>
                        <th class="bang">Tên nguyên liệu</th>
                        <th class="bang">Số lượng tồn</th>
                        <th class="bang">Chờ nhập</th>
                        <th class="bang">Chờ xuất</th>
                        <th class="bang">Đơn vị</th>
                        
                        <?php
                        include_once ("../model/ketNoi.php");
                        include_once ("../controller/controllerSanPham.php");

                        if (isset($_GET["action"])) {
                            $action = $_GET["action"];
                        } else {
                            $action = "xemNguyenLieu";
                        }

                        $controllerSanPham = new ControllerSanPham();

                        if ($action == "xemNguyenLieu") {
                            $nguyenLieuData = $controllerSanPham->xemNguyenLieu();
                            include_once ("../view/viewNguyenLieu.php");
                            
                        } else {
                            // Xử lý chức năng khác nếu cần
                        }

                        ?>
                        
                    </tr>
                </table>
                
            </div>
        </div>
    </div>
</body>
</html>
