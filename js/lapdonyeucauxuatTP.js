"use strict";
import { menu, menuShow, highLightMenu } from "./menu.js";
import {
  getFetch,
  modalThongBao,
  thongBaoLoi,
  taiKhoan,
  xoaHang,
} from "./helper.js";
async function layToanBoThanhPham() {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "layToanBoThanhPham",
  });
  return data;
}
async function themDonYeuCau(donYeuCau) {
  const data = await getFetch("../ajax/lapDonYeuCau.php", {
    action: "lapDonYeuCau",
    maDon: donYeuCau.maDon,
    maLoai: donYeuCau.maLoai,
    ngayLap: donYeuCau.ngayLap,
    trangThai: donYeuCau.trangThai,
    maSanPham: donYeuCau.dsNguyenLieu.map((nl) => nl.ma),
    soLuong: donYeuCau.dsNguyenLieu.map((nl) => nl.soluong),
    donVi: donYeuCau.dsNguyenLieu.map((nl) => nl.donvi),
  });
  return data;
}

let dsSanPham = await layToanBoThanhPham();

function render(dsNguyenLieu = null) {
  let html = dsNguyenLieu !== null ? content(dsNguyenLieu) : content();
  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  highLightMenu();
}
function content(dsNguyenLieu = null) {
  let html = `<div class="content">
        <h5>Lập đon yêu cầu > Xuất thành phẩm</h5>
        <form class="don">
          <h2 class = "tittle">Đơn yêu cầu xuất thành phẩm</h2>
          <div name="taikhoan" class="inputInfo--flat mb-1">
            <label for="" class='label'>Người lập: </label>
            <input
              type="text"
              class="inputLarge"
              name="taiKhoan"
              readonly
              value=${taiKhoan[3]}
            />
          </div>
          <div name="ngaylap" class="inputInfo--flat mb-1">
            <label for="" class='label'>Ngày lập: </label>
            <input type="date" class="inputLarge" name="taiKhoan" value=${new Date().toLocaleDateString(
              "en-CA"
            )} disabled />
          </div>
          <h3>Danh sách yêu cầu</h3>
          <div class="largeInput inputThanhPham">
            <div class = "thanhPhams"></div>
          </div>
          <div class ="warning"></div>
          <button class="btn large center primary mt-1" id="lapDonNNL">
            Lập đơn yêu cầu
          </button>
        </form>
      </div>`;
  let html2;
  if (dsNguyenLieu !== null) {
    html = dsNguyenLieu.reduce((acc, nl) => {
      let html = `<tr>
              <td>${nl.ten}</td>
              <td>${nl.soluong}</td>
              <td>KG</td>
            </tr>`;
      return acc + html;
    }, "");
    html2 = `<div class="content">
        <h5>Lập đon yêu cầu > Xuất thành phẩm</h5>
        <form class="don">
          <h2 class="tittle">Đơn yêu cầu xuất thành phẩm</h2>
          <div name="maDon" class="inputInfo--flat">
            <label for="" class='label'>Mã đơn: </label>
            <input
              type="text"
              class="inputLarge"
              name="maDon"
              id="maDon"
              readonly
              value="${Math.floor(Math.random() * 1000)}"
            />
          </div>
          <div name="taikhoan" class="inputInfo--flat">
            <label for=""class='label'>Người lập: </label>
            <input
              type="text"
              class="inputLarge mt-1"
              name="taiKhoan"
              readonly
              value=${taiKhoan[3]}
            />
          </div>
          <div name="ngaylap" class="inputInfo--flat">
            <label for=""class='label'>Ngày lập: </label>
            <input
              type="date"
              class="inputLarge mt-1"
              value="${new Date().toLocaleDateString("en-CA")}"
              name="ngayLap"
              id="ngayLap"
              readonly
            />
          </div>
          <h3>Danh sách yêu cầu</h3>
          <table>
            <tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng</th>
              <th>Đơn vị</th>
            </tr>
            ${html}
          </table>
          <div class="buttons">
            <button type = "button" class="btn primary" id="xacNhan">Lập đơn</button>
            <button type = "button" class="btn secondary" id="Huy">Hủy</button>
          </div>
        </form>
      </div>`;
  }

  return dsNguyenLieu !== null ? html2 : html;
}
function init() {
  render();
  submitLapDon();
  let inputThanhPham = document.querySelector(".inputThanhPham");
  const themCongThucInput = themInput();
  const buttonThemNguyenLieu = buttonThem();
  const thanhPhams = inputThanhPham.querySelector(".thanhPhams");
  thanhPhams.innerHTML = themCongThucInput;
  thanhPhams.insertAdjacentHTML("beforeend", buttonThemNguyenLieu);
  const buttonThemNl = inputThanhPham.querySelector(".themNL");
  buttonThemNl.addEventListener("click", (e) => {
    e.target.insertAdjacentHTML("beforebegin", themCongThucInput);
  });
  document.querySelector(".inputThanhPham").addEventListener("change", (e) => {
    if (e.target.matches(".tp")) {
      const chiTiet = dsSanPham.filter(
        (sp) => sp.MaSanPham == e.target.value.split("/")[0]
      )[0];
      e.target.closest(".row").querySelector("#donVi").value = chiTiet.DonVi;
    }
  });
  xoaHang();
}
async function renderDsNguyenLieu(dsNguyenLieu) {
  let thanhPham = await layToanBoThanhPham();
  let res = dsNguyenLieu
    .map((nl) => {
      let old = thanhPham.filter((tps) => tps.MaSanPham === nl.ma)[0];
      return +old.SoLuongTon - +old.SoLuongChoXuat >= nl.soluong;
    })
    .some((nl) => nl == false);
  if (res) {
    await modalThongBao("Không đủ thành phẩm để xuất", false);
    return;
  }
  render(dsNguyenLieu);
  const btnHuy = document.querySelector("#Huy");
  btnHuy.addEventListener("click", (e) => {
    init();
  });
  const btnXacNhan = document.querySelector("#xacNhan");
  btnXacNhan.addEventListener("click", async (e) => {
    const maDon = document.querySelector("#maDon").value;
    const ngayLap = document.querySelector("#ngayLap").value;
    const donYeuCau = {
      maDon,
      ngayLap,
      maLoai: 4,
      trangThai: "Chờ duyệt",
      dsNguyenLieu,
    };
    const res = await themDonYeuCau(donYeuCau);
    if (res) {
      let newRes = confirm("Đã thêm thành công");
      if (newRes || !newRes) {
        window.location.reload();
      }
    }
  });
}
function themInput() {
  return `<div class="inputInfo dsThanhPham row">
              <select class ='tp'>
                <option value='defalut'">Chọn thành phẩm</option>
                ${dsSanPham.map((sp) => {
                  return `<option value= '${sp.MaSanPham}/${sp.TenSanPham}'>
                    ${sp.TenSanPham}
                  </option>;`;
                })}
              </select>
              <input
                type="number"
                placeholder="Nhập số lượng"
                id="soluong"
                class="soluong input"
              />
                <input type='text' disabled id="donVi" class='input bold ' placeholder ="Đơn vị"/>
              <button type ='button' class ='btn xoaHang btnXoa btnSuperSmall'>
              X</button>
            </div>`;
}
function buttonThem() {
  return `<button type="button" class="btn secondary themNL" >Thêm</button>`;
}

