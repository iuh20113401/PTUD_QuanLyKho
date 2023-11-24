import { toExcel, toPDF, getFetch } from "./helper.js";
import { menu, menuShow, highLightMenu } from "./menu.js";

async function layToanBoNguyenLieu() {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "layToanBoNguyenLieu",
  });
  return data;
}

async function laySanPhamTheoTen(ten) {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "laySanPhamTheoTen",
    ten,
    loai: "Nguyên liệu",
  });
  return data;
}

async function layChiTietSanPham(maSanPham) {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "layChiTietSanPham",
    maSanPham,
  });
  return data;
}

let dsSanPham = await layToanBoNguyenLieu();
dsSanPham = dsSanPham.filter((sp) => sp.SoLuongTon > 0);
async function render(dsSanPhamMoi = null) {
  dsSanPham = dsSanPhamMoi
    ? dsSanPhamMoi
    : dsSanPham.sort((a, b) => b.SoLuongTon - a.SoLuongTon);
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
  sortDanhSachSanPham();
}
function contentToanBo() {
  let chiTietSanPham = dsSanPham
    ? dsSanPham
        .map((sp) => {
          return `<tr class='hover' id="${sp.MaSanPham}">
              <td>${sp.MaSanPham}</td>
              <td>${sp.TenSanPham}</td>
              <td>${sp.SoLuongTon}</td>
              <td>${sp.SoLuongChoXuat}</td>
              <td>${sp.SoLuongChoNhap}</td>
              <td>${sp.DonVi}</td>
            </tr>`;
        })
        .join("")
    : `<h3 class ="khongDon">Không có nguyên liệu nào!</h3`;
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
              <th class = 'slt'>Số lượng tồn</th>
              <th class = 'slcx'>Số lượng chờ xuất</th>
              <th class = 'slcn'>Số lượng chò nhập</th>
              <th>Đơn vị</th>
            </tr>
            ${chiTietSanPham}
          </table>
        </div>
      </div>`;
  return html;
}
function renderSort() {
  const content = document.querySelector(".content");
  let html = contentToanBo();
  const placeholder = document.createElement("div");
  placeholder.insertAdjacentHTML("afterbegin", html);
  const node = placeholder.firstElementChild;
  const container = document.querySelector(".container");
  container.replaceChild(node, content);
}
let sltRes = true;
let slcxRes = true;
let slcnRes = true;
function sortDanhSachSanPham() {
  document.body.addEventListener("click", (e) => {
    const slt = Array.from(e.target.classList).includes("slt");
    const slcx = Array.from(e.target.classList).includes("slcx");
    const slcn = Array.from(e.target.classList).includes("slcn");
    if (slt) {
      sltRes = !sltRes;
      sortSoLuongTon(!sltRes);
      renderSort();
    }
    if (slcx) {
      slcxRes = !slcxRes;
      sortSoLuongChoXuat(!slcxRes);
      renderSort();
    }
    if (slcn) {
      slcnRes = !slcnRes;
      sortSoLuongChoNhap(!slcnRes);
      renderSort();
    }
  });
}
function sortSoLuongChoNhap(slt) {
  console.log(slt);
  if (slt) {
    dsSanPham = dsSanPham.sort((a, b) => b.SoLuongChoNhap - a.SoLuongChoNhap);
  } else {
    dsSanPham = dsSanPham.sort((a, b) => a.SoLuongChoNhap - b.SoLuongChoNhap);
  }
  return;
}
function sortSoLuongChoXuat(slcx) {
  if (slcx) {
    dsSanPham = dsSanPham.sort((a, b) => b.SoLuongChoXuat - a.SoLuongChoXuat);
  } else {
    dsSanPham = dsSanPham.sort((a, b) => a.SoLuongChoXuat - b.SoLuongChoXuat);
  }
  console.log(dsSanPham);
  return;
}
function sortSoLuongTon(slcn) {
  if (slcn) {
    dsSanPham = dsSanPham.sort((a, b) => b.SoLuongTon - a.SoLuongTon);
  } else {
    dsSanPham = dsSanPham.sort((a, b) => a.SoLuongTon - b.SoLuongTon);
  }
  return;
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
        render();
      });
    });
  });
}
export default render;
export { dsSanPham };
