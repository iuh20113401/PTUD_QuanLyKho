<?php
function ngayHetHan($den_han, $gioi_han)
{
    // Lấy ngày hiện tại
    $today = new DateTime();

    // Chuyển đổi ngày hết hạn từ chuỗi sang đối tượng DateTime
    $expirationDateObj = new DateTime($den_han);

    // So sánh ngày hết hạn với ngày hiện tại
    if ($today > $expirationDateObj) {
        return "het_han";
    } elseif ($today == $expirationDateObj) {
        return "het_han";
    } elseif ($today <= $expirationDateObj && $today->diff($expirationDateObj)->days <= 7) {
        return "sap_het_han";
    } else {
        return false;
    }
}
