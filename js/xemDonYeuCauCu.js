"use strick";
import { menu, menuShow, highLightMenu } from "./menu.js";
import { exportEcxel } from "./exportEcxcel.js";
async function layDanhSachDonYeuCauCu() {
  let data;
  await $.ajax({
    url: "../ajax/xemDonYeuCauCu.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layDonYeuCauCuTheoTaiKhoan",
      maTaiKhoan: 1,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function layChiTietNguyenLieu(maDon) {
  let data;
  await $.ajax({
    url: "../ajax/xemDonYeuCauCu.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layChiTietNguyenLieu",
      maDon: maDon,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function layPhieuXuatKhoTheoTaiKhoan() {
  let data;
  await $.ajax({
    url: "../ajax/xemDonYeuCauCu.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layPhieuXuatKhoTheoTaiKhoan",
      maTaiKhoan: 2,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function layChiTietPhieuXuat(maPhieu) {
  let data;
  await $.ajax({
    url: "../ajax/xemDonYeuCauCu.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layChiTietPhieuXuat",
      maPhieu: maPhieu,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function layPhieuNhapKhoTheoTaiKhoan() {
  let data;
  await $.ajax({
    url: "../ajax/xemDonYeuCauCu.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layPhieuNhapKhoTheoTaiKhoan",
      maTaiKhoan: 2,
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
    url: "../ajax/xemDonYeuCauCu.php", // Đường dẫn đến tệp PHP
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
const dsDon = await layDanhSachDonYeuCauCu();
const dsPhieuNhap = await layPhieuNhapKhoTheoTaiKhoan();
const dsPhieuXuat = await layPhieuXuatKhoTheoTaiKhoan();
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
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
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
          <input type="text" name="search" id="search" />
          <button type="button">
            <i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8"></i>
          </button>
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
function contentPhieuNhap() {
  let html = `        
        <div class="content">
         <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
          <form class="search">
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
          </form>
          <div class='buttons'>
            <button class="btn" id="XemDon">Đơn yêu cầu</button>
            <button class="btn" id="XemPhieuNhap">Phiếu nhập kho</button>
            <button class="btn" id="XemPhieuXuat">Phiếu xuất kho</button>
          </div>
         <div class="content__inner">
            <table>
              <tr class="muc">
                <th>Mã phiếu</th>
                <th>Mã đơn</th>
                <th>Tên đơn</th>
                <th>Người lập</th>
                <th>Ngày lập</th>
                <th>Số lượng nguyên liệu</th>
                <th>Hành động</th>
              </tr>
              ${dsPhieuNhap
                .map((phieu) => {
                  return `<tr>
                <td>${phieu.MaPhieu}</td>
                <td>${phieu.MaDon}</td>
                <td>${phieu.TenLoai}</td>
                <td>${phieu.MaTaiKhoan}</td>
                <td>${phieu.NgayLap}</td>
                <td class="center">${phieu.soluongnguyenlieu}</td>
                <td><button class="btn primary center large xem" id = ${phieu.MaPhieu}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>
         </div>
        </div>`;
  return html;
}
function contentPhieuXuat() {
  let html = `        
        <div class="content">
         <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
          <form class="search">
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
          </form>
          <div class='buttons'>
            <button class="btn" id="XemDon">Đơn yêu cầu</button>
            <button class="btn" id="XemPhieuNhap">Phiếu nhập kho</button>
            <button class="btn" id="XemPhieuXuat">Phiếu xuất kho</button>
          </div>
         <div class="content__inner">
            <table>
              <tr class="muc">
                <th>Mã phiếu</th>
                <th>Mã đơn</th>
                <th>Tên đơn</th>
                <th>Người lập</th>
                <th>Ngày lập</th>
                <th>Số lượng nguyên liệu</th>
                <th>Hành động</th>
              </tr>
              ${dsPhieuXuat
                .map((phieu) => {
                  return `<tr>
                <td>${phieu.MaPhieu}</td>
                <td>${phieu.MaDon}</td>
                <td>${phieu.TenLoai}</td>
                <td>${phieu.MaTaiKhoan}</td>
                <td>${phieu.NgayLap}</td>
                <td class="center">${phieu.soluongnguyenlieu}</td>
                <td><button class="btn primary center large xem" id = ${phieu.MaPhieu}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>
         </div>
        </div>`;
  return html;
}
function contentChiTietPhieuNhap(chiTiet) {
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
           `;
  let html = `<div class="content">
        <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
        <form class="search">
          <input type="text" name="search" id="search" />
          <button type="button">
            <i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8"></i>
          </button>
        </form>
        <div class="content__inner chitiet">
          <div id = 'in'>
            <h3>${chiTiet.TenLoai}</h3>
            <p><span class="deMuc">Mã đơn:</span>${chiTiet.MaDon}</p>
            <p><span class="deMuc">Mã kho:</span>${chiTiet.MaKho}</p>
            <p><span class="deMuc">Tên đơn:</span>${chiTiet.TenLoai}</p>
            <p><span class="deMuc">Người lập:</span>${chiTiet.MaTaiKhoan}</p>
            <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
            <p><span class="deMuc">Ngày nhập kho:</span>${chiTiet.NgayNhap}</p>
            <p><span class="deMuc">Trạng thái:</span>${chiTiet.TrangThai}</p>
            <p><span class="deMuc">Danh sách yêu cầu:</span></p>
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
function contentChiTietPhieuXuat(chiTiet) {
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
           `;
  let html = `<div class="content">
        <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
        <form class="search">
          <input type="text" name="search" id="search" />
          <button type="button">
            <i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8"></i>
          </button>
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
            <button class="btn success" id = "excel">Xuất dưới dạng excel</button>
            <button class="btn secondary small" id ="quayLai">Quay lại</button>
          </div>
        </div>
       
      </div>
       `;
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
async function renderChiTietPhieuNhap(id) {
  let chitiet = await layPhieuNhap(id);
  render(chitiet, false, "PhieuNhap");
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    initPhieuNhap();
  });
  toExcel(chitiet.TenLoai);
  toPDF(chitiet.TenLoai);
}
async function renderChiTietPhieuXuat(id) {
  let chitiet = await layPhieuXuat(id);
  render(chitiet, false, "PhieuXuat");
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    initPhieuXuat();
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
function initPhieuNhap() {
  render(null, false, "PhieuNhap");
  init();
  const btnXem = document.querySelectorAll(".xem");
  btnXem.forEach((e) =>
    e.addEventListener("click", (e) => {
      const id = e.target.id;
      renderChiTietPhieuNhap(id);
    })
  );
}
function initPhieuXuat() {
  render(null, false, "PhieuXuat");
  init();
  const btnXem = document.querySelectorAll(".xem");
  btnXem.forEach((e) =>
    e.addEventListener("click", async (e) => {
      const id = e.target.id;
      await renderChiTietPhieuXuat(id);
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
async function layPhieuNhap(id) {
  const chiTiet = dsPhieuNhap.filter((e) => e.MaPhieu == id)[0];
  chiTiet.NguyenLieu = await layChiTietPhieuNhap(id);
  return chiTiet;
}
async function layPhieuXuat(id) {
  const chiTiet = dsPhieuXuat.filter((e) => e.MaPhieu == id)[0];
  chiTiet.NguyenLieu = await layChiTietPhieuXuat(id);
  return chiTiet;
}

initDon();
function toExcel(title) {
  $("#excel").click((e) => {
    function excel() {
      themOverlay();
      setTimeout((e) => {
        let html = document.querySelector("table").innerHTML;
        html = `<table>${html}</table>`;
        exportEcxel(title, html);
        xoaOverlay();
      }, 1000);
    }
    excel();
  });
}
function toPDF(title) {
  $("#pdf").click(async (e) => {
    themOverlay();
    title = title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ");

    title =
      title
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join("") +
      "_" +
      new Date().toLocaleDateString().replaceAll("/", "_");

    let html = document.querySelector("#in").innerHTML;
    html = `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <style>
                    * {
                      box-sizing: border-box;
                    }
                    #in {
                      padding: 1%;
                      box-sizing: border-box;
                    }

                    #in {
                      width: 99%;
                      height: 75%;
                      margin: 1% 0%;
                      border: 1px solid black;
                      overflow: scroll;
                    }
                    table {
                      width: 100%;
                      text-align: center;
                      border-collapse: collapse;
                      margin-bottom: 5%;
                    }
                    th {
                      padding: 15px;
                    }
                    tr {
                      border-bottom: 1px solid black;
                    }
                    td {
                      padding: 1% 1rem;
                    }
                    #in {
                      padding: 3% 5%;
                    }
                    h3 {
                          text-align: center;
                          font-size: 30px;
                        }
                          p {
                      width: 100%;
                      display: table;
                      justify-content: space-between;
                      align-items: center;
                    }
                    span {
                      width: 30%;
                    }
                </style>
                
            </head>
            <body>
            <p><i>Ngày 23 tháng 11 năm 2023</i></h5>
            <p><i>Số: 20113401</i></p>
              ${html}
            </body>
            </html>`;
    await $.ajax({
      url: "../ajax/exportPdf.php", // Đường dẫn đến tệp PHP
      type: "post", // Phương thức POST hoặc GET
      data: {
        action: "viewAll",
        html: html,
        title: title,
      },
      success: function (response) {
        xoaOverlay();
      },
    });
  });
}
function themSpinner() {
  return `<div >Đang xuất file <i class="fa-solid fa-spinner" style =" animation: spin 0.8s infinite ease-in-out;"></i></div>`;
}
function themOverlay() {
  const overlayDivEl = document.querySelector(".overlayDiv");
  overlayDivEl.innerHTML = `<div class="overlay"></div>
      <div class="message">${themSpinner()}</div>`;
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
