"use strict";
import { MAVAITRO, menu, menuShow, highLightMenu } from "./menu.js";
import { toExcel, toPDF, getFetch } from "./helper.js";

async function layBienBan() {
  let data = await getFetch("../ajax/bienBan.php", {
    action: "layBienBan",
  });
  return data;
}

async function layChiTietBienBan(maBienBan) {
  let data = await getFetch("../ajax/bienBan.php", {
    action: "layChiTietBienBan",
    maBienBan,
  });
  return data;
}

let dsBienBan;
function render(chiTietNguyenLieu = null) {
  let html =
    chiTietNguyenLieu !== null ? contentChiTiet(chiTietNguyenLieu) : content();
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
          <form class="search" >
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
         <div class="content__inner">
          ${
            !dsBienBan.length
              ? `<h3 class ="khongDon">Không có đơn yêu cầu nào!</h3>`
              : `<table>
              <tr class="muc">
                <th>Mã biên bản</th>
                <th>Mã đơn</th>
                <th>Người lập</th>
                <th>Ngày lập</th>
                <th>Lý do</th>
                <th>Hành động</th>
              </tr>
              
              ${dsBienBan
                .map((bb) => {
                  return `<tr>
                <td>${bb.MaBienBan}</td>
                <td>${bb.MaDon}</td>
                <td>${bb.TenDangNhap}</td>
                <td>${bb.NgayLap}</td>
                <td class="center">${bb.LyDo}</td>
                <td><button class="btn primary center large" id = ${bb.MaBienBan}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>`
          }
            
         </div>
        </div>`;
  return html;
}
function contentChiTiet(chiTiet) {
  let dsChiTiet = chiTiet.chitiet;
  let dsNguyenLieu = `<table class="small"><tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
              <th>Đơn vị</th>
              <th>${dsChiTiet[0].NgaySanXuat ? `Ngày sản xuất` : ""}</th>
              <th>${dsChiTiet[0].NgayHetHan ? `Ngày hết hạn` : ""}</th>
              ${dsChiTiet[0].ViTriKho ? "<th>Kho</th>" : ""}
            </tr>
            ${dsChiTiet
              .map((e) => {
                return `<tr>
              <td>${e.TenSanPham}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
              <td>
                ${e.NgaySanXuat != null ? e.NgaySanXuat : ``}
              </td>
              <td> ${e.NgayHetHan != null ? e.NgayHetHan : ``}</td>
              
              ${e.ViTriKho ? `<td>${e.ViTriKho}</td>` : ``}
              
            </tr>`;
              })
              .join("")}
          </table>
          <p class="alert hidden"></p>
`;
  let html = `<div class="content">
        <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập > ${chiTiet.MaBienBan}</h3></a>
        <form class="search"  >
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        <div class="content__inner chitiet">
            <div id="in">
          <h3>Chi tiết biên bản </h3>
          
          <p class = 'maDon'id = ${chiTiet.MaBienBan}><span class="deMuc">Mã biên bản:</span>${chiTiet.MaBienBan}</p>
          <p class = 'maDon'id = ${chiTiet.MaDon}><span class="deMuc">Mã đơn:</span>${chiTiet.MaDon}</p>
          <p><span class="deMuc">Người lập đơn:</span>${dsChiTiet[0].TenDangNhap}</p>
          <p><span class="deMuc">Người lập biên bản:</span>${chiTiet.TenDangNhap}</p>
          <p><span class="deMuc">Ngày lập biên bản:</span>${chiTiet.NgayLap}</p>
          <p><span class="deMuc">TrangThai:</span>${dsChiTiet[0].TrangThai}</p>
          <p><span class="deMuc">Lý do:</span>${chiTiet.LyDo}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieu}
        </div>
            <div class="buttons">
              <button class="btn primary" id="pdf">Xuất dưới dạng pdf</button>
              <button class="btn success" id = "excel">Xuất dưới dạng pdf</button>
              <button type="button" class="btn secondary " id = "quayLai">Quay lại</button>
          </div>
        </div>
      </div>`;
  return html;
}
async function layDon(id) {
  const chiTiet = await layChiTietBienBan(id);
  return chiTiet;
}
async function renderChiTiet(id) {
  let chitiet = await layDon(id);
  let chiTietBienBan = dsBienBan.filter((bb) => bb.MaBienBan == id)[0];
  chitiet = { ...chiTietBienBan, chitiet: chitiet };
  render(chitiet);
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    init(dsBienBan);
  });
}

async function init(dsDonMoi, trangThai = null) {
  dsBienBan = dsDonMoi ? dsDonMoi : await layBienBan();
  render(null, trangThai);
  const btnXem = document.querySelectorAll("button");
  btnXem.forEach((e) =>
    e.addEventListener("click", (e) => {
      const id = e.target.id;
      renderChiTiet(id);
    })
  );
}
init();
