<?php
include_once ("../model/modelSanPham.php");

class ControllerSanPham {
    public function xemNguyenLieu() {
        $model = new ModelSanPham();
        $nguyenLieuData = $model->getNguyenLieu();
        include_once ("../view/viewNguyenLieu.php");
        return $nguyenLieuData;
        
    }

    public function xemThanhPham() {
        $model = new ModelSanPham();
        $thanhPhamData = $model->getThanhPham();
        include_once ("../view/viewThanhPham.php");
        return $thanhPhamData;
        
    }
}
?>
