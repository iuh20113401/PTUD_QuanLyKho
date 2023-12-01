"use strict";
import { getFetch } from "./helper.js";
window.addEventListener("load", checkAccessAndRedirect);

async function getSession() {
  let data = await getFetch("../ajax/session.php", {
    action: "getSession",
  });
  return data;
}
const MAVAITRO = await getSession();
function menu() {
  let html;
  switch (MAVAITRO) {
    case 1:
      html = menuGD();
      break;

    case 2:
      html = menuQLKho();
      break;

    case 3:
      html = menuNVKho();
      break;

    case 4:
      html = menuBPSX();
      break;
    case 5:
      html = menuBPBH();
      break;
    default:
      html = menuBPKK();
      break;
  }
  return html;
}
function menuShow() {
  const show = document.querySelectorAll(".show");
  show.forEach((e) =>
    e.addEventListener("click", (e) => {
      const ul = e.target.closest("ul").children;
    })
  );
}
function highLightMenu() {
  let url = window.location.pathname;
  url = url.split("/");
  const pathUrl = url[url.length - 1];
  const menu = document.querySelector(".menu");
  const aPath = menu.querySelectorAll("a");
  aPath.forEach((ap) => {
    const aURL = ap.href.split("/");
    if (aURL[aURL.length - 1] === pathUrl) {
      const show = document.querySelectorAll(".show");
      show.forEach((element) => {
        element.querySelector("ul").classList.add("hiddenDiv");
      });
      ap.classList.add("active");
      const ulEl = ap.closest("ul");
      ulEl.classList.remove("hiddenDiv");
      if (ulEl.matches(".show__inner")) {
        ulEl.style = "display: block !important";
      }
    }
  });
}
function menuGD() {
  return `
  <div class ="menu">
      <div class="image"></div>
        <div class="nav">
          <ul>
            <li><a href="baoCao.html">Trang chủ</a></li>
            <div class="show">
              <li><p>Sản phẩm <i class="fa-solid fa-angle-down"></i></p></li>
              <ul class= "show__inner hiddenDiv">
                <li><a href="nguyenLieu.html">Nguyên liệu</a></li>
                <li><a href="thanhPham.html">Thành phẩm</a></li>
                <li><a href="canhBao.html">Sản phẩm hết hạn</a></li>
                <li><a href="lapdonyeucaunhapNL.html">Lập đơn yêu cầu nhập nguyên liệu</a></li>
              </ul>
            </div>
            <li><a href="donYeuCau.html">Đơn yêu cầu</a></li>
            <li><a href="bienBan.html">Biên bản</a></li>
            <li><a href="kiemKe.html">Kiểm kê</a></li>
            <li><a href="congThuc.html">Công thức</a></li>
            <li><a href="kho.html">Kho</a></li>
            <li><a href="taiKhoan.html">Tài khoản</a></li>
          </ul>
  </div>
  </div>
      `;
}
function menuQLKho() {
  return `
    <div class ="menu">
        <div class="image"></div>
        <div class="nav">
          <ul>
          <div class="show">
              <li><p>Sản phẩm <i class="fa-solid fa-angle-down"></i></p></li>
              <ul class= "show__inner hiddenDiv">
                <li><a href="nguyenLieu.html">Nguyên liệu</a></li>
                <li><a href="thanhPham.html">Thành phẩm</a></li>
              </ul>
            </div>
            <div class="show">
              <li> <p>Phân phối <i class="fa-solid fa-angle-down"></i></p></li>
              <ul class="show__inner hiddenDiv">
                <li><a href="phanPhoiDonYeuCauNhap.html">Đơn yêu cầu nhập</a></li>
                <li><a href="phanPhoiDonYeuCauXuat.html">Đơn yêu cầu xuất</a></li>
              </ul>
            </div>
            <li><a href="phieuNhap.html">Phiếu nhập</a></li>
            <li><a href="phieuXuat.html">Phiếu xuất</a></li>
            <li><a href="bienBan.html">Biên bản</a></li>
            <li><a href="kho.html">Kho</a></li>
            <li><a href="capTaiKhoan.html">Cấp tài khoản</a></li>
            <li><a href="taiKhoan.html">Tài khoản</a></li>
          </ul>
        </div>
        </div>
      `;
}
function menuNVKho() {
  return `
  <div class='menu'>
        <div class="image"></div>
        <div class="nav">
          <ul>
            <div class="show">
              <li><p>Sản phẩm <i class="fa-solid fa-angle-down"></i></p></li>
              <ul class= "show__inner hiddenDiv">
                <li><a href="nguyenLieu.html">Nguyên liệu</a></li>
                <li><a href="thanhPham.html">Thành phẩm</a></li>
              </ul>
            </div>
            <li><a href="xacNhanNhapKho.html">Nhập kho</a></li>
            <li><a href="xacNhanXuatKho.html">Xuất kho</a></li>
            <li><a href="tieuHuy.html">Tiêu hủy</a></li>
            <li><a href="taiKhoan.html">Tài khoản</a></li>
          </ul>
        </div>
        </div>
      `;
}
function menuBPKK() {
  return `
  <div class ="menu">
        <div class="image"></div>
        <div class="nav">
          <ul>
          <div class="show">
              <li><p>Sản phẩm <i class="fa-solid fa-angle-down"></i></p></li>
              <ul class= "show__inner hiddenDiv">
                <li><a href="nguyenLieu.html">Nguyên liệu</a></li>
                <li><a href="thanhPham.html">Thành phẩm</a></li>
              </ul>
            </div>
            <li><a href='kiemKe.html'>Biên bản kiểm kê</a></li>
            <li><a href="taiKhoan.html">Tài khoản</a></li>
          </ul>
        </div>
</div>
      `;
}
function menuBPSX() {
  return `
  <div class ="menu">
        <div class="image"></div>
        <div class="nav">
          <ul>
          <div class="show">
              <li><p>Sản phẩm <i class="fa-solid fa-angle-down"></i></p></li>
              <ul class= "show__inner hiddenDiv">
                <li><a href="nguyenLieu.html">Nguyên liệu</a></li>
                <li><a href="thanhPham.html">Thành phẩm</a></li>
              </ul>
            </div>
            <li><a href='donYeuCau.html'>Đơn yêu cầu</a></li>
            <div class="show">
              <li><p>Lập đơn yêu cầu <i class="fa-solid fa-angle-down"></i></p></li>
              <ul class="show__inner hiddenDiv">
                <li><a href="lapdonyeucauxuatNL.html">Xuất nguyên liệu</a></li>
                <li><a href="lapdonyeucaunhapTP.html">Nhập thành phẩm</a></li>
              </ul>
            </div>
            <li><a href="taiKhoan.html">Tài khoản</a></li>
          </ul>
        </div>
        </div>
      `;
}
function menuBPBH() {
  return `
  <div class ="menu">
        <div class="image"></div>
        <div class="nav">
          <ul>
          <li class="">
              <a href="thanhPham.html">Thành phẩm</a>
          </li>
            <li><a href='donYeuCau.html'>Đơn yêu cầu</a></li>
           <div class="show">
              <li><p>Lập đơn yêu cầu <i class="fa-solid fa-angle-down"></i></p></li>
              <ul class="show__inner hiddenDiv">
                <li><a href="lapdonyeucauxuatTP.html">Xuất thành phẩm</a></li>
                <li><a href="lapdonYeuCauTraHang.html">Trả hàng</a></li>
              </ul>
            </div>
            <li><a href="taiKhoan.html">Tài khoản</a></li>
          </ul>
        </div>
        </div>
      `;
}
// Role to accessible pages mapping
const rolePages = {
  1: [
    "baoCao.html",
    "canhBao.html",
    "donYeuCau.html",
    "lapdonyeucaunhapNL.html",
    "bienBan.html",
    "kiemKe.html",
    "nguyenLieu.html",
    "thanhPham.html",
    "congThuc.html",
    "kho.html",
    "taiKhoan.html",
  ],
  2: [
    "nguyenLieu.html",
    "canhBao.html",
    "thanhPham.html",
    "capTaiKhoan.html",
    "phanPhoiDonYeuCauNhap.html",
    "phanPhoiDonYeuCauXuat.html",
    "phieuNhap.html",
    "phieuXuat.html",
    "taiKhoan.html",
    "bienBan.html",
    "kho.html",
  ],
  3: [
    "nguyenLieu.html",
    "thanhPham.html",
    "xacNhanNhapKho.html",
    "xacNhanXuatKho.html",
    "tieuHuy.html",
    "taiKhoan.html",
  ],
  4: [
    "nguyenLieu.html",
    "thanhPham.html",
    "donYeuCau.html",
    "lapdonyeucauxuatNL.html",
    "lapdonyeucaunhapTP.html",
    "taiKhoan.html",
  ],
  5: [
    "thanhPham.html",
    "donYeuCau.html",
    "lapdonyeucauxuatTP.html",
    "lapdonYeuCauTraHang.html",
    "taiKhoan.html",
  ],
  6: [
    "nguyenLieu.html",
    "thanhPham.html",
    "donYeuCau.html",
    "taiKhoan.html",
    "kiemKe.html",
  ],
  // Add other roles and their accessible pages here
};

// Function to check if the user has access to the current page
async function checkAccessAndRedirect() {
  const userRole = await getSession();
  const currentPage = window.location.pathname.split("/").pop();
  if (!userRole) {
    window.location.href = `../index.html`;
    return;
  }
  if (!rolePages[userRole].includes(currentPage)) {
    let href;
    switch (userRole) {
      case 1:
        href = "baoCao.html";
        break;
      case 2:
        href = "phanPhoiDonYeuCauNhap.html";
        break;
      case 3:
        href = "nhapKho.html";
        break;
      case 4:
        href = "nguyenLieu.html";
        break;
      case 5:
        href = "nguyenLieu.html";
        break;
      case 6:
        href = "nguyenLieu.html";
        break;
      default:
        href = "../index.html";
        break;
    }
    window.location.href = `${href}`;
  }
}
export { menu, MAVAITRO, menuShow, highLightMenu };
