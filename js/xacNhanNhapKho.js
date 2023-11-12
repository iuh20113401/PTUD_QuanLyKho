"use strick";
import { menu, menuShow, highLightMenu } from "./menu.js";

async function layDanhSachPhieuNhap() {
  let data;
  await $.ajax({
    url: "../ajax/nhapKho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layPhieuNhapKhoChoNhap",
      maKho: 3,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function layChiTietPhieuNhap(maPhieu) {
  let data;
  await $.ajax({
    url: "../ajax/nhapKho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layChiTietPhieuNhap",
      maPhieu: maPhieu,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function xacNhanNhapKho(phieu) {
  let data;
  await $.ajax({
    url: "../ajax/nhapKho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "xacNhanNhapKho",
      maPhieu: phieu.MaPhieu,
      maSanPham: phieu.NguyenLieu.map((nl) => nl.MaSanPham),
      maDon: phieu.MaDon,
      maKho: phieu.MaKho,
      soLuong: phieu.NguyenLieu.map((nl) => nl.SoLuong),
      donVi: phieu.NguyenLieu.map((nl) => nl.DonVi),
      ngaySanXuat: phieu.NguyenLieu.map((nl) => nl.NgaySanXuat),
      ngayHetHan: phieu.NguyenLieu.map((nl) => nl.NgayHetHan),
    },
    success: function (response) {
      response;
      console.log(response);
      data = JSON.parse(response);
    },
  });
  return data;
}
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
let dsPhieu;
function content() {
  let html = `        
        <div class="content">
         <a href="#"> <h3>Phân phối > Xác nhận nhập kho</h3></a>
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
                <th>Mã phiếu</th>
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
              <th>Tên nguyên liệu</th>
              <th>Số lượng</th>
              <th>Đơn vị</th>
            </tr>
            ${chiTiet.NguyenLieu.map((e) => {
              return `<tr>
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
        <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
        <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        <div class="content__inner chitiet">
        <h3>Phiếu nhập nguyên liệu</h3>
        <p><span class="deMuc">Mã phiếu:</span>${chiTiet.MaPhieu}</p>
        <p><span class="deMuc">Mã đơn:</span>${chiTiet.MaDon}</p>
        <p><span class="deMuc">Mã kho:</span>${chiTiet.MaKho}</p>
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
  newPhieu.NguyenLieu = await layChiTietPhieuNhap(maPhieu);
  return newPhieu;
}
async function renderChiTiet(maPhieu) {
  let chiTiet = await layPhieu(maPhieu);
  render(chiTiet);
  const btnXacNhan = document.querySelector("#xacNhan");
  const btnQuayLai = document.querySelector("#quayLai");
  btnXacNhan.addEventListener("click", async (e) => {
    if (confirm("Bạn có chắc đã nhập kho phiếu yêu cầu này? ")) {
      await xacNhanNhapKho(chiTiet);
      themOverlay();
    }
  });
  btnQuayLai.addEventListener("click", (e) => {
    init();
  });
  const overlayDivEl = document.querySelector(".overlayDiv");
  overlayDivEl.addEventListener("click", showOverlay);
}
function themOverlay() {
  const overlayDivEl = document.querySelector(".overlayDiv");
  overlayDivEl.innerHTML = `<div class="overlay"></div>
      <div class="message">Đã nhập kho thành công</div>`;
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
  dsPhieu = await layDanhSachPhieuNhap();
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
