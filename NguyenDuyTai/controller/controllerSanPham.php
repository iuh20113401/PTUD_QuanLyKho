<?php
include_once ("../model/modelSanPham.php");

class ControllerSanPham {
    public function xemNguyenLieu() {
        $model = new ModelSanPham();
        $nguyenLieuData = $model->getNguyenLieu();
        include_once ("../view/viewSanPham.php");
    }
}
?>
