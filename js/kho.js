import {
  toExcel,
  toPDF,
  getFetch,
  modalXacNhan,
  modalThongBao,
  thongBaoLoi,
} from "./helper.js";
import { menu, menuShow, highLightMenu } from "./menu.js";

async function layToanBoKho() {
  let data = await getFetch("../ajax/kho.php", {
    action: "layTatCaKho",
  });
  return data;
}

async function themKho(chiTiet) {
  let data = await getFetch("../ajax/kho.php", {
    action: "themKho",
    maKho: chiTiet.maKho,
    tenKho: chiTiet.tenKho,
    viTri: chiTiet.viTri,
    moTa: chiTiet.moTa,
    sucChua: chiTiet.sucChua,
    loai: chiTiet.loai,
  });
  return data;
}
async function suaKho(chiTiet) {
  let data = await getFetch("../ajax/kho.php", {
    action: "capNhatKho",
    maKho: chiTiet.maKho,
    tenKho: chiTiet.tenKho,
    viTri: chiTiet.viTri,
    moTa: chiTiet.moTa,
    sucChua: chiTiet.sucChua,
    loai: chiTiet.loai,
  });
  return data;
}
async function xoaKho(chiTiet) {
  let data = await getFetch("../ajax/kho.php", {
    action: "xoaKho",
    maKho: chiTiet.maKho,
    trangThai: chiTiet.trangThai,
  });
  console.log(data, chiTiet);
  return data;
}
async function laySanPhamTheoKho(maKho) {
  let data = await getFetch("../ajax/sanPham.php", {
    action: "laySanPhamTheoKho",
    kho: maKho,
  });
  return data;
}
async function capNhatKhoMoi(dsMa, dsKho) {
  let data = await getFetch("../ajax/sanPham.php", {
    action: "capNhatDanhSachKhoMoi",
    dsMa,
    dsKho,
  });
  return data;
}
let dsKho = await layToanBoKho();
let dsKhoSuDung;
async function render(load = null) {
  let html = contentToanBo();
  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  highLightMenu();
}
function contentToanBo() {
  let chiTietSanPham = dsKhoSuDung
    ? dsKhoSuDung
        .map((k) => {
          return `<tr class='' id="${k.MaKho}">
              <td>${k.MaKho}</td>
              <td>${k.TenKho}</td>
              <td>${k.SucChua}</td>
              <td>${k.SucChuaDaDung}</td>
              <td>${k.Loai}</td>
              <td>
                <div class ="buttons">
                    <button class = 'btn primary large xem' id="${k.MaKho}">Xem</button>
                    <button class = 'btn btnXoa large xoa' id="${k.MaKho}">Xóa</button>
                </div>
              </td>
            </tr>`;
        })
        .join("")
    : `<h3 class ="khongDon">Không có đơn yêu cầu nào!</h3`;
  let loai =
    dsKho?.length == dsKhoSuDung?.length ? "all" : dsKhoSuDung[0]?.Loai || null;
  let html = `<div class="content">
       <h3><a href="kho.html">Kho</a></h3>
        <form class="search">
            <select id='loai' class = 'select'>
            <option value='all' >Tất cả</option>
              <option ${
                loai == "Nguyên liệu" ? "selected" : ""
              } value='Nguyên liệu'>Nguyên liệu</option>
              <option ${
                loai == "Thành phẩm" ? "selected" : ""
              } value='Thành phẩm'>Thành phẩm</option>
              <option ${
                loai == "Nguyên liệu đã hủy" ? "selected" : ""
              } value='Nguyên liệu đã hủy'>Nguyên liệu đã hủy</option>
              <option ${
                loai == "Thành phẩm đã hủy" ? "selected" : ""
              } value='Thành phẩm đã hủy'>Thành phẩm đã hủy</option>
            </select>
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
            <button type = 'button' class = 'btn large primary' id = 'themKho'>Thêm kho</button>
          </form>
        <div class="content__inner">
          <table>
            <tr class="muc">
              <th>Mã kho</th>
              <th>Tên kho</th>
              <th>Sức chứa</th>
              <th>Sức chứa đã dùng</th>
              <th>Loại</th>
              <th>Hành động</th>
            </tr>
            ${chiTietSanPham}
          </table>
        </div>
      </div>`;
  return html;
}

