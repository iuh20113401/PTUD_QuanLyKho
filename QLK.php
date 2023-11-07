

<!DOCTYPE html>
<html lang="en">
<?php 
    if($isset($_POST['them'])){
        quanLyKho::themTTK($maKho, $tenKho, $viTri, $sucChua, $soLuong,$loai,$moTa);
        echo "<script>alert('Thêm thành công');</script>";
        echo "<meta http-equiv='refresh' content='0; url=../php/danhsachkho.php'>";
    }
        



?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý thông tin kho</title>
    <link rel="stylesheet" href="../css/form.css">
    
    <script defer type="module" src="../js/quanLyKho.js" ></script>
</head>
<body>
    <div class="container">
        <div class="menu">
            <div class="image"></div>
            <div class="nav">
                <ul>
                    <li><a href="#">Trang chủ</a> </li>
                    <li><a href="#">
                        <p>Quản lý thông tin kho <i class="fa-solid fa-angle-down"></i></p>
                    </li>
                    <li><a href="xemTrangThaiDon.html">Xem trạng thái đơn yêu cầu</li>
                    <li><a href="congThuc.html">Công thức</li>
                </ul>
            </div>
        </div>
        <div class="content">
            <a href="#"> <h3>Phân phối > Quản lý thông tin kho</h3></a>
            <div class="content-table thongtin">
                <h3>QUẢN LÝ THÔNG TIN KHO</h3>
                <form action="#">
                    <table>
                        <tbody>
                            <tr class="TTkho">
                                <th id="id">Mã kho</th>
                                <th id="tenkho">Tên kho</th>
                                <th id="diachi">Địa chỉ</th>
                                <th id="succhua">Sức chứa</th>
                                <th id="soluong">Số lượng đã dùng</th>
                                <th id="loai">Loại kho</th>
                                <th id="mota">Mô tả</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Kho1</td>
                                <td>số 6, Lê Lợi</td>
                                <td>600</td>
                                <td>200</td>
                                <td>Nguyên liệu</td>
                                <td>abasdj </td>
                                <td>
                                    <div class="btn-kho">
                                        <button class=" sua" >
                                            <a href="suaThongTinKho.html">
                                                Sửa</a>
                                        </button>
                                        <button class="xoa">
                                            Xóa</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Kho1</td>
                                <td>số 6, Lê Lợi</td>
                                <td>600</td>
                                <td>200</td>
                                <td>Nguyên liệu</td>
                                <td>abasdj </td>
                                <td>
                                    <div class="btn-kho">
                                        <button class=" sua" >
                                            <a href="suaThongTinKho.html">
                                                Sửa</a>
                                        </button>
                                        <button class="xoa">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Kho1</td>
                                <td>số 6, Lê Lợi</td>
                                <td>600</td>
                                <td>200</td>
                                <td>Nguyên liệu</td>
                                <td>abasdj </td>
                                <td>
                                    <div class="btn-kho">
                                        <button class=" sua" >
                                            <a href="suaThongTinKho.html">
                                            Sửa</a>
                                        </button>
                                        <button class="xoa" name="xoabt">
                                            Xóa

                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="btn">
                        <button class="them" name="them" > THÊM</a></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
</body>
</html>