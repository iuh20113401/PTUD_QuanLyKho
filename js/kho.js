import { toExcel, toPDF } from "./helper.js";
import { menu, menuShow, highLightMenu } from "./menu.js";

async function layToanBoKho() {
  let data;
  await $.ajax({
    url: "../ajax/kho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layTatCaKho",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}

async function themKho(chiTiet) {
  let data;
  await $.ajax({
    url: "../ajax/kho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "themKho",
      maKho: chiTiet.maKho,
      tenKho: chiTiet.tenKho,
      viTri: chiTiet.viTri,
      moTa: chiTiet.moTa,
      sucChua: chiTiet.sucChua,
      loai: chiTiet.loai,
    },
    success: function (response) {
      console.log(response);
      data = JSON.parse(response);
    },
  });
  return data;
}
async function suaKho(chiTiet) {
  let data;
  await $.ajax({
    url: "../ajax/kho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "capNhatKho",
      maKho: chiTiet.maKho,
      tenKho: chiTiet.tenKho,
      viTri: chiTiet.viTri,
      moTa: chiTiet.moTa,
      sucChua: chiTiet.sucChua,
      loai: chiTiet.loai,
    },
    success: function (response) {
      console.log(response);
      data = JSON.parse(response);
    },
  });
  return data;
}
async function xoaKho(chiTiet) {
  let data;
  await $.ajax({
    url: "../ajax/kho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "xoaKho",
      maKho: chiTiet.maKho,
      trangThai: chiTiet.trangThai,
    },
    success: function (response) {
      console.log(response);
      data = JSON.parse(response);
    },
  });
  return data;
}
let dsKho;
async function render(load = null) {
  load ? (dsKho = await layToanBoNguyenLieu()) : null;
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
  let chiTietSanPham = dsKho
    ? dsKho
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
  let html = `<div class="content">
       <h3><a href="kho.html">Kho</a></h3>
        <form class="search">
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
                <select id='loai' class = 'bold selectDisabled' disabled >
                <option value = '1' ${
                  chiTiet.loai == "Nguyên liệu" && `selected`
                }>Nguyên liệu</option>
                <option value = '2' ${
                  chiTiet.loai == "Thành phẩm" && `selected`
                }>Thành phẩm</option>
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
            <div class='mt-1 buttons center'>
                <button class = 'btn primary center' id ='sua'>Sửa </button>
                <button class = 'btn btnXoa center' id ='sua'>Xóa </button>
            </div>
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
  btnSua.addEventListener("click", (e) => {
    renderSua();
  });
  btnXoa.addEventListener("click", async (e) => {
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
    let res = await suaKho(ttk);
    if (res) {
      alert("Cập nhật kho thành công!");
      window.location.reload();
    }
  });
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
    let res = await themKho(ttk);
    if (res) {
      alert("Thêm kho thành công!");
      window.location.reload();
    }
  });
}
function goBack() {
  const quayLai = document.querySelector("#quayLai");
  quayLai.addEventListener("click", async (e) => {
    await init(dsKho);
  });
}
async function renderXoa(id) {
  const chiTiet = dsKho.filter((kho) => kho.MaKho == id)[0];
  console.log(id);
  if (+chiTiet.SucChuaDaDung > 0) {
    alert("Kho này còn hàng không thể xóa");
    return;
  }
  const res = confirm("Bạn có chắc muốn xóa kho này!");
  if (res) {
    const ttk = {
      maKho: id,
      trangThai:
        chiTiet.Loai == "Nguyên liệu"
          ? "Nguyên liệu đã hủy"
          : "Thành phẩm đã hủy",
    };
    let res2 = await xoaKho(ttk);
  }
}
async function init(dsKhoMoi = null) {
  dsKho = dsKhoMoi ? dsKhoMoi : await layToanBoKho();
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
}
await init();
