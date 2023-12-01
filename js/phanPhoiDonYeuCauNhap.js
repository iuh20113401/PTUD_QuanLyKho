"use strict";
import { menu, menuShow, highLightMenu } from "./menu.js";
import { getFetch, modalThongBao, taiKhoan, thongBaoLoi } from "./helper.js";
async function layDanhSachTatCaDon() {
  let data = await getFetch("../ajax/phanPhoiDonNhapKho.php", {
    action: "layTatCaDon",
  });
  return data;
}

async function layChiTietNguyenLieu(maDon) {
  let data = await getFetch("../ajax/phanPhoiDonNhapKho.php", {
    action: "layDon",
    maDon: maDon,
  });
  return data;
}
async function layKhoPhuHop(loai, soLuong) {
  let data = await getFetch("../ajax/phanPhoiDonNhapKho.php", {
    action: "layKho",
    loai: loai,
    soLuong: soLuong,
  });
  return data;
}
async function capNhatDonYeuCau(chiTiet) {
  let data = await getFetch("../ajax/phanPhoiDonNhapKho.php", {
    action: "capNhatDonYeuCau",
    maDon: chiTiet[0].MaDon,
    maSanPham: chiTiet.map((ct) => ct.MaSanPham),
    ngaySanXuat: chiTiet.map((ct) => ct.NgaySanXuat),
    ngayHetHan: chiTiet.map((ct) => ct.NgayHetHan),
    viTriKho: chiTiet.map((ct) => ct.kho),
    trangThai: "Đã phân phối",
    soLuong: chiTiet.map((ct) => ct.SoLuong),
  });
  return data;
}

