<?php
session_start();

require_once '../dompdf/autoload.inc.php'; // Đảm bảo rằng bạn đã include thư viện Dompdf

use Dompdf\Dompdf;
use Dompdf\Options;
if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    $html = $_POST['html'];
    $title = $_POST['title'];
    switch($action) {
        case 'viewAll':
            convertToPDF( $html , $title);
            break;
        // Thêm các trường hợp khác nếu cần
    }
}
function convertToPDF($htmlContent, $outputFilename){
    // Khởi tạo các tùy chọn
    $options = new Options();
    $options->set('isHtml5ParserEnabled', true);
    $options->set('isPhpEnabled', true);
    $options->set('defaultFont', 'DejaVu Sans');
    $options->set('isFontSubsettingEnabled', true);
    $options -> set('fontDir', '../vendor/dompdf/dompdf/lib/font/DejaVuSans-Bold.ttf');
    $dompdf = new Dompdf($options);


    // Tải nội dung HTML
    $dompdf->loadHtml($htmlContent);

    // Cấu hình kích thước và hướng của trang
    $dompdf->setPaper('A4', 'portrait');

    // Render PDF
    $dompdf->render();

    // Lưu PDF vào file hoặc hiển thị trên trình duyệt
    $dompdf->stream($outputFilename);
}
