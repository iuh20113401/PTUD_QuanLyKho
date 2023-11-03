<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../css/xemNguyenLieu.css">
</head>
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
                            include_once ("../view/viewSanPham.php");
                            
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
