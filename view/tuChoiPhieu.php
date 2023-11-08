
<?php 
    $conn = new mysqli("localhost","son","123456","quanlykho");
    mysqli_set_charset($conn,"utf8"); 

    ?>
<?php
if (isset($_GET['MaDon'])) {
    $MaDon = $_GET['MaDon'];
    // Thực hiện cập nhật trạng thái của phiếu có MaDon tương ứng trong cơ sở dữ liệu
    $sql = "UPDATE donyeucau SET TrangThai = 'Từ chối' WHERE MaDon = '$MaDon'";
    if ( $conn->query($sql)) {
        // Cập nhật thành công, chuyển người dùng trở lại trang phieuNhap.php
        header("Location: phieuNhap.php");
        exit();
    } else {
        echo "Lỗi cập nhật trạng thái: " . $conn->error;
    }
}
?>
