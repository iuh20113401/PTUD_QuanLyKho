<?php
$conn = new mysqli("localhost", "son", "123456", "quanlykho");
mysqli_set_charset($conn, "utf8");

?>

<?php
if (isset($_POST["themNguyenVatLieu"])) {
    $MaSanPHam = $_POST['MaSanPHam'];
    $TenSanPham = $_POST['TenSanPham'];
    $SoLuongTon = $_POST['SoLuongTon'];
    $DonVi = $_POST['DonVi'];
    $Loai = " Nguyên vật liệu";


    if ($TenSanPham == "") {
        echo "Vui lòng nhập vào Tên sản phẩm! <br/>";
    }
    if ($SoLuongTon == "") {
        echo "Vui lòng nhập vào Số lượng! <br/>";
    }
    if ($DonVi == "") {
        echo "Vui lòng nhập vào Đơn vị! <br/>";
    }

    if ($TenSanPham != "" && $SoLuongTon != "" && $DonVi != "") {
        $sql = "INSERT INTO sanpham (MaSanPHam, TenSanPham, SoLuongTon, DonVi,  Loai) VALUES ('$MaSanPHam', ' $TenSanPham', ' $SoLuongTon', ' $DonVi', ' $Loai' )";
        $result = $conn->query($sql);
        header("location: nguyenVatLieu.php");
    } else {
        echo "Lỗi: " . mysqli_error($conn);
    }
}
mysqli_close($conn);

?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quản lý nguyên vật liệu</title>

    <link rel="stylesheet" href="../css/bootstrap.css" />
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
    <link rel="stylesheet" href="../fontawesome-free-6.2.0-web/css/all.css" />
    <link rel="stylesheet" href="../css/phieuNhap.css" />
    <link rel="stylesheet" href="../css/nguyenVatLieu.css">
    <link rel="stylesheet" href="../css/themNguyenVatLieu.css">

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
                            <a class="sub-item" href="phieuNhap.php">Phiếu nhập</a>
                            <a class="sub-item" href="phieuXuat.php">Phiếu xuất</a>
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
                    <h3>Quản lý nguyên vật liệu/thành phẩm > Nguyên vật liệu > Thêm nguyên vật liệu</h3>
                </a>
            </div>
            <div class="khung">
                <div class="content-table thongtin">
                    <h3>THÊM NGUYÊN VẬT LIỆU</h3>
                    <form class="form" method="POST" action="">
                        <div class="form-group">
                            <label for="Mã nguyên liệu">Mã nguyên liệu:</label>
                            <input type="text" class="form-control" id="MaSanPHam" name="MaSanPHam">
                        </div>
                        <div class="form-group">
                            <label for="Tên nguyên liệu">Tên nguyên liệu:</label>
                            <input type="text" class="form-control" id="TenSanPham" name="TenSanPham">
                        </div>
                        <div class="form-group">
                            <label for="Số lượng tồn">Số lượng :</label>
                            <input type="text" class="form-control" id="SoLuongTon" name="SoLuongTon">
                        </div>

                        <div class="form-group">
                            <label for="Đơn vị">Đơn vị:</label>
                            <input type="text" class="form-control" id="DonVi" name="DonVi">
                        </div>
                        <div class="form-group">
                            <label for="Đơn vị">Loại:</label>
                            <input type="text" class="form-control" id="Loai" name="Loai" value="Nguyên vật liệu" disabled>
                        </div>
                        <button class="btn btn-danger "> <a href="nguyenVatLieu.php">Hủy</a></button>
                        <button class="btn btn-success " name="themNguyenVatLieu" value="Thêm">Thêm</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
</body>

</html>