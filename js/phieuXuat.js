import { toExcel, toPDF } from "./helper.js";
import { menu, menuShow, highLightMenu } from "./menu.js";

async function layPhieuXuatKhoChoXuatTheoTaiKhoan() {
  let data;
  await $.ajax({
    url: "../ajax/xuatKho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layPhieuXuatKhoChoXuatQuanLy",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function layPhieuXuatKhoDaXuatTheoTaiKhoan() {
  let data;
  await $.ajax({
    url: "../ajax/xuatKho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layPhieuXuatKhoDaXuatQuanLy",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function layChiTietPhieuXuat(maPhieu) {
  let data;
  await $.ajax({
    url: "../ajax/xemDonYeuCauCu.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layChiTietPhieuXuat",
      maPhieu: maPhieu,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
let dsPhieuXuat;

function render(chiTietNguyenLieu = null, thanhPham) {
  let html;
  html =
    chiTietNguyenLieu !== null
      ? contentChiTietPhieuXuat(chiTietNguyenLieu, thanhPham)
      : contentPhieuXuat();
  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  highLightMenu();
}
function contentPhieuXuat() {
  let html = `        
        <div class="content">
         <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
          <form class="search">
          <select>
            <option value = 1 >Chờ xuất</option>
            <option value = 2 >Đã xuất</option>
        </select>
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
         <div class="content__inner">
           ${
             dsPhieuXuat
               ? `<table>
              <tr class="muc">
                <th>Mã phiếu</th>
                <th>Mã đơn</th>
                <th>Tên đơn</th>
                <th>Người lập</th>
                <th>Ngày lập</th>
                <th>Số lượng nguyên liệu</th>
                <th>Hành động</th>
              </tr>
              ${dsPhieuXuat
                .map((phieu) => {
                  return `<tr>
                <td>${phieu.MaPhieu}</td>
                <td>${phieu.MaDon}</td>
                <td>${phieu.TenLoai}</td>
                <td>${phieu.MaTaiKhoan}</td>
                <td>${phieu.NgayLap}</td>
                <td class="center">${phieu.soluongnguyenlieu}</td>
                <td><button class="btn primary center large xem" id = ${phieu.MaPhieu}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>`
               : `<h3 class ="khongDon">Không có phiếu xuất nào!</h3>`
           }
         </div>
        </div>`;
  return html;
}
function contentChiTietPhieuXuat(chiTiet) {
  let dsNguyenLieu = `<table class="small">
            <tr>
              <th>Mã chi tiết nguyên liệu</th>
              <th>Tên nguyên liệu</th>
              <th>Số lượng</th>
              <th>Đơn vị</th>
            </tr>
            ${chiTiet.NguyenLieu.map((e) => {
              return `<tr>
              <td>${e.MaChiTietSanPham}</td>
              <td>${e.TenSanPham}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
            </tr>`;
            }).join("")}
          </table>
           `;
  let html = `<div class="content">
        <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
        <form class="search">
        <select>
            <option value = 1 >Chờ xuất</option>
            <option value = 2 >Đã xuất</option>
        </select>
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        <div class="content__inner chitiet">
            <div id="in">
          <h3>${chiTiet.TenLoai}</h3>
          <p><strong class="deMuc">Mã đơn:</strong>${chiTiet.MaDon}</p>
          <p><strong class="deMuc">Tên đơn:</strong>${chiTiet.TenLoai}</p>
          <p><strong class="deMuc">Người lập:</strong>${chiTiet.MaTaiKhoan}</p>
          <p><strong class="deMuc">Ngày lập:</strong>${chiTiet.NgayLap}</p>
          <p><strong class="deMuc">Trạng Thai: </strong>${chiTiet.TrangThai}</p>
          <p><strong class="deMuc">Danh sách yêu cầu:</strong></p>
          ${dsNguyenLieu}
          </div>
          <div class="buttons">
            <button class="btn primary" id="pdf">Xuất dưới dạng pdf</button>
            <button class="btn success" id = "excel">Xuất dưới dạng excel</button>
            <button class="btn secondary small" id ="quayLai">Quay lại</button>
          </div>
        </div>
       
      </div>
       `;
  return html;
}
async function renderChiTietPhieuXuat(id) {
  let chitiet = await layPhieuXuat(id);
  render(chitiet, false);
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    initPhieuXuat();
  });
  toExcel(chitiet.TenLoai);
  toPDF(chitiet.TenLoai);
}

async function initPhieuXuat(selectValue = 1) {
  dsPhieuXuat =
    selectValue == 1
      ? await layPhieuXuatKhoChoXuatTheoTaiKhoan()
      : await layPhieuXuatKhoDaXuatTheoTaiKhoan();
  render(null, false);
  const btnXem = document.querySelectorAll(".xem");
  btnXem.forEach((e) =>
    e.addEventListener("click", async (e) => {
      const id = e.target.id;
      await renderChiTietPhieuXuat(id);
    })
  );
  const select = document.querySelector("select");
  select.value = selectValue;
  select.addEventListener("change", async (e) => {
    await initPhieuXuat(select.value);
  });
}
async function layPhieuXuat(id) {
  const chiTiet = dsPhieuXuat.filter((e) => e.MaPhieu == id)[0];
  chiTiet.NguyenLieu = await layChiTietPhieuXuat(id);
  return chiTiet;
}
initPhieuXuat();