async function lapBienBan(chitiet) {
  let data = await getFetch("../ajax/bienBan.php", {
    action: "lapBienBan",
    maBienBan: chitiet.maBienBan,
    maDon: chitiet.maDon,
    maTaiKhoan: chitiet.maTaiKhoan,
    ngayLap: chitiet.ngayLap,
    lyDo: chitiet.lyDo,
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
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
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
  let dsNguyenLieu = sua
    ? `<table class="small"><tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
              <th>Đơn vị</th>
              <th>Ngày sản xuất</th>
              <th>Ngày hết hạn</th>
              <th>Kho</th>
            </tr>
            ${chiTiet
              .map((e) => {
                return `<tr>
              <td id =  ${e.MaSanPham}>${e.TenSanPham}</td>
              <td class='soluong'>${e.SoLuong}</td>
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
                  : `<button class ='btn secondary large full center chonKho' >Chọn kho</button>`
              }
                
              </td>
            </tr>`;
              })
              .join("")}
          </table>
          <p class="alert hidden"></p>
          <div class="buttons">
            ${
              newChiTiet
                ? `<button class="btn primary" id = "lapPhieu">Lập phiếu</button>
                
                `
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
                thanhPham
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
            <button class="btn btnXoa" id = "lapBienBan">Lập biên bản</button>
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
          <h3 id=${chiTiet[0].MaLoai}>${chiTiet[0].TenLoai} </h3>
          <p><span class="deMuc">Mã đơn:</span>${chiTiet[0].MaDon}</p>
          <p><span class="deMuc">Tên đơn:</span>${chiTiet[0].TenLoai}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet[0].TenDangNhap}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet[0].NgayLap}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieu}
        </div>
      </div>`;
  return html;
}
async function layDon(id) {
  const chiTiet = await layChiTietNguyenLieu(id);
  chiTiet;
  return chiTiet;
}

async function renderChiTiet(id) {
  let chitiet = await layDon(id);
  if (chitiet[0].MaLoai == 1) await render(id, false, null, false);
  else await render(id, false, null, true);
  const btnBack = document.querySelector("#quayLai");
  const btnPhanPhoi = document.querySelector("#phanPhoi");
  const btnBienBan = document.querySelector("#lapBienBan");
  btnPhanPhoi.addEventListener("click", (e) => {
    renderPhanPhoi(id);
  });
  btnBack.addEventListener("click", (e) => {
    init();
  });
  btnBienBan.addEventListener("click", (e) => {
    renderBienBan(chitiet[0]);
  });
}

function contentBienBan(maBienBan, chitiet) {
  let html = `<div class="formChonNL">
      <div class="overlay"></div>
      <div class="dsNguyenLieu floatBienBan">
        <div class="top">
          <button class="btn btnClose">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="contentBienBan">
            <h3>Lập biên bản</h3>
            <div class='inputInfo--flat mt-1'>
                <label for='maBienBan'>Mã đơn:</label>
                <input type='number' value =${maBienBan} readonly/>
            </div>
            <div class='inputInfo--flat mt-1'>
                <label for='maDon'>Mã đơn:</label>
                <input type='number' value =${chitiet.MaDon} readonly/>
            </div>
            <div class='inputInfo--flat mt-1'>
                <label for='tenDon'>Tên đơn:</label>
                <input type='text' value ="${
                  chitiet.TenLoai
                }" id="tenDon" readonly/>
            </div>
            <div class='inputInfo--flat mt-1'>
                <label for='nguoiLap'>Người lập:</label>
                <input type='number' value =${
                  taiKhoan[3]
                } id="nguoiLap" readonly/>
            </div>
            <div class='inputInfo--flat mt-1'>
                <label for='ngayLap'>Ngày lập:</label>
                <input type='date' value ='${new Date().toLocaleDateString(
                  "en-CA"
                )}' readonly/>
            </div>
            <div class='inputInfo--flat large mt-1'>
                <label for='lyDo'>Lý do:</label>
                <textarea name="" id="lyDo" cols="30" rows="10"></textarea>
            </div>
        </div>
        <div class="bottomDs">
        <h3></h3>
          <button class="btn btnXoa center large  mt-1" id="xacNhan">Xác nhận</button>
      </div>
    </div>`;
  return html;
}
function renderBienBan(chitiet) {
  const maBienBan = Math.floor(Math.random() * 1000);
  const html = contentBienBan(maBienBan, chitiet);
  document.querySelector("body").insertAdjacentHTML("afterend", html);
  let btnClose = document.querySelector(".btnClose");
  btnClose.addEventListener("click", (e) => {
    document.querySelector(".formChonNL").remove();
  });
  let btnXacNhan = document.querySelector("#xacNhan");
  btnXacNhan.addEventListener("click", async (e) => {
    const ttbb = {
      maBienBan: maBienBan,
      maDon: chitiet.MaDon,
      ngayLap: new Date().toLocaleDateString("en-CA"),
      maTaiKhoan: taiKhoan[2],
      lyDo: document.querySelector("#lyDo").value,
    };
    let res = await lapBienBan(ttbb);
    if (res) {
      await modalThongBao("Đã lập biên bản thành công", true);
      window.location.reload();
    } else {
      await modalThongBao("Lập biên bản thất bại!", false);
    }
  });
}
async function renderPhanPhoi(id) {
  await render(id, true);
  let dsKho = [];
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    renderChiTiet(id);
  });
  const btnXacNhan = document.querySelector("#xacNhan");
  btnXacNhan.addEventListener("click", (e) => {
    renderPhieuNhap(id, dsKho);
  });
  document.querySelector("body").addEventListener("click", async (e) => {
    if (e.target.matches(".chonKho")) {
      const soluongcan = e.target.closest("tr").children[1].textContent;
      const maSanPham = e.target.closest("tr").children[0].id;
      await renderChonKho(maSanPham, dsKho, soluongcan);
    }
  });
}
function removeForm() {
  const form = document.querySelector(".formChonNL");
  form.remove();
}
async function renderChonKho(maSanPham, dsKho, soluongcan) {
  let loai = document.querySelector(".content__inner").querySelector("h3").id;
  const html_2 = await contentChonKho(null, loai, soluongcan);
  document.querySelector("body").insertAdjacentHTML("beforeend", html_2);
  document.body.addEventListener("change", function (e) {
    if (e.target.classList.contains("chon")) {
      const row = e.target.closest("tr");
      const inputSoLuong = row.querySelector(".soLuong");
      inputSoLuong.disabled = !e.target.checked;
    }
  });
  // Kiểm tra và xác nhận số lượng khi nhấn nút "Xác nhận"
  const form = document.querySelector(".formChonNL");
  form.querySelector(".btnClose").addEventListener("click", removeForm);
  form.querySelector("#xacNhan").addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(".chon:checked");
    let tongSoLuong = 0;
    let danhSachKho = [];

    checkboxes.forEach(function (checkbox) {
      const row = checkbox.closest("tr");
      const soLuong = parseInt(row.querySelector(".soLuong").value) || 0;
      tongSoLuong += soLuong;
      danhSachKho.push({
        maSanPham,
        maKho: row.cells[1].innerText,
        soLuong: soLuong,
      });
    });

    const soLuongCan = parseInt(
      document.querySelector(".bottomDs h3").innerText.match(/\d+/)[0]
    );

    if (tongSoLuong === soLuongCan) {
      removeForm();
      dsKho.push(...danhSachKho);
      return danhSachKho;
    } else {
      thongBaoLoi("Vui lòng nhập đủ số lượng cần!");
    }
  });
}
async function contentChonKho(dsKho = null, loai, SoLuongCan) {
  let kho = await layKhoPhuHop(loai == 1 ? "Nguyên liệu" : "Thành phẩm", 1);
  kho = kho.sort((a, b) => a.SucChuaDaDung - b.SucChuaDaDung);
  let newDsKho = kho.map((k) => {
    return `<tr>
    <td>
    <input type="checkbox" class="chon" id="chon" />
    </td>
    <td>${k.MaKho}</td>
    <td>${k.TenKho}</td>
    <td>${k.ViTri}</td>
    <td>${k.SucChua}</td>
    <td>${k.SucChuaDaDung}</td>
    <td>
    <input
      type="number"
      class="soLuong "
      placeholder="Nhập số lượng bạn muốn"
      value = ""
      disabled
    /></td>
    </tr>
    `;
  });
  let html = `<div class="formChonNL">
      <div class="overlay"></div>
      <div class="dsNguyenLieu float">
        <div class="top">
          <h3>Danh sách các kho</h3>
          <button class="btn btnClose">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="content__inner">
          <table>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Mã kho</th>
              <th>Tên kho</th>
              <th>Vị trí</th>
              <th>Sức chứa</th>
              <th>Sức chứa đã dùng</th>
              <th>Số lượng muốn xuất</th>
            </tr>
            ${newDsKho}
          </table>
        </div>
        <div class="bottomDs">
        <h3>Số lượng cần nhập là: ${SoLuongCan}</h3>
          <button class="btn primary" id="xacNhan">Xác nhận</button>
      </div>
    </div>`;
  return html;
}
function alertMessage(message) {
  const alert = document.querySelector(".alert");
  alert.textContent = message;
}
async function renderPhieuNhap(id, dsKho = null) {
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
  if (!NgaySanXuat.every((e) => e !== "")) {
    alertMessage("Vui lòng chọn đầy đủ ngày sản xuất");
    return;
  }
  if (!NgayHetHan.every((e) => e !== "")) {
    alertMessage("Vui lòng chọn đầy đủ ngày hết hạn");
    return;
  }
  if (
    !(
      NgayHetHan.every((e) => e > new Date().toISOString()) &&
      NgaySanXuat.every((e) => e < new Date().toISOString())
    )
  ) {
    alertMessage("Vui lòng ngày sản xuất và ngày hết hạn hợp lệ");
    return;
  } else {
    alertMessage("");
  }
  if (!dsKho.length) {
    alertMessage("Vui lòng chọn đầy đủ kho");
    return;
  } else {
    alertMessage("");
  }
  let newChiTiet = [...chiTiet];
  newChiTiet = newChiTiet.map((e, i) => {
    let newKho = dsKho.filter((tt) => +tt.maSanPham == e.MaSanPham);
    return newKho.map((k, index) => {
      return {
        ...e,
        kho: k.maKho,
        maSanPham: k.maSanPham,
        DonVi: e.DonVi,
        SoLuong: k.soLuong,
        NgaySanXuat: NgaySanXuat[i] || e.NgaySanXuat,
        NgayHetHan: NgayHetHan[i] || e.NgayHetHan,
      };
    });
  });
  newChiTiet = [].concat(...newChiTiet);
  await render(id, true, newChiTiet);
  const btnLapPhieu = document.querySelector("#lapPhieu");
  const btnBack = document.querySelector("#quayLai");
  btnLapPhieu.addEventListener("click", async (e) => {
    let res = await capNhatDonYeuCau(newChiTiet);
    if (res) {
      await modalThongBao("Phân phối đơn yêu cầu thành công!", true);
      window.location.reload();
    } else {
      modalThongBao("Phân phối đơn yêu cầu thất bại!", false);
    }
  });
  btnBack.addEventListener("click", (e) => {
    window.location.reload();
    renderChiTiet(id);
  });
}
function showOverlay(id) {
  window.location.reload();
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