function contentChitiet(chiTiet) {
  let html = `
      <h3>Sản phẩm > <a href="nguyenLieu.html">Nguyên liệu</a> > ${
        chiTiet ? chiTiet.MaKho : ""
      }</h3>
        <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
            <button class="btn secondary" id="quayLai">Quay lại</button>
          </form>
        <div class="content__inner chitiet">
            <h3>Thông tin kho</h3>
            <div class = 'inputInfo--flat mt-1'>
                <label for="maKho">Mã kho:</label>
                <input type='text' readonly id='maKho' value =${
                  chiTiet.MaKho
                } />
            </div>
            <div class = 'inputInfo--flat mt-1'>
                <label for="tenKho">Tên kho:</label>
                <input type='text' readonly id='tenKho' value ="${
                  chiTiet.TenKho
                }" />
            </div>
            <div class = 'inputInfo--flat mt-1'>
                <label for="viTri">Vị trí:</label>
                <input type='text' readonly id='viTri' value ="${
                  chiTiet.ViTri
                }" />
            </div>
            <div class = 'inputInfo--flat mt-1'>
                <label for="loai">Loại kho:</label>
                <select id='loai' class = 'bold selectDisabled' disabled  value = ${
                  chiTiet.Loai == "Nguyên liệu" ? 1 : 2
                }>
                <option value = '1' ${
                  chiTiet.Loai == "Nguyên liệu" ? `selected` : ``
                }>Nguyên liệu</option>
                <option value = '2'  ${
                  chiTiet.Loai != "Nguyên liệu" ? `selected` : ``
                } >Thành phẩm</option>
            </select>
            </div>
            <div class = 'inputInfo--flat mt-1'>
                <label for="sucChua">Sức chứa (KG):</label>
                <input type='number' readonly id='sucChua' value ="${
                  chiTiet.SucChua
                }" />
            </div>
            <div class = 'inputInfo--flat mt-1'>
                <label for="sucChuaDaDung">Sức chứa đã dùng (KG):</label>
                <input type='text' readonly id='sucChuaDaDung' value ="${
                  chiTiet.SucChuaDaDung
                }" />
            </div>
            <div class = 'inputInfo--flat mt-1'>
                <label for="moTa">Mô tả:</label>
                <textarea readonly cols='140' id = 'moTa' rows = '5'>${
                  chiTiet.MoTa
                }</textarea>
            </div>
            ${
              chiTiet.Loai == "Nguyên liệu" || chiTiet.Loai == "Thành phẩm"
                ? `<div class='mt-1 buttons center'>
                <button class = 'btn primary center' id ='sua'>Sửa </button>
                <button class = 'btn btnXoa center' id ='sua'>Xóa </button>
            </div>`
                : ``
            }
        </div>`;
  return html;
}
function contentThemKho() {
  let html = `<h3><a href ="kho.html">Kho</a> > Thêm kho</h3>
        <form class="search">
          <div class="inputGroup">
            <input type="text" name="search" id="search" />
            <button type="button">
              <i
                class="fa-solid fa-magnifying-glass"
                style="color: #1e5cc8"
              ></i>
            </button>
          </div>
          <button id='quayLai' class ="btn secondary">Quay lại</button>
        </form>
        <div class="content__inner chitiet">
          <h3>Thêm kho</h3>
          <form action="" class="form">
            <div class="inputInfo--flat mt-1">
              <label for="maKho" class="label" >Mã kho</label>
              <input type="text" name="maKho" id="maKho" class="inputLarge" readonly value =${Math.floor(
                Math.random() * 1000
              )} />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="tenKho" class="label">Tên kho</label>
              <input type="text" name="tenKho" id="tenKho" class="inputLarge" />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="viTri" class="label">Vị trí</label>
              <input type="text" name="viTri" id="viTri" class="inputLarge" />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="sucChua" class="label">Sức chứa</label>
              <input type="number" name="sucChua" id="sucChua" class="inputLarge" />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="moTa" class="label">Mô tả</label>
              <textarea
                name="moTa"
                id="moTa"
                cols="90"
                rows="5"
                class="textarea"
              ></textarea>
            </div>
            <div class= "inputInfo--flat mt-1">
            <label  class="label">Loại kho</label>
            <select id='loai' class = 'select' >
                <option value = '1'>Nguyên liệu</option>
                <option value = '2'>Thành phẩm</option>
            </select>
            </div>
            <div class='mt-1 warning '  ></div>
            <div class="buttons center mt-1">
              <button type='button'  id = "themKho" class="btn primary large center">Thêm kho</button>
            </div>
          </form>
        </div>`;
  return html;
}
function renderChiTiet(id) {
  const dsChiTietSanPham = dsKho.filter((kho) => kho.MaKho == id)[0];
  document.querySelector(".content").innerHTML =
    contentChitiet(dsChiTietSanPham);
  actionXem();
}
async function actionXem() {
  const btnSua = document.querySelector("#sua");
  const btnXoa = document.querySelector("#xoa");
  btnSua?.addEventListener("click", (e) => {
    renderSua();
  });
  btnXoa?.addEventListener("click", async (e) => {
    await renderXoa(document.querySelector("#maKho"));
  });
  goBack();
}
async function renderSua() {
  let html = `<button class = 'btn secondary center' id ='xem'> Quay lại</button>
                <button class = 'btn primary center' id ='xacNhan'>Xác nhận </button>`;
  const buttons = document.querySelector(".buttons");
  buttons.innerHTML = html;
  const tenKho = document.querySelector("#tenKho");
  const viTri = document.querySelector("#viTri");
  const moTa = document.querySelector("#moTa");
  const sucChua = document.querySelector("#sucChua");
  const loai = document.querySelector("#loai");
  tenKho.removeAttribute("readonly");
  viTri.removeAttribute("readonly");
  moTa.removeAttribute("readonly");
  sucChua.removeAttribute("readonly");
  loai.removeAttribute("disabled");
  let btnXem = document.querySelector("#xem");
  let btnXacNhan = document.querySelector("#xacNhan");
  btnXem.addEventListener("click", (e) => {
    tenKho.setAttribute("readonly", true);
    viTri.setAttribute("readonly", true);
    moTa.setAttribute("readonly", true);
    sucChua.setAttribute("readonly", true);
    loai.setAttribute("disabled", true);
    let html = `<button class = 'btn primary center' id ='sua'>Sửa</button>
                <button class = 'btn btnXoa center' id ='xoa'>Xóa </button>`;
    const buttons = document.querySelector(".buttons");
    buttons.innerHTML = html;
    actionXem();
  });
  btnXacNhan.addEventListener("click", async (e) => {
    const maKho = document.querySelector("#maKho");
    const ttk = {
      maKho: maKho.value,
      tenKho: tenKho.value,
      viTri: viTri.value,
      moTa: moTa.value,
      sucChua: sucChua.value,
      loai: loai.value == 1 ? "Nguyên liệu" : "Thành phẩm",
    };
    if (
      !(
        maKho.value &&
        tenKho.value &&
        viTri.value &&
        moTa.value &&
        sucChua.value
      )
    ) {
      thongBaoLoi("Vui lòng nhập đầy đủ thông tin ");
      return;
    }
    let res = await suaKho(ttk);
    if (res) {
      await modalThongBao("Cập nhật kho thành công", true);
      window.location.reload();
    }
  });
}
function kiemTraDuLieuNhap(ttk) {
  return Object.values(ttk).every((value) => value.trim() !== "");
}

