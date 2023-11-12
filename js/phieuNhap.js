import { toExcel, toPDF } from "./helper.js";
import { menu, menuShow, highLightMenu } from "./menu.js";

async function layPhieuNhapKhoDaNhap() {
  let data;
  await $.ajax({
    url: "../ajax/nhapKho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layPhieuNhapKhoDaNhapQuanLy",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function layPhieuNhapKhoChoNhap() {
  let data;
  await $.ajax({
    url: "../ajax/nhapKho.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layPhieuNhapKhoChoNhapQuanLy",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function layChiTietPhieuNhap(maPhieu) {
  let data;
  await $.ajax({
    url: "../ajax/xemDonYeuCauCu.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layChiTietPhieuNhap",
      maPhieu: maPhieu,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
let dsPhieuNhap;
function render(chiTietNguyenLieu = null, thanhPham, loai = "Don") {
  let html;

  html =
    chiTietNguyenLieu !== null
      ? contentChiTietPhieuNhap(chiTietNguyenLieu, thanhPham)
      : contentPhieuNhap();

  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  highLightMenu();
}
function contentPhieuNhap() {
  let html = `        
        <div class="content">
         <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
          <form class="search">
            <select class ='loai'>
              <option value ='1'>Chờ nhập</option>
              <option value ='2'>Đã nhập</option>
            </select>
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
         <div class="content__inner">
            ${
              dsPhieuNhap
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
              ${dsPhieuNhap
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
                : `<h3 class = "khongDon">Không có phiếu nhập nào!</h3>`
            }
         </div>
        </div>`;
  return html;
}
function contentChiTietPhieuNhap(chiTiet) {
  let dsNguyenLieu = `<table class="small">
            <tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng</th>
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
           `;
  let html = `<div class="content">
        <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
        <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        <div class="content__inner chitiet">
          <div id = 'in'>
            <h3>${chiTiet.TenLoai}</h3>
            <p><span class="deMuc">Mã đơn:</span>${chiTiet.MaDon}</p>
            <p><span class="deMuc">Mã kho:</span>${chiTiet.MaKho}</p>
            <p><span class="deMuc">Tên đơn:</span>${chiTiet.TenLoai}</p>
            <p><span class="deMuc">Người lập:</span>${chiTiet.MaTaiKhoan}</p>
            <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
            <p><span class="deMuc">Ngày nhập kho:</span>${chiTiet.NgayNhap}</p>
            <p><span class="deMuc">Trạng thái:</span>${chiTiet.TrangThai}</p>
            <p><span class="deMuc">Danh sách yêu cầu:</span></p>
            ${dsNguyenLieu}
          </div>
          <div class="buttons">
            <button class="btn primary" id="pdf">Xuất dưới dạng pdf</button>
            <button class="btn success" id = "excel">Xuất dưới dạng pdf</button>
            <button class="btn secondary small" id ="quayLai">Quay lại</button>
          </div>
        </div>
      </div>`;
  return html;
}
async function renderChiTietPhieuNhap(id) {
  let chitiet = await layPhieuNhap(id);
  render(chitiet, false);
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", async (e) => {
    await initPhieuNhap();
  });
  toExcel(chitiet.TenLoai);
  toPDF(chitiet.TenLoai);
}
async function initPhieuNhap(selectValue = 1) {
  dsPhieuNhap =
    selectValue == 1
      ? await layPhieuNhapKhoChoNhap()
      : await layPhieuNhapKhoDaNhap();
  render(null, false);
  const btnXem = document.querySelectorAll(".xem");
  btnXem.forEach((e) =>
    e.addEventListener("click", (e) => {
      const id = e.target.id;
      renderChiTietPhieuNhap(id);
    })
  );
  const select = document.querySelector("select");
  select.value = selectValue;
  select.addEventListener("change", async (e) => {
    await initPhieuNhap(select.value);
  });
}
async function layPhieuNhap(id) {
  const chiTiet = dsPhieuNhap.filter((e) => e.MaPhieu == id)[0];
  chiTiet.NguyenLieu = await layChiTietPhieuNhap(id);
  return chiTiet;
}
await initPhieuNhap();
