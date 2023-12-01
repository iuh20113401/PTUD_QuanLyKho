"use strict";
import { MAVAITRO, menu, menuShow, highLightMenu } from "./menu.js";
import {
  getFetch,
  toPDF,
  toExcel,
  thongBaoLoi,
  modalThongBao,
  xoaHang,
  modalXacNhan,
} from "./helper.js";
async function layCongThuc() {
  let data = await getFetch("../ajax/congThuc.php", {
    action: "layCongThuc",
  });
  return data;
}

async function layChiTietCongThuc(maCongThuc) {
  let data = await getFetch("../ajax/congThuc.php", {
    action: "layChiTietCongThuc",
    maCongThuc,
  });
  return data;
}
async function xoaCongThuc(maCongThuc) {
  let data = await getFetch("../ajax/congThuc.php", {
    action: "xoaCongThuc",
    maCongThuc,
  });
  return data;
}
async function layToanBoNguyenLieu() {
  let data = await getFetch("../ajax/sanPham.php", {
    action: "layToanBoNguyenLieu",
  });
  return data;
}
async function themCT(
  maCongThuc,
  tenCongThuc,
  donViCT,
  moTa,
  maSanPham,
  soLuong,
  donVi
) {
  let data = await getFetch("../ajax/congThuc.php", {
    action: "themCongThuc",
    maCongThuc,
    tenCongThuc,
    donViCT,
    moTa,
    maSanPham,
    soLuong,
    donVi,
  });
  console.log(data);
  return data;
}

