import {
  toExcel,
  toPDF,
  getFetch,
  thongBaoLoi,
  modalXacNhan,
  modalThongBao,
} from "./helper.js";
import { menu, menuShow, highLightMenu } from "./menu.js";

async function laySanPhamTieuHuy() {
  let data = await getFetch("../ajax/sanPham.php", {
    action: "laySanPhamTieuHuy",
  });
  return data || null;
}
async function xoaChiTietSanPham(maChiTietSanPham) {
  let data = await getFetch("../ajax/sanPham.php", {
    action: "xoaChiTietSanPham",
    maChiTietSanPham,
  });
  return data;
}
let dsHetHan;
let dsSuDung;
let dsTieuHuy = [];
let ds = 1;
let loai = 1;
async function render(load = true) {
  if (load) {
    dsHetHan = (await laySanPhamTieuHuy()) || null;
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

              <td>${sp.MaChiTietSanPham}</td>
              <td>${sp.TenSanPham}</td>
              <td>${sp.SoLuongTon}</td>
              <td>${sp.SoLuongChoTieuHuy}</td>
              <td>${sp.NgaySanXuat}</td>
              <td class = 'textError'>${sp.NgayHetHan}</td>
              <td>
                <button class = 'tieuHuy btnXoa btn large full' id =${sp.MaChiTietSanPham} >Tiêu hủy</button>
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
                }>Sản phẩm</option>
                <option value = '2' ${
                  ds == 2 ? "selected" : ""
                }>Biên bản kiểm kê</option>
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
              <th>Mã chi tiết sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng tồn</th>
              <th>Số lượng chờ tiêu hủy</th>
              <th>Ngày sản xuất</th>
              <th>Ngày hết hạn</th>
              <th>Hành động</th>
            </tr>
            ${chiTietSanPham}
          </table>
          `
              : `<h3 class = 'khongDon'>Không có sản phẩm nào sắp hết hạn!</h3>`
          }
        </div>
      </div>`;
  return html;
}

async function renderXoa(id) {
  let res = await modalXacNhan("Bạn xác nhận đã tiêu hủy sản phẩm này?");
  if (res) {
    let resTieuHuy = await xoaChiTietSanPham(id);
    if (resTieuHuy) {
      await modalThongBao("Tiêu hủy sản phẩm thành công", true);
    } else {
      await modalThongBao("Tiêu hủy sản phẩm thất bại", false);
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
  const btnXoa = document.querySelectorAll(".tieuHuy");
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
