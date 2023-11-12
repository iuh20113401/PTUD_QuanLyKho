import { toExcel, toPDF } from "./helper.js";
import { menu, menuShow, highLightMenu } from "./menu.js";

async function layToanBoNguyenLieu() {
  let data;
  await $.ajax({
    url: "../ajax/sanPham.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layToanBoNguyenLieu",
    },
    success: function (response) {
      console.log(response);
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
      loai: "Nguyên liệu",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function layChiTietSanPham(maSanPham) {
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
  });
  return data;
}
let dsSanPham = await layToanBoNguyenLieu();
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
       <h3>Sản phẩm > <a href="nguyenLieu.html">Nguyên Liệu</a></h3>
        <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        <div class="content__inner">
          <table>
            <tr class="muc">
              <th>Mã nguyên liệu</th>
              <th>Tên nguyên liệu</th>
              <th>Số lượng tồn</th>
              <th>Số lượng chờ xuất</th>
              <th>Số lượng chò nhập</th>
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
      <h3>Sản phẩm > <a href="nguyenLieu.html">Nguyên liệu</a> > ${
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
              <th>Mã chi tiết nguyên liệu</th>
              <th>Mã nguyên liệu</th>
              <th>Tên nguyên liệu</th>
              <th>Số lượng tồn</th>
              <th>Ngày sản xuất</th>
              <th>Ngày hết hạn</th>
              <th>Số lượng chò xuất</th>
              <th>Đơn vị</th>
            </tr>
            ${htmlDsChiTietSanPham}
          </table>`
              : `<h3 class ="khongDon">Không có sản phẩm nào!</h3>
                <a href="nguyenLieu.html" class="noDecoration"><button class = 'btn primary center'> Quay lại</button></a>
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
