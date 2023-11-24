import {
  toExcel,
  toPDF,
  getFetch,
  thongBaoLoi,
  modalXacNhan,
  modalThongBao,
} from "./helper.js";
import { menu, menuShow, highLightMenu } from "./menu.js";

async function laySanPhamHetHan() {
  let data = await getFetch("../ajax/sanPham.php", {
    action: "laySanPhamHetHan",
  });
  return data;
}
async function laySanPhamHetSoLuong() {
  let data = await getFetch("../ajax/sanPham.php", {
    action: "laySanPhamHetSoLuong",
  });
  return data;
}
async function xoaChiTietSanPham(maChiTietSanPham) {
  let data = await getFetch("../ajax/sanPham.php", {
    action: "capNhatXoaChiTietSanPham",
    maChiTietSanPham,
  });
  return data;
}
let dsHetHan;
let dsHetSoLuong;
let dsSuDung;
let dsTieuHuy = [];
let ds = 1;
let loai = 1;
async function render(load = true) {
  if (load) {
    dsHetHan = (await laySanPhamHetHan()) || null;
    dsHetSoLuong = (await laySanPhamHetSoLuong()) || null;
    dsSuDung = dsHetHan?.filter((sp) => sp.Loai == "Nguyên liệu");
  }
  let html;
  switch (+ds) {
    case 1:
      html = contentHetHan();
      html = `${menu()}
      ${html}
      `;
      break;
    case 2:
      html = contentSoLuong();
      html = `${menu()}
      ${html}
      `;
      break;
    default:
      break;
  }

  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  highLightMenu();
}
function contentHetHan() {
  let chiTietSanPham = dsSuDung
    ?.map((sp) => {
      return `<tr class='' id="${sp.MaChiTietSanPham} ">
                    <td><input type = 'checkbox' class = 'tieuHuy' id = ${sp.MaChiTietSanPham} /></td>

              <td>${sp.MaChiTietSanPham}</td>
              <td>${sp.TenSanPham}</td>
              <td>${sp.SoLuongTon}</td>
              <td>${sp.SoLuongChoXuat}</td>
              <td>${sp.NgaySanXuat}</td>
              <td class = 'textError'>${sp.NgayHetHan}</td>
              <td>
                ${sp.TenKho}
              </td>
            </tr>`;
    })
    .join("");
  let html = `<div class="content">
       <h3><a href="kho.html">Sản phẩm</a> > Sản phẩm hết hạn</h3>
        <form class="search">
            <select id='danhSach' >
                <option value = '1' ${
                  ds == 1 ? "selected" : ""
                }>Sản phẩm hết hạn</option>
                <option value = '2' ${
                  ds == 2 ? "selected" : ""
                }>Sản phẩm hết số lượng</option>
            </select>
            <select id='loai' >
                <option value = '1' ${
                  loai == 1 ? "selected" : ""
                }>Nguyên liệu</option>
                <option value = '2' ${
                  loai == 2 ? "selected" : ""
                }>Thành phẩm</option>
            </select>
          </form>
        <div class="content__inner">
          ${
            dsHetHan
              ? `<table>
            <tr class="muc ">
              <th><input type = 'checkbox' /></th>
              <th>Mã chi tiết sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng tồn</th>
              <th>Số lượng chờ xuất</th>
              <th>Ngày sản xuất</th>
              <th>Ngày hết hạn</th>
              <th>Kho</th>
            </tr>
            ${chiTietSanPham}
          </table>
          `
              : `<h3 class = 'khongDon'>Không có sản phẩm nào sắp hết hạn!</h3>`
          }
        </div>
        ${
          dsSuDung
            ? `<button class ='btn secondary' disabled>Yêu cầu tiêu hủy</button>`
            : ``
        }
      </div>`;
  return html;
}
function contentSoLuong() {
  let chiTietSanPham = dsSuDung
    ?.map((sp) => {
      return `<tr class='' id="${sp.MaSanPham}">
              <td>${sp.MaSanPham}</td>
              <td>${sp.TenSanPham}</td>
              <td>${sp.SoLuongTon}</td>
              <td>${sp.SoLuongChoNhap}</td>
              <td>${sp.SoLuongChoXuat}</td>
              <td>${sp.Loai}</td>
              
            </tr>`;
    })
    .join("");
  let loai = dsSuDung[0].Loai == "Nguyên liệu" ? 1 : 2;
  let html = `<div class="content">
       <h3><a href="kho.html">Sản phẩm</a> > Sản phẩm hết số lượng</h3>
        <form class="search">
            <select id='danhSach' >
                <option value = '1' ${
                  ds == 1 ? "selected" : ""
                }>Sản phẩm hết hạn</option>
                <option value = '2' ${
                  ds == 2 ? "selected" : ""
                }>Sản phẩm hết số lượng</option>
            </select>
            <select id='loai' >
                <option value = '1' ${
                  loai == 1 ? "selected" : ""
                }>Nguyên liệu</option>
                <option value = '2' ${
                  loai == 2 ? "selected" : ""
                }>Thành phẩm</option>
            </select>
          </form>
        <div class="content__inner">
          ${
            dsHetSoLuong
              ? `<table>
            <tr class="muc">
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng tồn</th>
              <th>Số lượng chờ nhập</th>
              <th>Số lượng chờ xuất</th>
              <th>Loại</th>
            </tr>
            ${chiTietSanPham}
          </table>`
              : `<h3 class = 'khongDon'>Không có sản phẩm nào sắp hết hạn!</h3>`
          }
        </div>
      </div>`;
  return html;
}
async function renderXoa() {
  let res = await modalXacNhan(
    "Bạn có chắc muốn tiêu hủy sản phẩm này! Nếu bạn xác nhận thì toàn bộ phiếu xuất liên quan đến sản phẩm này cũng sẽ bị hủy theo"
  );
  if (res) {
    let resTieuHuy = await xoaChiTietSanPham(dsTieuHuy);
    let res3;
    if (resTieuHuy) {
      res3 = await modalThongBao("Tiêu hủy sản phẩm thành công", true);
    } else {
      res3 = await modalThongBao("Tiêu hủy sản phẩm thất bại", false);
    }
    init();
  }
}
async function init(load = true) {
  await render(load);
  const btnXem = document.querySelectorAll(".xem");
  btnXem.forEach((xem) => {
    xem.addEventListener("click", async (e) => {
      console.log(xem.id);
      renderChiTiet(xem.id);
    });
  });
  const btnXoa = document.querySelectorAll(".xoa");
  btnXoa.forEach((xoa) => {
    xoa.addEventListener("click", async (e) => {
      await renderXoa(xoa.id);
    });
  });
  const loai = document.querySelector("#loai");
  const danhSach = document.querySelector("#danhSach");
  loai.addEventListener("change", (e) => {
    if (danhSach.value == 1) {
      changeLoai(dsHetHan, loai.value);
      return;
    }
    changeLoai(dsHetSoLuong, loai.value);
    return;
  });
  danhSach.addEventListener("change", (e) => {
    ds = danhSach.value;
    if (ds == 2) {
      changeDs(dsHetSoLuong);
    } else {
      changeDs(dsHetHan);
    }
    init(false);
  });
  document.querySelectorAll(".tieuHuy").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      handleCheckboxChange(this);
    });
  });
  const btnTieuHuy = document.querySelector(".btn.secondary");
  btnTieuHuy?.addEventListener("click", renderXoa);
}
function handleCheckboxChange(checkbox) {
  const maChiTietSanPham = +checkbox.closest("tr").id;
  if (checkbox.checked) {
    dsTieuHuy.push(maChiTietSanPham);
  } else {
    dsTieuHuy = dsTieuHuy.filter((ma) => ma !== maChiTietSanPham);
  }
  updateTieuHuyButton();
}
function updateTieuHuyButton() {
  const btnTieuHuy = document.querySelector(".btn.secondary");
  if (dsTieuHuy.length > 0) {
    btnTieuHuy.removeAttribute("disabled");
    btnTieuHuy.classList.remove("seondary");
    btnTieuHuy.classList.add("btnXoa");
  } else {
    btnTieuHuy.setAttribute("disabled", "disabled");
    btnTieuHuy.classList.add("seondary");
    btnTieuHuy.classList.remove("btnXoa");
  }
}

function changeDs(ds) {
  dsSuDung = ds?.filter((sp) => sp.Loai == "Nguyên liệu");
  loai = 1;
}
function changeLoai(ds, value) {
  if (value == 1) {
    dsSuDung = ds?.filter((sp) => sp.Loai == "Nguyên liệu");
    loai = 1;
  } else {
    dsSuDung = ds?.filter((sp) => sp.Loai == "Thành phẩm");
    loai = 2;
  }
  init(false);
}
await init();