function submitLapDon() {
  const lapDonNNL = document.querySelector("#lapDonNNL");
  lapDonNNL.addEventListener("click", async (e) => {
    e.preventDefault();
    let dsThanhPham = [];
    const chonThanhPham = document.querySelectorAll(".dsThanhPham");
    chonThanhPham.forEach(async (thanhPham, i) => {
      const ma = thanhPham.children[0].value.split("/")[0];
      const ten = thanhPham.children[0].value.split("/")[1];
      const soluong = thanhPham.children[1].value;
      const donvi = thanhPham.children[2].value;
      ma, soluong;

      if (+soluong < 0) {
        let warning = document.querySelector(".warning");
        let html = `Vui long nhập số lượng hợp lệ`;
        warning.innerHTML = html;
      } else if (ma != "default" && soluong != 0) {
        dsThanhPham.push({
          ma: +ma,
          ten,
          soluong: +soluong,
          donvi,
        });
        if (i == chonThanhPham.length - 1) {
          await xuLyThem(dsThanhPham);
        }
      } else {
        let warning = document.querySelector(".warning");
        let html = `Vui long chọn đầy đủ thông tin`;
        warning.innerHTML = html;
      }
    });
  });
}
async function xuLyThem(dsThanhPham) {
  dsThanhPham = dsThanhPham.sort((a, b) => a.ma - b.ma);
  const ma = [...new Set(dsThanhPham.map((ds) => ds.ma))];
  const newDs = ma.map((m) => {
    const newds = dsThanhPham.filter((ds) => ds.ma == m);
    const soluong = newds.reduce((acc, nl) => acc + nl.soluong, 0);
    return {
      ma: m,
      soluong,
      ten: newds[0].ten,
      donvi: newds[0].donvi,
    };
  });
  if (!newDs.length) {
    return;
  }
  await renderDsNguyenLieu(newDs);
}
init();