async function renderThem() {
  let html = contentThemKho();
  document.querySelector(".content").innerHTML = html;
  goBack();
  let btnThem = document.querySelector("#themKho");
  btnThem.addEventListener("click", async (e) => {
    const maKho = document.querySelector("#maKho").value;
    const tenKho = document.querySelector("#tenKho").value;
    const viTri = document.querySelector("#viTri").value;
    const moTa = document.querySelector("#moTa").value;
    const sucChua = document.querySelector("#sucChua").value;
    const loai = document.querySelector("#loai").value;

    const ttk = {
      maKho,
      tenKho,
      viTri,
      moTa,
      sucChua,
      loai: loai == 1 ? "Nguyên liệu" : "Thành phẩm",
    };

    if (!kiemTraDuLieuNhap(ttk)) {
      thongBaoLoi("Vui lòng nhập đủ tất cả thông tin!");
      return;
    }

    let res = await themKho(ttk);
    if (res) {
      await modalThongBao("Thêm kho thành công!", true);
      window.location.reload();
    }
  });
}

function goBack() {
  const quayLai = document.querySelector("#quayLai");
  quayLai.addEventListener("click", async (e) => {
    await init(dsKhoSuDung);
  });
}
async function renderXoa(id) {
  const chiTiet = dsKho.filter((kho) => kho.MaKho == id)[0];
  let checkSoLuong = dsKho.reduce((acc, kho) => {
    if (chiTiet.Loai == kho.Loai && kho.MaKho != id) {
      return (acc += +kho.SucChua - +kho.SucChuaDaDung);
    } else {
      return acc;
    }
  }, 0);
  if (chiTiet.SucChuaDaDung > checkSoLuong) {
    await modalThongBao(
      "Hiện tại không có kho có đủ số lượng để chuyển sản phẩm?",
      false
    );
    return;
  }
  if (+chiTiet.SucChuaDaDung > 0) {
    let res = await modalXacNhan(
      "Hiện tại kho này đang còn sản phẩm, bạn có chắc muốn xóa kho này không?"
    );
    if (res) {
      let danhSachSanPham = await laySanPhamTheoKho(chiTiet.MaKho);
      hienThiDanhSachSanPham(danhSachSanPham, chiTiet.Loai, chiTiet.MaKho);
      return;
    }
  }
  // Tiếp tục với xóa kho nếu không còn sản phẩm
  const res = await modalXacNhan("Bạn có chắc muốn xóa kho này!");
  if (res) {
    let res2 = await xoaKho({ maKho: id, trangThai: "Kho đã hủy" });
    if (res2) {
      await modalThongBao("Xóa kho thành công", true);
      window.location.reload();
    }
  }
}
// Hàm hiển thị danh sách sản phẩm
function hienThiDanhSachSanPham(danhSach, loai, maKho) {
  document.body.insertAdjacentHTML("beforeend", chonKho(danhSach, loai, maKho));
  const btnClose = document.querySelector(".btnClose");
  btnClose.addEventListener("click", (e) => {
    btnClose.closest(".formChonNL").remove();
  });
  document.querySelectorAll(".khoMoi").forEach((selectBox) => {
    selectBox.addEventListener("change", function () {
      capNhatSucChuaKho(this);
    });
  });
  const btnXacNhan = document.querySelector("#xacNhan");
  btnXacNhan.addEventListener("click", async (e) => {
    let [dsMa, dsKhoMoi] = kiemTraTruocKhiXacNhan();
    if (!dsMa) {
      thongBaoLoi("Vui lòng chọn đầy đủ kho");
      return;
    }
    let isDay = dsKho.every((kho) => kho.SucChua - kho.SucChuaDaDung >= 0);
    if (!isDay) {
      thongBaoLoi("Vui lòng chọn đúng sức chứa của kho");
      return;
    }
    let res = await capNhatKhoMoi(dsMa, dsKhoMoi);
    const ttk = {
      maKho,
      trangThai: "Kho đã hủy",
    };
    let res2 = await xoaKho(ttk);
    if (res && res2) {
      document.querySelector(".formChonNL").remove();
      await modalThongBao("Xóa kho thành công!", true);
      window.location.reload();
    } else {
      document.querySelector(".formChonNL").remove();

      await modalThongBao("Xóa kho thất bại", false);
      window.location.reload();
    }
  });
}
function capNhatSucChuaKho(selectBox) {
  let maKhoMoi = selectBox.value;
  let maKhoCu = selectBox.getAttribute("data-kho-cu");
  let soLuongTon = Number(
    selectBox.closest(".nguyenlieu").querySelector(".soLuongTon").textContent
  );

  if (maKhoCu) {
    // Giảm sức chứa đã dùng của kho cũ
    let khoCu = dsKho.find((kho) => kho.MaKho === +maKhoCu);
    khoCu.SucChuaDaDung -= soLuongTon;
  }
  // Tăng sức chứa đã dùng của kho mới
  let khoMoi = dsKho.find((kho) => kho.MaKho === +maKhoMoi);
  khoMoi.SucChuaDaDung += soLuongTon;
  capNhatDanhSachSelectBox();
  // Cập nhật kho cũ
  selectBox.setAttribute("data-kho-cu", maKhoMoi);
}
function capNhatDanhSachSelectBox() {
  document.querySelectorAll(".khoMoi").forEach((selectBox) => {
    let soLuongTonHienTai = Number(
      selectBox.closest(".nguyenlieu").querySelector(".soLuongTon").textContent
    );
    let maKhoHienTai = selectBox.value;
    let [maKho, loaiHienTai] = document.querySelector(".maKho").id.split("/");
    let danhSachKhoCapNhat = danhSachKhoPhuHop(
      soLuongTonHienTai,
      loaiHienTai,
      +maKho
    );

    selectBox.innerHTML =
      `<option value =''>Chọn kho mới</option>` +
      danhSachKhoCapNhat
        .map(
          (kho) =>
            `
          <option value='${kho.MaKho}' ${
              kho.MaKho === +maKhoHienTai ? "selected" : ""
            }>${kho.TenKho} ${kho.SucChuaDaDung} / ${kho.SucChua}</option>`
        )
        .join("");
  });
}

