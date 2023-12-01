"use strict";
import { menu, menuShow, highLightMenu } from "./menu.js";
import { getFetch, modalThongBao, thongBaoLoi } from "./helper.js";
let dsDonXuat = [];
async function layDanhSachTatCaDon() {
  const data = await getFetch("../ajax/phanPhoiDonYeuCauXuat.php", {
    action: "layTatCaDon",
  });
  return data;
}

async function layChiTietDonYeuCauXuat(maDon) {
  const data = await getFetch("../ajax/phanPhoiDonYeuCauXuat.php", {
    action: "layDon",
    maDon: maDon,
  });
  return data;
}

async function layDanhSachSanPham(maSanPham) {
  const data = await getFetch("../ajax/phanPhoiDonYeuCauXuat.php", {
    action: "layDanhSachSanPham",
    maSanPham: maSanPham,
  });
  return data;
}

async function lapPhieuXuatKho(maDon) {
  const dsNguyenLieu = dsDonXuat.map((dx) => dx.dsNguyenLieu);
  let data = await getFetch("../ajax/phanPhoiDonYeuCauXuat.php", {
    action: "lapPhieuXuatKho",
    maDon: maDon,
    MaChiTietSanPham: dsNguyenLieu
      .map((nl) => nl.map((n) => n.MaChiTiet))
      .join(",")
      .split(","),
    SoLuong: dsNguyenLieu
      .map((nl) => nl.map((n) => n.SoLuong))
      .join(",")
      .split(","),
    Kho: dsNguyenLieu
      .map((nl) => nl.map((n) => n.Kho))
      .join(",")
      .split(","),
  });

  return data;
}
let dsDon = await layDanhSachTatCaDon();
function render(chiTietNguyenLieu = null, sua = false, newChiTiet = null) {
  let html =
    chiTietNguyenLieu !== null
      ? contentChiTiet(chiTietNguyenLieu, sua, newChiTiet)
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
         <a href="#"> <h3>Phân phối > Đơn yêu cầu xuất</h3></a>
          <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
         <div class="content__inner">
            ${
              dsDon
                ? `<table>
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
                <td>${don.TenDangNhap}</td>
                <td>${don.NgayLap}</td>
                <td class="center">${don.soluongnguyenlieu}</td>
                <td><button class="btn primary center large" id = ${don.MaDon}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>`
                : `<h3  class='khongDon'>Không có đơn yêu cầu nào!</h3>`
            }
            
         </div>
        </div>`;
  return html;
}
function contentChiTiet(chiTiet, sua = false, newChiTiet = null) {
  let dsNguyenLieu = sua
    ? `<table class="small">
            <tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
              <th>Đơn vị</th>
              <th></th>
              ${newChiTiet ? `<th></th>` : ""}
            </tr>
            ${chiTiet.NguyenLieu.map((nl, i) => {
              const checked = dsDonXuat.some((dx) => {
                return dx.MaSanPham == nl.MaSanPham;
              });
              return `<tr>
              <td>${nl.TenSanPham}</td>
              <td class = "SoLuongCan">${nl.SoLuong}</td>
              <td>${nl.DonVi}</td>
              <td><button class="btn secondary large chonNL" ${
                checked ? "disabled" : ""
              } id=${nl.MaSanPham}>Chọn nguyên liệu</button></td>
               ${
                 dsDonXuat
                   ? `<td><input type="checkbox" ${
                       checked ? "checked" : ""
                     } class ="daChon"/></td>`
                   : ""
               }
            </tr>`;
            }).join("")}
          </table>
          <div class="buttons">
            <button class="btn primary " id="xacNhan">Xác nhận</button>
            <button class="btn secondary small" id = "quayLai">Quay lại</button>
          </div>`
    : `<table class="small">
            <tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
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
            <button class="btn primary" id="phanPhoi">Phân phối đơn yêu càu</button>
            <button class="btn secondary small" id = "quayLai">Quay lại</button>
          </div>`;
  let html = `<div class="content">
        <a href="#"> <h3>Phân phối > Đơn yêu cầu xuất</h3></a>
        <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        <div class="content__inner chitiet">
          <h3>${chiTiet.TenLoai}</h3>
          <p><span class="deMuc">Mã đơn:</span>${chiTiet.MaDon}</p>
          <p><span class="deMuc">Tên đơn:</span>${chiTiet.TenLoai}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.TenDangNhap}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieu}
        </div>
      </div>`;
  return html;
}
async function chonChiTietNL(idNL, SoLuongCan) {
  let chiTietNL = await layNL(idNL);
  let dsNguyenLieu = chiTietNL
    .map((ct) => {
      let nl = dsDonXuat.filter((dx) => {
        return +dx.MaSanPham == +ct.MaSanPham;
      })[0]?.dsNguyenLieu;
      const ctNL = nl?.filter((c) => c.MaChiTiet == +ct.MaChiTietSanPham);
      return `<tr class ="nguyenlieu">
              <td>
                <input type="checkbox" class="chon" id="chon" ${
                  ctNL?.length ? "checked" : ""
                } />
              </td>
              <td class = "MaChiTiet">${ct.MaChiTietSanPham}</td>
              <td >${ct.TenSanPham}</td>
              <td class = "soLuongTon">${ct.soluongton}</td>
              <td >${ct.DonVi}</td>
              <td >${ct.NgaySanXuat}</td>
              <td >${ct.NgayHetHan}</td>
              <td class ="kho">${ct.MaKho}</td>
              <td>
                <input
                  type="number"
                  class="soLuong ${ctNL?.length ? "" : "disabled"}"
                  placeholder="Nhập số lượng bạn muốn"
                  value = "${ctNL?.length ? ctNL[0]?.SoLuong : ""}"
                  ${ctNL?.length ? "" : "disabled"}
                />
              </td>
            </tr>`;
    })
    .join("");
  let html = `<div class="formChonNL">
      <div class="overlay"></div>
      <div class="dsNguyenLieu float">
        <div class="top">
          <h3>Danh sách chi tiết nguyên liệu</h3>
          <button class="btn btnClose">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="content__inner">
          <table>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Mã chi tiết nguyên liệu</th>
              <th>Tên nguyên liệu</th>
              <th>Số lượng tồn</th>
              <th>Đơn vị</th>
              <th>Ngày sản xuất</th>
              <th>Ngày hết hạn</th>
              <th>kho</th>
              <th>Số lượng muốn xuất</th>
            </tr>
            ${dsNguyenLieu}
          </table>
        </div>
        <div class="bottomDs">
        <h3>Số lượng cần là: ${SoLuongCan}</h3>
          <button class="btn primary" id="xacNhan">Xác nhận</button>
      </div>
    </div>`;
  return html;
}
function xacNhan(chiTiet) {
  const nguyenlieu = dsDonXuat.map((dx) => dx.dsNguyenLieu);
  let dsNguyenLieuCuoi = `<table class="small">
            <tr>
              <th>Mã chi tiết nguyên liệu</th>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
              <th>Đơn vị</th>
              <th>Kho</th>
            </tr>
            ${nguyenlieu
              .map((e) => {
                return e.map((nguyenLieu) => {
                  return `<tr>
              <td>${nguyenLieu.MaChiTiet}</td>
              <td>${nguyenLieu.TenSanPham}</td>
              <td>${nguyenLieu.SoLuong}</td>
              <td>${nguyenLieu.DonVi}</td>
              <td>${nguyenLieu.Kho}</td>
            </tr>`;
                });
              })
              .join("")}
          </table>
          <div class="buttons">
            <button class="btn primary" id="lapPhieu">Lập phiếu xuất kho</button>
            <button class="btn secondary small" id = "quayLai">Quay lại</button>
          </div>`;
  let html = `<div class="content">
        <a href="#"> <h3>Phân phối > Đơn yêu cầu xuất</h3></a>
        <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        <div class="content__inner chitiet">
          <h3>Đơn yêu cầu xuất nguyên liệu</h3>
          <p><span class="deMuc">Mã đơn:</span>${chiTiet.MaDon}</p>
          <p><span class="deMuc">Tên đơn:</span>${chiTiet.TenLoai}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.TenDangNhap}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieuCuoi}
        </div>
      </div>`;
  return html;
}
async function layDon(id) {
  const chiTiet = dsDon.filter((e) => e.MaDon == id)[0];
  chiTiet.NguyenLieu = await layChiTietDonYeuCauXuat(id);
  return chiTiet;
}
async function layNL(idNL) {
  const chiTiet = await layDanhSachSanPham(idNL);
  chiTiet.filter((sp) => sp.NgayHetHan > new Date());
  return chiTiet;
}
async function renderChiTiet(id) {
  let chiTiet = await layDon(id);
  render(chiTiet, false, null);
  const btnBack = document.querySelector("#quayLai");
  const btnPhanPhoi = document.querySelector("#phanPhoi");
  btnPhanPhoi.addEventListener("click", (e) => {
    renderPhanPhoi(chiTiet, id);
  });
  btnBack.addEventListener("click", (e) => {
    init();
  });
}
async function renderChiTietPhanPhoi(id, chiTietNL = null) {
  let chiTiet = await layDon(id);
  render(chiTiet, true, chiTietNL);
  const btnBack = document.querySelector("#quayLai");
  const daChon = document.querySelectorAll(".daChon");
  const btnChonNL = document.querySelectorAll(".chonNL");
  const SoLuongCan = document.querySelectorAll(".SoLuongCan");
  daChon.forEach((dc) => {
    dc.addEventListener("click", (e) => {
      if (dc.checked == false)
        dc.closest("tr").querySelector(".chonNL").removeAttribute("disabled");
      else
        dc.closest("tr")
          .querySelector(".chonNL")
          .setAttribute("disabled", true);
    });
  });
  btnBack.addEventListener("click", (e) => {
    dsDonXuat = [];
    renderChiTiet(id);
  });
  btnChonNL.forEach((btn, i) => {
    btn.addEventListener("click", (e) =>
      renderChonNL(id, SoLuongCan[i].textContent, btn.id)
    );
  });
  let btnXacNhan = document.querySelector("#xacNhan");
  btnXacNhan.addEventListener("click", (e) => {
    if (dsDonXuat.length === btnChonNL.length) {
      renderXacNhanCuoi(id);
    } else {
      thongBaoLoi("Vui lòng chọn đầy đủ nguyên liệu");
    }
  });
}
function renderPhanPhoi(chiTiet, id) {
  render(chiTiet, true, id);
  const btnBack = document.querySelector("#quayLai");
  const btnChonNL = document.querySelectorAll(".chonNL");
  const SoLuongCan = document.querySelectorAll(".SoLuongCan");
  btnBack.addEventListener("click", (e) => {
    renderChiTiet(id);
  });
  btnChonNL.forEach((btn, i) => {
    btn.addEventListener("click", (e) =>
      renderChonNL(id, SoLuongCan[i].textContent, btn.id)
    );
  });
}
async function renderChonNL(id, SoLuongCan, MaSanPham) {
  let html = await chonChiTietNL(MaSanPham, SoLuongCan);
  const chiTiet = await layDanhSachSanPham(MaSanPham);
  document.querySelector("body").insertAdjacentHTML("beforeend", html);
  const chonNL = document.querySelector(".formChonNL");
  const NguyenLieu = chonNL.querySelectorAll(".nguyenlieu");
  let dsNguyenLieu =
    dsDonXuat.filter((dx) => dx.MaSanPham == MaSanPham)[0]?.dsNguyenLieu ?? [];
  const btnClose = chonNL.querySelector(".btnClose");
  btnClose.addEventListener("click", (e) => {
    chonNL.remove();
  });
  NguyenLieu.forEach((nl) => {
    const soLuongTon = nl.querySelector(".soLuongTon").textContent;
    const soLuong = nl.querySelector(".soLuong");
    const MaChiTiet = nl.querySelector(".MaChiTiet");
    const kho = nl.querySelector(".kho");
    nl.addEventListener("click", (e) => {
      if (e.target.className === "chon") {
        const inputSL = nl.querySelector(".soLuong");
        if (!e.target.checked) {
          inputSL.classList.add("disabled");
          inputSL.setAttribute("disabled", true);
          dsNguyenLieu = dsNguyenLieu.filter(
            (ds) => ds.MaChiTietSanPham !== MaChiTiet.textContent
          );
          return;
        }
        inputSL.classList.remove("disabled");
        inputSL.removeAttribute("disabled");
        dsNguyenLieu.filter((dx) => dx.MaChiTiet == MaChiTiet.textContent)
          .length ||
          dsNguyenLieu.push({
            MaChiTiet: MaChiTiet.textContent,
            MaSanPham: chiTiet[0].MaSanPham,
            TenSanPham: chiTiet[0].TenSanPham,
            SoLuong: soLuong.textContent,
            DonVi: chiTiet[0].DonVi,
            Kho: kho.textContent,
          });
      } else return;
    });
    nl.querySelector(".soLuong").addEventListener("keyup", (e) => {
      if (e.target.value > +soLuongTon) {
        e.target.value = soLuongTon;
      }
      const index = dsNguyenLieu.findIndex(
        (ds) => ds.MaChiTiet === MaChiTiet.textContent
      );
      dsNguyenLieu[index].SoLuong = e.target.value;
    });
  });
  const xacNhan = chonNL.querySelector("#xacNhan");
  xacNhan.addEventListener("click", (e) => {
    const soLuongNhap = dsNguyenLieu.reduce((acc, ds) => acc + +ds.SoLuong, 0);
    if (soLuongNhap !== +SoLuongCan) {
      thongBaoLoi("Vui lòng nhập đúng số lượng yêu cầu!");
      return;
    }
    chonNL.remove();
    dsDonXuat.filter((dx) => dx.MaSanPham == MaSanPham).length ||
      dsDonXuat.push({ MaSanPham, dsNguyenLieu });
    renderChiTietPhanPhoi(id, dsNguyenLieu);
  });
}
async function renderXacNhanCuoi(id) {
  let chiTiet = await layDon(id);
  let html = xacNhan(chiTiet);
  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  const btnLap = document.querySelector("#lapPhieu");
  const btnQuayLai = document.querySelector("#quayLai");
  btnLap.addEventListener("click", async (e) => {
    let res = await lapPhieuXuatKho(chiTiet.MaDon);
    if (res) {
      await modalThongBao("Phân phối đơn yêu cầu thành công!", true);
      window.location.reload();
    } else {
      await modalThongBao("Phân phổi đơn thất bại!", false);
    }
  });
  btnQuayLai.addEventListener("click", (e) => {
    dsDonXuat = [];
    renderChiTiet(id);
  });
}
function showOverlay(id) {
  xoaOverlay();
  window.location.reload();
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
