<?php
require_once './db.php';
require_once './helper.php';

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tìm kiếm</title>
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
                <select name="type" style="border-radius:6px;margin-right:20px;padding:0 12px;width:40%;border:1px solid #cccc">
                    <option value="nguyenlieu" <?php if (isset($_GET['type']) && $_GET['type']  == 'nguyenlieu') {
                                                    echo 'selected';
                                                } ?>>Nguyên liệu</option>
                    <option value="donyeucau" <?php if (isset($_GET['search']) && $_GET['type'] == 'donyeucau') {
                                                    echo 'selected';
                                                } ?>>Đơn yêu cầu</option>
                    <option value="thanhpham" <?php if (isset($_GET['search']) && $_GET['type'] == 'thanhpham') {
                                                    echo 'selected';
                                                } ?>>Thành phẩm</option>
                </select>
                <input type="text" name="search" id="search" style="width: 60%;border:1px solid #cccc" value="<?php if (isset($_GET['search'])) {
                                                                                                                    echo $_GET['search'];
                                                                                                                } ?>" placeholder="Tìm kiếm nguyên liệu" />

            </form>
            <div class="content__inner">
                <table>
                    <tr class="muc">
                        <th>Mã </th>
                        <th>Tên nguyên liệu</th>
                        <th>Số lượng tồn</th>
                        <th>Đơn vị</th>
                        <th>Số lượng chờ nhập</th>
                        <th>Số lượng chờ xuất</th>
                        <th>Hành động</th>
                    </tr>
                    <?php
                    $tableName = 'sanpham';
                    if (isset($_GET['type']) && $_GET['type']  == 'nguyenlieu') {
                        $sql = "SELECT * FROM $tableName WHERE Loai = 'Nguyên liệu' AND TenSanPham like '%" . $_GET['search'] . "%'";
                    } elseif (isset($_GET['type']) && $_GET['type'] == 'thanhpham') {
                        $sql = "SELECT * FROM $tableName WHERE Loai = 'Thành phẩm' AND TenSanPham like '%" . $_GET['search'] . "%'";
                    } else {
                        $sql = "SELECT * FROM $tableName ";
                    }

                    $result = $conn->query($sql);
                    foreach ($result as $product) {
                        echo '<tr>
              <td>' . $product['MaSanPHam'] . '</td>
              <td>' . $product['TenSanPham'] . '</td>
              <td>' . $product['SoLuongTon'] . '</td>
              <td>' . $product['DonVi'] . '</td>
              <td>' . $product['SoLuongChoNhap'] . '</td>
              <td>' . $product['SoLuongChoXuat'] . "</td>
               <td>
                    <a href='chiTietNguyenLieu.php?id=" . $product['MaSanPHam'] . " ' class='btn primary center large'>
                    Xem
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