function danhSachKhoPhuHop(soLuongTon, loai, maKho) {
  return dsKho.filter(
    (kho) =>
      kho.Loai == loai &&
      kho.SucChua - kho.SucChuaDaDung >= +soLuongTon &&
      kho.MaKho != maKho
  );
}
function kiemTraTruocKhiXacNhan() {
  let coLoi = false;
  let dsMa = [];
  let dsKho = [];
  document.querySelectorAll(".nguyenlieu").forEach((nl) => {
    let maKhoDuocChon = nl.querySelector(".khoMoi").value;
    let MaChiTietSanPham = nl.children[0].textContent;
    if (!maKhoDuocChon) {
      coLoi = true;
      return;
    }
    dsMa.push(MaChiTietSanPham);
    dsKho.push(maKhoDuocChon);
  });
  return coLoi ? [false, false] : [dsMa, dsKho];
}

function chonKho(danhSachNL, loai, maKho) {
  danhSachNL = danhSachNL.filter((nl) => nl.SoLuongTon > 0);
  let dsNguyenLieu = danhSachNL
    .map((nl) => {
      let danhSachKho = danhSachKhoPhuHop(nl.SoLuongTon, loai, maKho);
      return `<tr class ="nguyenlieu">
              <td>${nl.MaChiTietSanPham}</td>
              <td>${nl.TenSanPham}</td>
              <td class = 'soLuongTon'>${nl.SoLuongTon}</td>
              <td>${nl.DonVi}</td>
              <td>
                <select class='khoMoi'>
                <option value =''>Chọn kho mới</option>
                  ${danhSachKho
                    .map((kho) => {
                      return `<option value='${kho.MaKho}'>${kho.TenKho} ${kho.SucChuaDaDung} / ${kho.SucChua}</option>`;
                    })
                    .join("")}
                
                </select>  
              </td>
            </tr>`;
    })
    .join("");
  let html = `<div class="formChonNL">
      <div class="overlay"></div>
      <div class="dsNguyenLieu float">
        <div class="top">
          <h3 class ="maKho" id ="${maKho}/${loai}">Danh sách sản phẩm trong kho ${maKho}</h3>
          <button class="btn btnClose">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="content__inner">
          <table>
            <tr>
              <th>Mã chi tiết sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng tồn</th>
              <th>Đơn vị</th>
              <th>Kho mới</th>
            </tr>
            ${dsNguyenLieu}
          </table>
        </div>
        <div class="bottomDs">
          <button class="btn primary center" id="xacNhan">Xác nhận</button>
      </div>
    </div>`;
  return html;
}
async function init(dsKhoMoi = null) {
  dsKhoSuDung = dsKhoMoi ? dsKhoMoi : dsKho;
  render();
  const btnXem = document.querySelectorAll(".xem");
  btnXem.forEach((xem) => {
    xem.addEventListener("click", async (e) => {
      renderChiTiet(xem.id);
    });
  });
  const btnThem = document.querySelector("#themKho");
  btnThem.addEventListener("click", (e) => {
    renderThem();
  });
  const btnXoa = document.querySelectorAll(".xoa");
  btnXoa.forEach((xoa) => {
    xoa.addEventListener("click", async (e) => {
      await renderXoa(xoa.id);
    });
  });
  function locDanhSachKho(loaiKho) {
    // Lọc danh sách kho dựa trên loại kho được chọn
    return dsKho.filter((kho) => loaiKho === "all" || kho.Loai == loaiKho);
  }

  // Thêm sự kiện onChange cho select lọc kho
  document.getElementById("loai").addEventListener("change", function () {
    const loaiKhoDuocChon = this.value;
    dsKhoSuDung = locDanhSachKho(loaiKhoDuocChon);
    init(dsKhoSuDung);
  });
}
await init();
