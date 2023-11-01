"use strick";
import { menu, menuShow, highLightMenu } from "./menu.js";

async function layDanhSachTatCaDon() {
  let data;
  await $.ajax({
    url: "../ajax/phanPhoiDonNhapKho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layTatCaDon",
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
    url: "../ajax/phanPhoiDonNhapKho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layDon",
      maDon: maDon,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function layKhoPhuHop(loai, soLuong) {
  let data;
  await $.ajax({
    url: "../ajax/phanPhoiDonNhapKho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layKho",
      loai: loai,
      soLuong: soLuong,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function capNhatDonYeuCau(chiTiet) {
  let data;
  await $.ajax({
    url: "../ajax/phanPhoiDonNhapKho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "capNhatDonYeuCau",
      maDon: chiTiet[0].MaDon,
      maSanPham: chiTiet.map((ct) => ct.MaSanPham),
      ngaySanXuat: chiTiet.map((ct) => ct.NgaySanXuat),
      ngayHetHan: chiTiet.map((ct) => ct.NgayHetHan),
      viTriKho: chiTiet.map((ct) => ct.kho),
      trangThai: "Đã phân phối",
    },
    success: function (response) {
      data = JSON.parse(response) || 0;
    },
  });
  return data;
}
let dsDon;
async function render(
  chiTietNguyenLieu = null,
  sua = false,
  newChiTiet = null,
  thanhPham
) {
  let html =
    chiTietNguyenLieu !== null
      ? await contentChiTiet(chiTietNguyenLieu, sua, newChiTiet, thanhPham)
      : content();
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
         <div class="content__inner">
          ${
            !dsDon.length
              ? `<h3 class ="khongDon">Không có đơn yêu cầu nào!</h3>`
              : `<table>
              <tr class="muc">
                <th>Mã đơn</th>
                <th>Tên đơn</th>
                <th>Người lập</th>
                <th>Ngày lập</th>
                <th>Số lượng nguyên liệu</th>
                <th>Hành động</th>
              </tr>
              
              ${dsDon
                .map((don) => {
                  return `<tr>
                <td>${don.MaDon}</td>
                <td>${don.TenLoai}</td>
                <td>${don.MaTaiKhoan}</td>
                <td>${don.NgayLap}</td>
                <td class="center">${don.soluongnguyenlieu}</td>
                <td><button class="btn primary center large" id = ${don.MaDon}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>`
          }
            
         </div>
        </div>`;
  return html;
}
async function contentChiTiet(
  id,
  sua = false,
  newChiTiet = null,
  thanhPham = false
) {
  let chiTiet = newChiTiet ? newChiTiet : await layDon(id);
  let toanBoKho = await layKhoPhuHop(
    chiTiet[0].MaLoai == "1" ? "Nguyên liệu" : "Thành phẩm",
    0
  );
  let dsNguyenLieu = sua
    ? `<table class="small"><tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
              <th>Đơn vị</th>
              <th>Ngày sản xuất</th>
              <th>Ngày hết hạn</th>
              <th>Kho</th>
            </tr>
            ${chiTiet.map((e) => {
              return `<tr>
              <td>${e.TenSanPham}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
              <td>
                ${
                  e.NgaySanXuat != null
                    ? e.NgaySanXuat
                    : ` <input type="date" class="NgaySanXuat" id="NgaySanXuat" />`
                }
              </td>
              <td> ${
                e.NgayHetHan != null
                  ? e.NgayHetHan
                  : `<input type="date" class="NgayHetHan" id="NgayHetHan" />`
              }</td>
              <td>
              ${
                e.kho
                  ? e.kho
                  : `<select class="kho" name="kho" id="kho">
                    <option value="">Chọn kho nguyên liệu</option>
                    ${toanBoKho
                      .map((k) => {
                        return `<option value=${k.MaKho}>${k.TenKho}</option>`;
                      })
                      .join("")}
                  </select>`
              }
                
              </td>
            </tr>`;
            })}
          </table>
          <p class="alert hidden"></p>
          <div class="buttons">
            ${
              newChiTiet
                ? `<button class="btn primary" id = "lapPhieu">Lập phiếu</button>`
                : `<button class="btn primary" id = "xacNhan">Xác nhận</button>`
            }
            <button class="btn secondary small" id = "quayLai">Hủy</button>
          </div>`
    : `<table class="small">
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
            ${chiTiet
              .map((e) => {
                return `<tr>
              <td>${e.TenSanPham}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
              ${
                e.NgayHetHan
                  ? `<td>${e.NgaySanXuat}</td>
                  <td>${e.NgayHetHan}</td>`
                  : ""
              }
            </tr>`;
              })
              .join("")}
          </table>
          <div class="buttons">
            <button class="btn primary" id="phanPhoi">Phân phối đơn yêu càu</button>
            <button class="btn secondary small" id = "quayLai">Quay lại</button>
          </div>`;

  let html = `<div class="content">
        <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
        <form class="search">
          <input type="text" name="search" id="search" />
          <button type="button">
            <i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8"></i>
          </button>
        </form>
        <div class="content__inner chitiet">
          <h3>Đơn yêu cầu nhập nguyên liệu</h3>
          <p><span class="deMuc">Mã đơn:</span>${chiTiet[0].MaDon}</p>
          <p><span class="deMuc">Tên đơn:</span>${chiTiet[0].TenLoai}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet[0].MaTaiKhoan}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet[0].NgayLap}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieu}
        </div>
      </div>`;
  return html;
}
async function layDon(id) {
  const chiTiet = await layChiTietNguyenLieu(id);
  return chiTiet;
}

async function renderChiTiet(id) {
  let chitiet = await layDon(id);
  if (chitiet[0].MaLoai == 1) await render(id, false, null, false);
  else await render(id, false, null, true);
  const btnBack = document.querySelector("#quayLai");
  const btnPhanPhoi = document.querySelector("#phanPhoi");
  btnPhanPhoi.addEventListener("click", (e) => {
    renderPhanPhoi(id);
  });
  btnBack.addEventListener("click", (e) => {
    init();
  });
}
async function renderPhanPhoi(id) {
  await render(id, true);
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    renderChiTiet(id);
  });
  const btnXacNhan = document.querySelector("#xacNhan");
  btnXacNhan.addEventListener("click", (e) => {
    renderPhieuNhap(id);
  });
}
function alertMessage(message) {
  const alert = document.querySelector(".alert");
  alert.textContent = message;
}
async function renderPhieuNhap(id) {
  let chiTiet = await layDon(id);
  const NgayHetHan = [];
  document
    .querySelectorAll(".NgayHetHan")
    .forEach((e) => NgayHetHan.push(e.value));
  const NgaySanXuat = [];
  document
    .querySelectorAll(".NgaySanXuat")
    .forEach((e) => NgaySanXuat.push(e.value));
  const kho = [];
  document.querySelectorAll(".kho").forEach((e) => kho.push(e.value));
  if (NgayHetHan.some((e) => e === "") || NgaySanXuat.some((e) => e === "")) {
    alertMessage("Vui lòng chọn đầy đủ ngày hết hạn và ngày sản xuất");
    return;
  } else {
    alertMessage("");
  }
  if (kho.some((e) => e === "")) {
    alertMessage("Vui lòng chọn đầy đủ kho");
    return;
  } else {
    alertMessage("");
  }
  let newChiTiet = [...chiTiet];
  newChiTiet = newChiTiet.map((e, i) => {
    return {
      ...e,
      NgaySanXuat: NgaySanXuat[i] || e.NgaySanXuat,
      NgayHetHan: NgayHetHan[i] || e.NgayHetHan,
      kho: kho[i],
    };
  });
  await render(id, true, newChiTiet);
  const btnLapPhieu = document.querySelector("#lapPhieu");
  const btnBack = document.querySelector("#quayLai");
  btnLapPhieu.addEventListener("click", async (e) => {
    await capNhatDonYeuCau(newChiTiet);
    themOverlay();
    const overlayDivEl = document.querySelector(".overlayDiv");
    overlayDivEl.addEventListener("click", (e) => showOverlay(id));
  });
  btnBack.addEventListener("click", (e) => {
    renderChiTiet(id);
  });
}
function showOverlay(id) {
  init();
  xoaOverlay();
}
function themOverlay() {
  const overlayDivEl = document.querySelector(".overlayDiv");
  overlayDivEl.innerHTML = `<div class="overlay"></div>
      <div class="message">Đã phân phối đơn thành công</div>`;
}
function xoaOverlay() {
  const overlayDivEl = document.querySelector(".overlayDiv");
  overlayDivEl.innerHTML = "";
  overlayDivEl.removeEventListener("click", showOverlay);
}
async function init() {
  dsDon = await layDanhSachTatCaDon();
  render();
  const btnXem = document.querySelectorAll("button");
  btnXem.forEach((e) =>
    e.addEventListener("click", (e) => {
      const id = e.target.id;
      renderChiTiet(id);
    })
  );
}
init();
