"use strict";
import { menu, menuShow, highLightMenu } from "./menu.js";
import { getFetch, modalThongBao, taiKhoan } from "./helper.js";
async function layDanhSachPhieuXuat() {
  const data = await getFetch("../ajax/xuatKho.php", {
    action: "layPhieuXuatKhoChoXuat",
    maKho: taiKhoan[4],
  });
  return data;
}

async function layChiTietPhieuXuat(maPhieu) {
  const data = await getFetch("../ajax/xuatKho.php", {
    action: "layChiTietPhieuXuat",
    maPhieu: maPhieu,
  });
  return data;
}

async function xacNhanXuatKho(phieu) {
  const data = await getFetch("../ajax/xuatKho.php", {
    action: "xacNhanXuatKho",
    maPhieu: phieu.MaPhieu,
    maDon: phieu.MaDon,
  });
  return data;
}

let dsPhieu;
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
         <a href="#"> <h3>Xuất kho</h3></a>
         <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
         <div class="content__inner">
         ${
           dsPhieu.length
             ? `<table>
              <tr class="muc">
                <th>Mã Phiếu</th>
                <th>Mã đơn</th>
                <th>Tên đơn</th>
                <th>Người lập</th>
                <th>Ngày lập</th>
                <th>Số lượng nguyên liệu</th>
                <th>Hành động</th>
              </tr>
              ${dsPhieu
                .map((phieu) => {
                  return `<tr>
                <td>${phieu.MaPhieu}</td>
                <td>${phieu.MaDon}</td>
                <td>${phieu.TenLoai}</td>
                <td>${phieu.MaTaiKhoan}</td>
                <td>${phieu.NgayLap}</td>
                <td class="center">${phieu.soluongnguyenlieu}</td>
                <td><button class="btn primary center large" id = ${phieu.MaPhieu}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>`
             : "<h3 class='khongDon'>Không có đơn yêu cầu nào!</h3>"
         }
            
         </div>
        </div>`;
  return html;
}
function contentChiTiet(chiTiet) {
  let dsNguyenLieu = `<table class="small">
            <tr>
              <th>Mã chi tiết sản phẩm</th>
              <th>Tên nguyên liệu</th>
              <th>Số lượng</th>
              <th>Đơn vị</th>
            </tr>
            ${chiTiet.NguyenLieu.map((e) => {
              return `<tr>
              <td>${e.MaChiTietSanPham}</td>
              <td>${e.TenSanPham}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
            </tr>`;
            }).join("")}
          </table>
          <div class="buttons">
            <button class="btn primary" id="xacNhan">Xác nhận nhập kho</button>
            <button class="btn secondary small" id = "quayLai">Quay lại</button>
          </div>`;
  let html = `<div class="content">
        <a href="#"> <h3>Xuất kho</h3></a>
        <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        </form>
        <div class="content__inner chitiet">
          <h3>${chiTiet.TenLoai}</h3>
          <p><span class="deMuc">Mã đơn:</span>${chiTiet.MaDon}</p>
          <p><span class="deMuc">Tên đơn:</span>${chiTiet.TenLoai}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.MaTaiKhoan}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieu}
        </div>
      </div>`;
  return html;
}
async function layPhieu(maPhieu) {
  const newPhieu = dsPhieu.filter((dp) => dp.MaPhieu == maPhieu)[0];
  newPhieu.NguyenLieu = await layChiTietPhieuXuat(maPhieu);
  return newPhieu;
}
async function renderChiTiet(maPhieu) {
  let chiTiet = await layPhieu(maPhieu);
  render(chiTiet);
  const btnXacNhan = document.querySelector("#xacNhan");
  const btnQuayLai = document.querySelector("#quayLai");
  btnXacNhan.addEventListener("click", async (e) => {
    if (confirm("Bạn có chắc đã nhập kho phiếu yêu cầu này? ")) {
      let res = await xacNhanXuatKho(chiTiet);
      let res2 = res
        ? await modalThongBao("Xuất kho thành công!", true)
        : await modalThongBao("Xuất kho thất bại!", false);
      if (res2) {
        window.location.reload();
      }
    }
  });
  btnQuayLai.addEventListener("click", (e) => {
    init();
  });
}
function themOverlay() {
  const overlayDivEl = document.querySelector(".overlayDiv");
  overlayDivEl.innerHTML = `<div class="overlay"></div>
      <div class="message">Đã phân phối đơn thành công</div>`;
}
function showOverlay(id) {
  init();
  xoaOverlay();
}
function xoaOverlay() {
  const overlayDivEl = document.querySelector(".overlayDiv");
  overlayDivEl.innerHTML = "";
  overlayDivEl.removeEventListener("click", showOverlay);
}
async function init() {
  dsPhieu = await layDanhSachPhieuXuat();
  render();
  const btnXem = document.querySelectorAll("button");
  btnXem.forEach((e) =>
    e.addEventListener("click", (e) => {
      const maPhieu = e.target.id;
      renderChiTiet(maPhieu);
    })
  );
}
init();
