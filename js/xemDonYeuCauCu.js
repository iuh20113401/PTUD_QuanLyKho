"use strict";
import { menu, menuShow, highLightMenu } from "./menu.js";
import { toExcel, toPDF } from "./helper.js";
async function layDanhSachDonYeuCauCu() {
  const data = await getFetch("../ajax/xemDonYeuCauCu.php", {
    action: "layDonYeuCauCuTheoTaiKhoan",
    maTaiKhoan: 1,
  });
  return data;
}

async function layChiTietNguyenLieu(maDon) {
  const data = await getFetch("../ajax/xemDonYeuCauCu.php", {
    action: "layChiTietNguyenLieu",
    maDon: maDon,
  });
  return data;
}

const dsDon = await layDanhSachDonYeuCauCu();
dsDon;
function render(chiTietNguyenLieu = null, thanhPham, loai = "Don") {
  let html;
  if (loai === "Don") {
    html =
      chiTietNguyenLieu !== null
        ? contentChiTiet(chiTietNguyenLieu, thanhPham)
        : content();
  }
  if (loai === "PhieuNhap") {
    html =
      chiTietNguyenLieu !== null
        ? contentChiTietPhieuNhap(chiTietNguyenLieu, thanhPham)
        : contentPhieuNhap();
  }
  if (loai === "PhieuXuat") {
    html =
      chiTietNguyenLieu !== null
        ? contentChiTietPhieuXuat(chiTietNguyenLieu, thanhPham)
        : contentPhieuXuat();
  }
  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  highLightMenu();
}

function content() {
  let html = `        
        <div class="content">
         <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
          <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
          <div class='buttons'>
            <button class="btn" id="XemDon">Đơn yêu cầu</button>
            <button class="btn" id="XemPhieuNhap">Phiếu nhập kho</button>
            <button class="btn" id="XemPhieuXuat">Phiếu xuất kho</button>
          </div>
         <div class="content__inner">
            <table>
              <tr class="muc">
                <th>Mã đơn</th>
                <th>Tên đơn</th>
                <th>Người lập</th>
                <th>Ngày lập</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
              ${dsDon
                .map((don) => {
                  return `<tr>
                <td>${don.MaDon}</td>
                <td>${don.TenLoai}</td>
                <td>${don.MaTaiKhoan}</td>
                <td>${don.NgayLap}</td>
                <td class="center">${don.TrangThai}</td>
                <td><button class="btn primary center large xem" id = ${don.MaDon}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>
         </div>
        </div>`;
  return html;
}
function contentChiTiet(chiTiet, thanhPham = false) {
  let dsNguyenLieu = `<table class="small">
            <tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
              <th>Đơn vị</th>
              ${
                thanhPham
                  ? ` <th>Ngày sản xuất</th>
              <th>Ngày hết hạn</th>`
                  : ""
              }
            </tr>
            ${chiTiet.NguyenLieu.map((e) => {
              return `<tr>
              <td>${e.TenSanPham}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
              ${
                thanhPham
                  ? `<td>${e.NgaySanXuat}</td>
                  <td>${e.NgayHetHan}</td>`
                  : ""
              }
            </tr>`;
            }).join("")}
          </table>
          `;

  let html = `<div class="content">
        <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
        <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        <div class="content__inner chitiet">
          <div id="in">
          <h3>${chiTiet.TenLoai}</h3>
          <p><strong class="deMuc">Mã đơn:</strong>${chiTiet.MaDon}</p>
          <p><strong class="deMuc">Tên đơn:</strong>${chiTiet.TenLoai}</p>
          <p><strong class="deMuc">Người lập:</strong>${chiTiet.MaTaiKhoan}</p>
          <p><strong class="deMuc">Ngày lập:</strong>${chiTiet.NgayLap}</p>
          <p><strong class="deMuc">Trạng Thai: </strong>${chiTiet.TrangThai}</p>
          <p><strong class="deMuc">Danh sách yêu cầu:</strong></p>
          ${dsNguyenLieu}
          </div>
          <div class="buttons">
            <button class="btn primary" id="pdf">Xuất dưới dạng pdf</button>
            <button class="btn success" id = "excel">Xuất dưới dạng pdf</button>
            <button class="btn secondary small" id ="quayLai">Quay lại</button>
          </div>
        </div>
      </div>`;
  return html;
}

async function renderChiTiet(id) {
  let chitiet = await layDon(id);
  if (chitiet.Loai === 3) render(chitiet, true);
  else render(chitiet, false);
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    initDon();
  });
  toExcel(chitiet.TenLoai);
  toPDF(chitiet.TenLoai);
}

function initDon() {
  render();
  init();
  const btnXem = document.querySelectorAll(".xem");
  btnXem.forEach((e) =>
    e.addEventListener("click", async (e) => {
      const id = e.target.id;
      await renderChiTiet(id);
    })
  );
}

function init() {
  const btnPhieuNhapKho = document.querySelector("#XemPhieuNhap");
  const btnPhieuXuatKho = document.querySelector("#XemPhieuXuat");
  const btnDonYeuCau = document.querySelector("#XemDon");
  btnDonYeuCau.addEventListener("click", initDon);
  btnPhieuNhapKho.addEventListener("click", initPhieuNhap);
  btnPhieuXuatKho.addEventListener("click", initPhieuXuat);
}
async function layDon(id) {
  const chiTiet = dsDon.filter((e) => e.MaDon == id)[0];
  chiTiet.NguyenLieu = await layChiTietNguyenLieu(id);
  return chiTiet;
}

initDon();
