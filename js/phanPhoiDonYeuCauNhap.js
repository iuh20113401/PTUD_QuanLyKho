"use strick";
import { menu, menuShow } from "./menu.js";
const dsDon = [
  {
    MaDon: 1,
    Loai: 1,
    TenDon: "Đon yêu cầu nhập nguyên liệu",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Chờ duyệt",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        Ten: "Bột mì",
        SoLuong: 20,
        DonVi: "KG",
      },
      {
        Ten: "Đường",
        SoLuong: 20,
        DonVi: "KG",
      },
    ],
  },
  {
    MaDon: 2,
    Loai: 2,
    TenDon: "Đon yêu cầu nhập thành phẩm",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Chờ duyệt",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        Ten: "Bánh đậu xanh",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "23/09/2023",
        NgayHetHan: "3/11/2024",
      },
      {
        Ten: "Bánh trà xanh",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "23/09/2023",
        NgayHetHan: "3/11/2024",
      },
    ],
  },
  {
    MaDon: 3,
    Loai: 1,
    TenDon: "Đon yêu cầu nhập nguyên liệu",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Chờ duyệt",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        Ten: "Bột mì",
        SoLuong: 20,
        DonVi: "KG",
      },
      {
        Ten: "Đường",
        SoLuong: 20,
        DonVi: "KG",
      },
    ],
  },
  {
    MaDon: 4,
    Loai: 2,
    TenDon: "Đon yêu cầu nhập thành phẩm",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Chờ duyệt",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        Ten: "Bánh đậu xanh",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "23/09/2023",
        NgayHetHan: "3/11/2024",
      },
      {
        Ten: "Bánh trà xanh",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "23/09/2023",
        NgayHetHan: "3/11/2024",
      },
    ],
  },
  {
    MaDon: 5,
    Loai: 1,
    TenDon: "Đon yêu cầu nhập nguyên liệu",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Chờ duyệt",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        Ten: "Bột mì",
        SoLuong: 20,
        DonVi: "KG",
      },
      {
        Ten: "Đường",
        SoLuong: 20,
        DonVi: "KG",
      },
    ],
  },
];
function render(
  chiTietNguyenLieu = null,
  sua = false,
  newChiTiet = null,
  thanhPham
) {
  let html =
    chiTietNguyenLieu !== null
      ? contentChiTiet(chiTietNguyenLieu, sua, newChiTiet, thanhPham)
      : content();
  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
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
            <table>
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
                  if (don.TinhTrang === "Chờ duyệt")
                    return `<tr>
                <td>${don.MaDon}</td>
                <td>${don.TenDon}</td>
                <td>${don.MaTaiKhoan}</td>
                <td>${don.NgayLap}</td>
                <td class="center">${don.SoLuongNguyenLieu}</td>
                <td><button class="btn primary center large" id = ${don.MaDon}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>
         </div>
        </div>`;
  return html;
}
function contentChiTiet(id, sua = false, newChiTiet = null, thanhPham = false) {
  let chiTiet = newChiTiet ? newChiTiet : layDon(id);
  let dsNguyenLieu = sua
    ? `<table class="small"><tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
              <th>Đơn vị</th>
              <th>Ngày sản xuất</th>
              <th>Ngày hết hạn</th>
              <th>Kho</th>
            </tr>
            ${chiTiet.NguyenLieu.map((e) => {
              return `<tr>
              <td>${e.Ten}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
              <td>
                ${
                  e.NgaySanXuat
                    ? e.NgaySanXuat
                    : ` <input type="date" class="NgaySanXuat" id="NgaySanXuat" />`
                }
              </td>
              <td> ${
                e.NgayHetHan
                  ? e.NgayHetHan
                  : `<input type="date" class="NgayHetHan" id="NgayHetHan" />`
              }</td>
              <td>
              ${
                e.kho
                  ? e.kho
                  : `<select class="kho" name="kho" id="kho">
                    <option value="">Chọn kho nguyên liệu</option>
                    <option value="1">Kho nguyên liệu 1</option>
                    <option value="2">Kho nguyên liệu 3</option>
                    <option value="3">Kho nguyên liệu 2</option>
                    <option value="4">Kho nguyên liệu 4</option>
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
            ${chiTiet.NguyenLieu.map((e) => {
              return `<tr>
              <td>${e.Ten}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
              ${
                e.NgayHetHan
                  ? `<td>${e.NgaySanXuat}</td>
                  <td>${e.NgayHetHan}</td>`
                  : ""
              }
            </tr>`;
            }).join("")}
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
          <p><span class="deMuc">Mã đơn:</span>${chiTiet.MaDon}</p>
          <p><span class="deMuc">Tên đơn:</span>${chiTiet.TenDon}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.MaTaiKhoan}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieu}
        </div>
      </div>`;
  return html;
}
function layDon(id) {
  const chiTiet = dsDon.filter((e) => e.MaDon == id)[0];
  return chiTiet;
}

function renderChiTiet(id) {
  let chitiet = layDon(id);
  if (chitiet.Loai === 1) render(id, false, null, false);
  else render(id, false, null, true);
  const btnBack = document.querySelector("#quayLai");
  const btnPhanPhoi = document.querySelector("#phanPhoi");
  btnPhanPhoi.addEventListener("click", (e) => {
    renderPhanPhoi(id);
  });
  btnBack.addEventListener("click", (e) => {
    init();
  });
}
function renderPhanPhoi(id) {
  render(id, true);
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
function renderPhieuNhap(id) {
  let chiTiet = layDon(id);
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
  chiTiet.NguyenLieu = chiTiet.NguyenLieu.map((e, i) => {
    return {
      ...e,
      NgaySanXuat: e.NgaySanXuat,
      NgayHetHan: e.NgayHetHan,
      kho: kho[i],
    };
  });
  let newChiTiet = chiTiet;
  console.log(newChiTiet);
  render(id, true, newChiTiet);
  const lapPhieu = document.querySelector("#lapPhieu");
  lapPhieu.addEventListener("click", (e) => {
    themOverlay();
    const overlayDivEl = document.querySelector(".overlayDiv");
    overlayDivEl.addEventListener("click", (e) => showOverlay(id));
  });
}
function showOverlay(id) {
  let index = dsDon.findIndex((e) => e.MaDon === +id);
  dsDon[index] = {
    ...dsDon[index],
    TinhTrang: "Đã duyệt",
  };
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
function init() {
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