let dsCongThuc = (await layCongThuc()) || null;
async function render(chiTietNguyenLieu = null) {
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
  let congThuc = dsCongThuc
    ? dsCongThuc
        .map((ct) => {
          return ` <tr>
              <td class ="maCongThuc" id= ${ct.MaCongThuc}>${ct.MaCongThuc}</td>
              <td>${ct.TenCongThuc}</td>
              <td width="30%">
                ${ct.MoTa}
              </td>
              <td>${ct.SoLuongNguyenLieu}</td>
              <td>
                <div class="buttons">
                  <button class="btn large primary" id="xem">Xem</button>
                  <button class="btn large btnXoa xoa" id =${ct.MaCongThuc}>Xóa</button>
                </div>
              </td>
            </tr>`;
        })
        .join("")
    : null;
  let html = `<div class="content">
        <h3>Công thức</h3>
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
          <button type="button" id="themCT" class ="btn primary">Thêm công thức</button>

        </form>
        <div class="content__inner ">
          ${
            dsCongThuc
              ? `<table>
            <tr class="muc">
              <th>Mã công thức</th>
              <th>Tên công thức</th>
              <th>Mô tả</th>
              <th>Số lượng nguyên liệu</th>
              <th>Hành động</th>
            </tr>
           ${congThuc}
          </table>
        </div>
      </div>`
              : `<h3 class="khongDon">Chưa có công thức nào</h3>`
          }`;
  return html;
}
async function renderChiTiet(maCongThuc) {
  let chiTiet = await layChiTietCongThuc(maCongThuc);
  render(chiTiet);
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", init);
}
function contentChiTiet(chiTiet) {
  let congThuc = `<table class="small"><tr>
              <th>Mã nguyên liệu</th>
              <th>Tên nguyên liệu</th>
              <th>Số lượng</th>
              <th>Đơn vị</th>
            </tr>
            ${chiTiet
              .map((e) => {
                return `<tr>
              <td>${e.MaSanPham}</td>
              <td>${e.TenSanPham}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
            </tr>`;
              })
              .join("")}
          </table>`;
  let html = `<div class="content">
        <a href="#"> <h3>Công thức > Xem công thức</h3></a>
       <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        <div class="content__inner chitiet">
          <h3>Chi tiết công thức </h3>
          <p><span class="deMuc">Mã công thức:</span>${chiTiet[0].MaCongThuc}</p>
          <p><span class="deMuc">Tên công thức:</span>${chiTiet[0].TenCongThuc}</p>
          <p><span class="deMuc">Đơn vị:</span>${chiTiet[0].DonViCT}</p>
          <p><span class="deMuc">Mô tả:</span>${chiTiet[0].MoTa}</p>
          <p><span class="deMuc">Danh sách nguyên liệu:</span></p>
          ${congThuc}
          <div class="buttons ">
              <button type='button' class = "btn primary large center" id = 'sua'>Sửa</button>
            <button type='button' class = "btn secondary large center" id = 'quayLai'>Quay lại</button>
          </div>
        </div>
      </div>`;
  return html;
}
function contentThemCongThuc(dsNguyenLieu) {
  let maCongThuc =
    "2" + Math.floor(Math.random() * (9999999 - 1000000) + 1000000);
  let html = `
        <h3>Công thức > Thêm công thức</h3>
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
          <button class ="btn secondary">Quay lại</button>
        </form>
        <div class="content__inner chitiet">
          <h3>Thêm công thức</h3>
          <form action="" class="form">
            <div class="inputInfo--flat mt-1">
              <label for="maCT" class="label" >Mã công thức</label>
              <input type="text" name="maCT" id="maCT" class="inputLarge" readonly value =${maCongThuc} />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="tenCT" class="label">Tên công thức</label>
              <input type="text" name="tenCT" id="tenCT" class="inputLarge" />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="donVi" class="label">Đơn vị</label>
              <input type="text" name="donVi" id="donViCT" class="inputLarge" />
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
            <div class="dsNguyenLieu mt-1">
              <label class="mt-1">Danh sách nguyên liệu</label>
              <div class="row mt-1">
                <select name="nguyenLieu" class="nguyenLieu">
                  ${dsNguyenLieu
                    .map((nl) => {
                      return `<option value="${nl.MaSanPham}">${nl.TenSanPham}</option>`;
                    })
                    .join("")}
                </select>
                <input
                  type="number"
                  placeholder="Nhập số lượng"
                  id="soLuong"
                  class="soLuong"
                />
                <select name="donVi" id="donVi" class="donVi">
                  <option value="g">gam</option>
                  <option value="kg">KG</option>
                </select>
                <button class = 'btn btnXoa btnSuperSmall xoaHang' type ='button'>X</button>
              </div>
              <button type="button" id='themNL' class="btn secondary mt-1">
                Thêm nguyên liệu
              </button>
            </div>
            <div class="buttons center mt-1">
              <button  id = "themCT" class="btn primary large center">Thêm công thức</button>
            </div>
          </form>
        </div>`;
  return html;
}
function themNL(dsNguyenLieu) {
  let html = ` <div class="row mt-1">
                <select name="nguyenLieu" class="nguyenLieu">
                  ${dsNguyenLieu
                    .map((nl) => {
                      return `<option value="${nl.MaSanPham}">${nl.TenSanPham}</option>`;
                    })
                    .join("")}
                </select>
                <input
                  type="number"
                  placeholder="Nhập số lượng"
                  id="soLuong"
                  class="soLuong"
                />
                <select name="donVi" id="donVi" class="donVi">
                  <option value="g">gam</option>
                  <option value="kg">KG</option>
                </select>
                <button class = 'btn btnXoa btnSuperSmall xoaHang' type ='button'>X</button>
              </div>`;
  document.querySelector("#themNL").insertAdjacentHTML("beforebegin", html);
}
async function renderThemChiTiet() {
  let container = document.querySelector(".content");
  const dsNguyenLieu = await layToanBoNguyenLieu();
  container.innerHTML = contentThemCongThuc(dsNguyenLieu);
  const btnThemNL = document.querySelector("#themNL");
  const btnThemCT = document.querySelector("#themCT");
  btnThemNL.addEventListener("click", (e) => {
    themNL(dsNguyenLieu);
  });
  btnThemCT.addEventListener("click", async (e) => {
    e.preventDefault();
    const maCT = document.querySelector("#maCT");
    const tenCT = document.querySelector("#tenCT");
    const donViCT = document.querySelector("#donViCT");
    const moTa = document.querySelector("#moTa");
    const sanPham = document.querySelectorAll(".nguyenLieu");
    const soLuong = document.querySelectorAll(".soLuong");
    const donVi = document.querySelectorAll(".donVi");
    let maSanPham = [];
    let dsSoLuong = [];
    let dsDonvi = [];
    sanPham.forEach((sp) => maSanPham.push(sp.value));
    donVi.forEach((dv, i) => {
      if (dv.value == "g") {
        dsDonvi.push("KG");
        dsSoLuong.push(soLuong[i].value / 1000);
      } else {
        dsDonvi.push("KG");
        dsSoLuong.push(soLuong[i].value);
      }
    });

    const check =
      maCT.value != "" &&
      tenCT.value != "" &&
      moTa.value != "" &&
      maSanPham.length &&
      dsSoLuong.length &&
      dsDonvi.length;
    if (!check) {
      thongBaoLoi("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (
      maSanPham.some((e) => e == "") ||
      dsSoLuong.some((e) => e == 0) ||
      dsSoLuong.some((e) => e < 0)
    ) {
      thongBaoLoi("Vui lòng chọn sản phẩm và số lượng");
      return;
    }
    let res = await themCT(
      maCT.value,
      tenCT.value,
      donViCT.value,
      moTa.value,
      maSanPham,
      dsSoLuong,
      dsDonvi
    );
    if (res) {
      await modalThongBao("Đã thêm công thức thành công!", true);
      window.location.reload();
    } else {
      await modalThongBao("Thêm công thức thất bại!", false);
    }
  });
  xoaHang();
}
function init() {
  render();
  const btnXem = document.querySelectorAll("#xem");
  const btnThem = document.querySelector("#themCT");
  btnXem.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const maCongThuc = btn.closest("tr").children[0].id;
      renderChiTiet(maCongThuc);
    });
  });
  btnThem.addEventListener("click", (e) => {
    renderThemChiTiet();
  });
  document.querySelector(".content").addEventListener("click", async (e) => {
    if (e.target.matches(".xoa")) {
      if (await modalXacNhan("Bạn có chắc muốn xáo công thức này không?")) {
        let res = await xoaCongThuc(e.target.id);
        if (res) {
          await modalThongBao("Xóa công thức thành cồng!", true);
          window.location.reload();
        } else {
          await modalThongBao("Xóa công thức thất bại!", false);
          window.location.reload();
        }
      }
    }
  });
}
init();
