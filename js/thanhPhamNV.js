<<<<<<< HEAD
<<<<<<< HEAD
import { toExcel, toPDF, getFetch } from "./helper.js";
import { menu, menuShow, highLightMenu } from "./menu.js";

async function layToanBoThanhPham() {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "layToanBoThanhPham",
  });
  return data;
}

async function laySanPhamTheoTen(ten) {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "laySanPhamTheoTen",
    ten,
    loai: "Thành phẩm",
=======
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
import { toExcel, toPDF } from "./helper.js";
import { menu, menuShow, highLightMenu } from "./menu.js";

async function layToanBoThanhPham() {
  let data;
  await $.ajax({
    url: "../ajax/sanPham.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layToanBoThanhPham",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function laySanPhamTheoTen(ten) {
  let data;
  await $.ajax({
    url: "../ajax/sanPham.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "laySanPhamTheoTen",
      ten,
      loai: "Thành phẩm",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
<<<<<<< HEAD
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
  });
  return data;
}
async function layChiTietSanPham(maSanPham) {
<<<<<<< HEAD
<<<<<<< HEAD
  const data = await getFetch("../ajax/sanPham.php", {
    action: "layChiTietSanPham",
    maSanPham,
=======
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
  let data;
  await $.ajax({
    url: "../ajax/sanPham.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layChiTietSanPham",
      maSanPham,
    },
    success: function (response) {
      response;
      data = JSON.parse(response);
    },
<<<<<<< HEAD
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
  });
  return data;
}

let dsSanPham = await layToanBoThanhPham();
async function render(load = null) {
  load ? (dsSanPham = await layToanBoNguyenLieu()) : null;
  let html = contentToanBo();

  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  highLightMenu();
  renderSearch();
  renderChiTiet();
}
function contentToanBo() {
  let chiTietSanPham = dsSanPham
    ? dsSanPham
        .map((sp) => {
          return `<tr class='hover' id="${sp.MaSanPham}">
              <td>${sp.MaSanPham}</td>
              <td>${sp.TenSanPham}</td>
              <td>${sp.SoLuongTon}</td>
              <td>${sp.SoLuongChoNhap}</td>
              <td>${sp.SoLuongChoXuat}</td>
              <td>${sp.DonVi}</td>
            </tr>`;
        })
        .join("")
    : `<h3 class ="khongDon">Không có đơn yêu cầu nào!</h3`;
  let html = `<div class="content">
       <h3>Sản phẩm > <a href="thanhPham.html">Thành phẩm</a></h3>
        <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        <div class="content__inner">
          <table>
            <tr class="muc">
              <th>Mã thành phẩm</th>
              <th>Tên thành phẩm</th>
              <th>Số lượng tồn</th>
<<<<<<< HEAD
<<<<<<< HEAD
              <th>Số lượng chờ nhập</th>
              <th>Số lượng chò xuất</th>
=======
              <th>Số lượng chờ xuất</th>
              <th>Số lượng chò nhập</th>
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
              <th>Số lượng chờ xuất</th>
              <th>Số lượng chò nhập</th>
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
              <th>Đơn vị</th>
            </tr>
            ${chiTietSanPham}
          </table>
        </div>
      </div>`;
  return html;
}
function renderSearch() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ten = document.querySelector("input").value;
    dsSanPham = await laySanPhamTheoTen(ten);
    await render();
  });
}

function contentChitiet(dsChiTietSanPham) {
  let htmlDsChiTietSanPham = dsChiTietSanPham
    ? dsChiTietSanPham
        .map((sp) => {
          return `<tr class = 'hover' id="${sp.MaSanPham}">
              <td>${sp.MaChiTietSanPham}</td>
              <td>${sp.MaSanPham}</td>
              <td>${sp.TenSanPham}</td>
              <td>${sp.SoLuongTon}</td>
              <td>${sp.NgaySanXuat}</td>
              <td>${sp.NgayHetHan}</td>
              <td>${sp.SoLuongChoXuat}</td>
              <td>${sp.DonVi}</td>
            </tr>`;
        })
        .join("")
    : null;
  let html = `
      <h3>Sản phẩm > <a href="thanhPham.html">Thành phẩm</a> > ${
        dsChiTietSanPham ? dsChiTietSanPham[0].TenSanPham : ""
      }</h3>
        <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
            <button class="btn secondary" id="quayLai">Quay lại</button>
          </form>
        <div class="content__inner">
          ${
            dsChiTietSanPham
              ? `<table>
            <tr class="muc">
              <th>Mã chi tiết thành phẩm</th>
              <th>Mã thành phẩm</th>
              <th>Tên thành phẩm</th>
              <th>Số lượng tồn</th>
              <th>Ngày sản xuất</th>
              <th>Ngày hết hạn</th>
              <th>Số lượng chò nhập</th>
              <th>Đơn vị</th>
            </tr>
            ${htmlDsChiTietSanPham}
          </table>`
              : `<h3 class ="khongDon">Không có sản phẩm nào!</h3>
<<<<<<< HEAD
<<<<<<< HEAD
                <a href="thanhPham.html" class="noDecoration"><button class = 'btn primary center'> Quay lại</button></a>
=======
                <a href="nguyenLieu.html" class="noDecoration"><button class = 'btn primary center'> Quay lại</button></a>
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
                <a href="nguyenLieu.html" class="noDecoration"><button class = 'btn primary center'> Quay lại</button></a>
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
              `
          }    
      </div>`;
  return html;
}
function renderChiTiet() {
  const sanPham = document.querySelectorAll(".hover");
  sanPham.forEach((sp) => {
    sp.addEventListener("click", async (e) => {
      if (e.target.id === "sua" || e.target.id === "xoa") return;
      const dsChiTietSanPham = await layChiTietSanPham(sp.id);
      document.querySelector(".content").innerHTML =
        contentChitiet(dsChiTietSanPham);
      const quayLai = document.querySelector("#quayLai");
      quayLai.addEventListener("click", (e) => {
        window.location.reload();
      });
    });
  });
}
export default render;
export { dsSanPham };
