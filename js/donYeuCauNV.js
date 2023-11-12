"use strick";
import { MAVAITRO, menu, menuShow, highLightMenu } from "./menu.js";
import { toExcel, toPDF } from "./helper.js";

async function layDonYeuCau(trangThai = null) {
  let data;
  trangThai = trangThai === "Toàn bộ" ? null : trangThai;
  await $.ajax({
    url: "../ajax/donYeuCau.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layDonYeuCauTheoTaiKhoan",
      trangThai: trangThai ? trangThai : null,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}

async function layChiTietDonYeuCau(maDon) {
  let data;
  await $.ajax({
    url: "../ajax/donYeuCau.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layChiTietDonYeuCau",
      maDon: maDon,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function capNhatTrangThaiDonYeuCau(maDon, trangThai) {
  let data;
  await $.ajax({
    url: "../ajax/donYeuCau.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "capNhatTrangThaiDonYeuCau",
      maDon,
      trangThai,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
let dsDon;
function render(chiTietNguyenLieu = null, trangThai = null) {
  let html =
    chiTietNguyenLieu !== null
      ? contentChiTiet(chiTietNguyenLieu)
      : content(trangThai);
  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  highLightMenu();
}
function content(trangThai = null) {
  let html = `        
        <div class="content">
         <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
          <form class="search" value = ${trangThai} >
            <select >
              <option value="" ${
                trangThai == "" ? `selected` : ""
              }>Toàn bộ</option>
              <option value="Chờ duyệt" ${
                trangThai == "Chờ duyệt" ? `selected` : ""
              }>Chờ duyệt</option>
              <option value="Đã duyệt" ${
                trangThai == "Đã duyệt" ? `selected` : ""
              }>Đã duyệt</option>
              <option value="Đã hủy" ${
                trangThai == "Đã hủy" ? `selected` : ""
              }>Đã hủy</option>
            </select>
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
         <div class="content__inner">
          ${
            !dsDon.length
              ? `<h3 class ="khongDon">Không có đơn yêu cầu nào!</h3>`
              : `<table>
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
                <td>${don.MaTaiKhoan}</td>
                <td>${don.NgayLap}</td>
                <td class="center">${don.soluongnguyenlieu}</td>
                <td><button class="btn primary center large" id = ${don.MaDon}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>`
          }
            
         </div>
        </div>`;
  return html;
}
function contentChiTiet(chiTiet) {
  let dsNguyenLieu = `<table class="small"><tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
              <th>Đơn vị</th>
              <th>${chiTiet[0].NgaySanXuat ? `Ngày sản xuất` : ""}</th>
              <th>${chiTiet[0].NgayHetHan ? `Ngày hết hạn` : ""}</th>
              ${chiTiet[0].ViTriKho ? "<th>Kho</th>" : ""}
            </tr>
            ${chiTiet
              .map((e) => {
                return `<tr>
              <td>${e.TenSanPham}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
              <td>
                ${e.NgaySanXuat != null ? e.NgaySanXuat : ``}
              </td>
              <td> ${e.NgayHetHan != null ? e.NgayHetHan : ``}</td>
              
              ${e.ViTriKho ? `<td>${e.ViTriKho}</td>` : ``}
              
            </tr>`;
              })
              .join("")}
          </table>
          <p class="alert hidden"></p>
`;
  let trangThai = chiTiet[0].TrangThai;
  let html = `<div class="content">
        <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập > ${
          chiTiet[0].TenLoai
        }</h3></a>
        <form class="search" value = ${trangThai} >
            <select >
              <option >Toàn bộ</option>
              <option value="Chờ duyệt" ${
                trangThai == "Chờ duyệt" ? `selected` : ""
              }>Chờ duyệt</option>
              <option value="Đã duyệt" ${
                trangThai == "Đã duyệt" ? `selected` : ""
              }>Đã duyệt</option>
              <option value="Đã hủy" ${
                trangThai == "Đã hủy" ? `selected` : ""
              }>Đã hủy</option>
            </select>
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        <div class="content__inner chitiet">
            <div id="in">
          <h3>${chiTiet[0].TenLoai} </h3>
          <p class = 'maDon'id = ${
            chiTiet[0].MaDon
          }><span class="deMuc">Mã đơn:</span>${chiTiet[0].MaDon}</p>
          <p><span class="deMuc">Tên đơn:</span>${chiTiet[0].TenLoai}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet[0].MaTaiKhoan}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet[0].NgayLap}</p>
          <p><span class="deMuc">TrangThai:</span>${chiTiet[0].TrangThai}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieu}
        </div>
            <div class="buttons">
              <button class="btn primary" id="pdf">Xuất dưới dạng pdf</button>
              <button class="btn success" id = "excel">Xuất dưới dạng pdf</button>
              <button type="button" class="btn secondary " id = "quayLai">Quay lại</button>
          </div>
        </div>
      </div>`;
  return html;
}
async function layDon(id) {
  const chiTiet = await layChiTietDonYeuCau(id);
  return chiTiet;
}
function themBtnDuyet() {
  let html = `<button class="btn primary " id = "duyet">Duyệt đơn</button>
  <button class="btn btnXoa " id = "khongDuyet">Không duyệt</button>
  `;
  document.querySelector(".buttons").insertAdjacentHTML("afterbegin", html);
  const btnDuyet = document.querySelector("#duyet");
  const btnKhongDuyet = document.querySelector("#khongDuyet");
  const maDon = document.querySelector(".maDon").id;
  btnDuyet.addEventListener("click", async (e) => {
    let res = await capNhatTrangThaiDonYeuCau(maDon, "Đã duyệt");
    if (res) {
      let confirmRes = confirm("Bạn đã duyệt đơn thành công!");
      if (!confirmRes || confirmRes) {
        dsDon = await layDonYeuCau(goBack());
        init(dsDon, goBack());
      }
    }
  });
  btnKhongDuyet.addEventListener("click", async (e) => {
    let res = await capNhatTrangThaiDonYeuCau(maDon, "Đã hủy");
    let confirmRes = confirm("Bạn đã không duyệt đơn thành công!");
    if (!confirmRes || confirmRes) {
      dsDon = await layDonYeuCau(goBack());
      init(dsDon, goBack());
    }
  });
}
async function renderChiTiet(id) {
  let chitiet = await layDon(id);
  render(chitiet);
  if (chitiet[0].TrangThai == "Chờ duyệt" && MAVAITRO == 1) {
    themBtnDuyet();
  }

  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    init(dsDon, goBack());
  });
}
function goBack() {
  const selectValue = document.querySelector("select").value;
  return selectValue;
}
async function init(dsDonMoi, trangThai = null) {
  dsDon = dsDonMoi ? dsDonMoi : await layDonYeuCau();
  render(null, trangThai);
  const btnXem = document.querySelectorAll("button");
  btnXem.forEach((e) =>
    e.addEventListener("click", (e) => {
      const id = e.target.id;
      renderChiTiet(id);
    })
  );
  const select = document.querySelector("select");
  select.addEventListener("change", async (e) => {
    let trangThai = e.target.value || "";
    dsDon = (await layDonYeuCau(trangThai)) || [];
    init(dsDon, trangThai);
  });
}
export default init;
