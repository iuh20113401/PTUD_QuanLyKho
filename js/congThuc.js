"use strick";
import { MAVAITRO, menu, menuShow, highLightMenu } from "./menu.js";
async function layCongThuc() {
  let data;
  await $.ajax({
    url: "../ajax/congThuc.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layCongThuc",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}

async function layChiTietCongThuc(maCongThuc) {
  let data;
  await $.ajax({
    url: "../ajax/congThuc.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layChiTietCongThuc",
      maCongThuc,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function layToanBoNguyenLieu() {
  let data;
  await $.ajax({
    url: "../ajax/sanPham.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layToanBoNguyenLieu",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function themCT(
  maCongThuc,
  tenCongThuc,
  moTa,
  maSanPham,
  soLuong,
  donVi
) {
  maCongThuc, tenCongThuc, moTa, maSanPham;
  let data;
  await $.ajax({
    url: "../ajax/congThuc.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "themCongThuc",
      maCongThuc,
      tenCongThuc,
      moTa,
      maSanPham,
      soLuong,
      donVi,
    },
    success: function (response) {
      response;
      data = JSON.parse(response);
    },
  });
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
                  <button class="btn large btnXoa" id="xoa">Xóa</button>
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
          <p><span class="deMuc">Mô tả:</span>${chiTiet[0].MoTa}</p>
          <p><span class="deMuc">Danh sách nguyên liệu:</span></p>
          ${congThuc}
        </div>
      </div>`;
  return html;
}
function contentThemCongThuc(dsNguyenLieu) {
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
              <input type="text" name="maCT" id="maCT" class="inputLarge" readonly value =${Math.floor(
                Math.random() * 1000
              )} />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="tenCT" class="label">Tên công thức</label>
              <input type="text" name="tenCT" id="tenCT" class="inputLarge" />
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
    let res = await themCT(
      maCT.value,
      tenCT.value,
      moTa.value,
      maSanPham,
      dsSoLuong,
      dsDonvi
    );
    if (res) {
      let newRes = confirm("Đã thêm thành công");
      if (newRes || !newRes) {
        window.location.reload();
      }
    }
  });
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
}
init();
