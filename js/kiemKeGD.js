"use strick";
import { MAVAITRO, menu, menuShow, highLightMenu } from "./menu.js";
<<<<<<< HEAD
import { toExcel, toPDF, getFetch } from "./helper.js";
async function layDonKiemKeTheoTaiKhoan() {
  let data = await getFetch("../ajax/kiemKe.php", {
    action: "layDonYeuCauTheoTaiKhoan",
=======
import { toExcel, toPDF } from "./helper.js";
async function layDonKiemKeTheoTaiKhoan() {
  let data;
  await $.ajax({
    url: "../ajax/kiemKe.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layDonYeuCauTheoTaiKhoan",
    },
    success: function (response) {
      console.log(response);
      data = JSON.parse(response);
    },
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
  });
  return data;
}

async function laySanPham(don) {
<<<<<<< HEAD
  let data = await getFetch("../ajax/sanPham.php", {
    action: "layMotSoSanPhamTheoKho",
    kho: don.Kho,
    maSanPham: don.MoTa.split(","),
=======
  let data;
  await $.ajax({
    url: "../ajax/sanPham.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layMotSoSanPhamTheoKho",
      kho: don.Kho,
      maSanPham: don.MoTa.split(","),
    },
    success: function (response) {
      console.log(response);
      data = JSON.parse(response);
    },
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
  });
  return data;
}

async function capNhatTrangThai(don, trangThai) {
<<<<<<< HEAD
  let data = await getFetch("../ajax/kiemKe.php", {
    action: "capNhatTrangThai",
    maDon: don.MaKiemKe,
    trangThai,
=======
  let data;
  await $.ajax({
    url: "../ajax/kiemKe.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "capNhatTrangThai",
      maDon: don.MaKiemKe,
      trangThai,
    },
    success: function (response) {
      console.log(response);
      data = JSON.parse(response);
    },
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
  });
  return data;
}
async function layChiTietDonKiemKeLoi(don) {
<<<<<<< HEAD
  let data = await getFetch("../ajax/kiemKe.php", {
    action: "layChiTietDonKiemKeLoi",
    maKiemKe: don.MaKiemKe,
=======
  let data;
  await $.ajax({
    url: "../ajax/kiemKe.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layChiTietDonKiemKeLoi",
      maKiemKe: don.MaKiemKe,
    },
    success: function (response) {
      console.log(response);
      data = JSON.parse(response);
    },
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
  });
  return data;
}
let dsDon;
async function render(loai = null, chiTietNguyenLieu = null, trangThai = null) {
  let html;
  switch (loai) {
    case "them":
      html = contentThem();
      break;
    case "sua":
      html = await contentChiTiet(chiTietNguyenLieu);
      break;
    case "loi":
      html = await contentDonLoi(chiTietNguyenLieu);
      break;
    default:
      html = content();
      break;
  }

  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  highLightMenu();
}
function content(trangThai = null) {
  let dsDonKiemKe = dsDon
    .map((don) => {
      return `<tr>
              <td>${don.MaKiemKe}</td>
              <td>${don.NgayLap}</td>
              <td>${don.Kho}</td>
              <td>${don.Loai}</td>
              <td>${don.TinhTrang}</td>
              <td>
                <button class="xem btn primary center large " id=${don.MaKiemKe}>
                  Xem
                </button>
              </td>
            </tr>`;
    })
    .join("");
  let html = `        
       <div class="content">
        <a href="#"> <h3>Đon kiểm kê</h3></a>
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
        </form>
        <div class="content__inner">
          ${
            dsDon
              ? `<table>
            <tr class="muc">
              <th>Mã đơn</th>
              <th>Ngày lập</th>
              <th>Kho</th>
              <th>Loại</th>
              <th>Tình trạng</th>
              <th>Hành dộng</th>
            </tr>
            ${dsDonKiemKe}
          </table>`
              : `<h3 class = 'khongDon'>Không có đơn nào</h3>`
          }
        </div>
      </div>`;
  return html;
}
async function contentChiTiet(chiTiet) {
  let dsNguyenLieu;
  if (chiTiet.Loai == "Theo sản phẩm") {
    dsNguyenLieu = await laySanPham(chiTiet);

    dsNguyenLieu = dsNguyenLieu
      .map((sp) => {
        return `
          <div div class="mt-1" id='danhsachNL' >
          <div class="mt-1" >
            <input class='input' value = "${sp.TenSanPham}" readonly/>
          </div>`;
      })
      .join("");
  }
  let html = `<div class="content">
        <a href="#"> <h3>Đon kiểm kê</h3> > ${chiTiet.MaKiemKe}</a>
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
          <button type="button" class="btn primary large" id="themKK">
            Lập đơn kiểm kê
          </button>
        </form>
        <div class="content__inner chitiet">
          <h3>Lập đon kiểm kê</h3>
          <p><span class="deMuc">Mã đơn:</span>${chiTiet.MaKiemKe}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.TenDangNhap}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <p><span class="deMuc">Tình trạng:</span>${chiTiet.TinhTrang}</p>
          <div class="inputInfo--flat">
            <label for="" class="labelLarge">Kho</label>
            <select name="kho" id="kho" readonly>
              <option id = 'kho'> ${chiTiet.Kho}</option>
            </select>
          </div>
          <div class="inputInfo--flat mt-1" id='divLoai'>
            <label for="" class="labelLarge">Loại</label>
            <select name="loai" id="loai" readonly>
              <option id = 'loai'>${chiTiet.Loai}</option>
            </select>
          </div>
          <div id="danhSachNguyenLieu" >
          ${
            dsNguyenLieu
              ? `<h4 class="mt-1">Danh sách nguyên liệu cần kiểm kê</h4>
              ${dsNguyenLieu}`
              : ""
          }</div>
          ${
            chiTiet.TinhTrang == "Chờ duyệt"
              ? `<div class ="buttons">
              <button class="btn  center primary mt-1" id ='duyet'>
            Duyệt đơn
          </button>
          <button class="btn  center btnXoa mt-1" id ='khongDuyet'>
            Không duyệt
          </button>
          <button class="btn  center secondary mt-1" id ='quayLai'>
            Quay lại
          </button>
              </div>`
              : `
            <button class="btn large center secondary mt-1" id ='quayLai'>
            Quay lại
          </button>`
          }
        </div>
      </div>`;
  return html;
}
function goBack() {
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    init();
  });
}
async function renderChiTiet(id) {
  let chitiet = dsDon.filter((don) => don.MaKiemKe == id)[0];
  if (chitiet.TinhTrang === "Lỗi" || chitiet.TinhTrang == "Đã tiêu hủy")
    await renderChiTietLoi(chitiet);
  else await renderChiTietKhacLoi(chitiet);
}
async function renderChiTietLoi(chitiet) {
  await render("loi", chitiet);
  goBack();
  if (chitiet.TinhTrang === "Lỗi") {
    const btnHuy = document.querySelector("#tieuHuy");
    btnHuy.addEventListener("click", async (e) => {
      let res = await capNhatTrangThai(chitiet, 5);
      if (res) {
        alert("Đã tiêu hủy thành công ");
        window.location.reload();
      }
    });
  }
}
async function renderChiTietKhacLoi(chitiet) {
  await render("sua", chitiet);
  goBack();
  if (chitiet.TinhTrang == "Chờ duyệt") {
    const btnDuyet = document.querySelector("#duyet");
    const btnKhongDuyet = document.querySelector("#khongDuyet");
    btnDuyet.addEventListener("click", async (e) => {
      let res = await capNhatTrangThai(chitiet, 2);
      if (res) {
        alert("Duyệt đơn thành công!");
        window.location.reload();
      }
    });
    btnKhongDuyet.addEventListener("click", async (e) => {
      let res = await capNhatTrangThai(chitiet, 1);
      if (res) {
        alert("Cập nhật đơn thành công!");
        window.location.reload();
      }
    });
  }
}
async function contentDonLoi(chiTiet) {
  let dsNguyenLieuLoi = await layChiTietDonKiemKeLoi(chiTiet);
  console.log(dsNguyenLieuLoi);
  dsNguyenLieuLoi = dsNguyenLieuLoi
    .map((sp) => {
      return `
          <tr>
            <td>${sp.MaChiTietSanPham}</td>
            <td>${sp.TenSanPham}</td>
            <td>${sp.TinhTrang}</td>
            <td>${sp.SoLuong} ${sp.DonVi}</td>
            <td>${sp.MoTa}</td>
          </tr>`;
    })
    .join("");
  let html = `<div class="content">
        <a href="#"> <h3>Đon kiểm kê</h3> > ${chiTiet.MaKiemKe}</a>
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
        </form>
        <div class="content__inner chitiet">
          <h3>Lập đon kiểm kê</h3>
          <p><span class="deMuc">Mã đơn:</span>${chiTiet.MaKiemKe}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.TenDangNhap}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <p><span class="deMuc">Tình trạng:</span>${chiTiet.TinhTrang}</p>
          <div class="inputInfo--flat">
            <label for="" class="labelLarge">Kho</label>
            <select name="kho" id="kho" readonly>
              <option id = 'kho'> ${chiTiet.Kho}</option>
            </select>
          </div>
          <div class="inputInfo--flat mt-1" id='divLoai'>
            <label for="" class="labelLarge">Loại</label>
            <select name="loai" id="loai" readonly>
              <option id = 'loai'>${chiTiet.Loai}</option>
            </select>
          </div>
          <div id="danhSachNguyenLieu" >
          ${
            dsNguyenLieuLoi != null
              ? `<h4 class="mt-1">Danh sách nguyên liệu cần kiểm kê</h4>
              <table>
                <tr>
                  <th>Mã chi tiết nguyên liệu</th>
                  <th>Tên nguyên liệu</th>
                  <th>Tình trạng kiểm kê</th>
                  <th>Số lượng</th>
                  <th>Mô tả</th>
                </tr>
                ${dsNguyenLieuLoi}
              </table>`
              : ""
          }</div>
          ${
            chiTiet.TinhTrang == "Lỗi"
              ? `<div class ="buttons center">
              <button class="btn  center secondary mt-1" id ='quayLai'>
                Quay lại
              </button>
          <button class="btn  center btnXoa mt-1 large" id ='tieuHuy'>
            Tiêu hủy
          </button>
              </div>`
              : `
            <button class="btn large center secondary mt-1" id ='quayLai'>
            Quay lại
          </button>`
          }
        </div>
      </div>`;
  return html;
}
async function init(dsDonMoi, trangThai = null) {
  dsDon = await layDonKiemKeTheoTaiKhoan();
  render(null, null, trangThai);
  const btnXem = document.querySelectorAll(".xem");
  btnXem.forEach((e) =>
    e.addEventListener("click", (e) => {
      const id = e.target.id;
      renderChiTiet(id);
    })
  );
}
export default init;
