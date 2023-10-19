"use strick";
function menu() {
  let html = `<div class="menu">
        <div class="image"></div>
        <div class="nav">
          <ul>
            <li><a href="#">Trang chủ</a></li>
            <li class="show">
              <p>Lập đơn yêu cầu <i class="fa-solid fa-angle-down"></i></p>
              <ul class="hidden">
                <li><a href="lapdonyeucaunhapNL.html">Nhập nguyên liệu</a></li>
                <li><a href="lapdonyeucauxuatNL.html">Xuất nguyên liệu</a></li>
                <li><a href="lapdonyeucaunhapTP.html">Nhập thành phẩm</a></li>
                <li><a href="lapdonyeucauxuatTP.html">Nhập thành phẩm</a></li>
              </ul>
            </li>
            <li><a href="#">Lập biên bản</a></li>
            <li class="show">
              <p>Phân phối <i class="fa-solid fa-angle-down"></i></p>
              <ul class="hidden">
                <li><a href="phanPhoiDonYeuCauNhap.html">Đơn yêu cầu nhập</a></li>
                <li><a href="phanPhoiDonYeuCauXuat.html">Đơn yêu cầu xuất</a></li>
              </ul>
            </li>
            <li><a href="xacNhanNhapKho.html">Nhập kho</a></li>
            <li><a href="xacNhanXuatKho.html">Xuất kho</a></li>
          </ul>
        </div>
      </div>
      `;
  return html;
}
function menuShow() {
  const show = document.querySelectorAll(".show");
  show.forEach((e) =>
    e.addEventListener("click", (e) => {
      const ul = e.target.closest("li").children;
      ul[1].classList.toggle("hidden");
    })
  );
}
export { menu, menuShow };
