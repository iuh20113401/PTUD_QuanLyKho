"use strict";
import { menu, menuShow, highLightMenu } from "./menu.js";
import {
  getFetch,
  modalThongBao,
  taiKhoan,
  xoaHang,
  thongBaoLoi,
} from "./helper.js";
async function layToanBoThanhPham() {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "layToanBoThanhPham",
  });
  return data;
}
async function layKho() {
  try {
    const data = await getFetch("../ajax/kho.php", { action: "layTatCaKho" });
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin kho: ", error);
    return null; // Trả về null hoặc giá trị mặc định khi có lỗi
  }
}
async function themDonYeuCau(donYeuCau) {
  const data = await getFetch("../ajax/lapDonYeuCau.php", {
    action: "lapDonYeuCauNhapTP",
    maDon: donYeuCau.maDon,
    maLoai: donYeuCau.maLoai,
    ngayLap: donYeuCau.ngayLap,
    trangThai: donYeuCau.trangThai,
    maSanPham: donYeuCau.dsNguyenLieu.map((nl) => nl.ma),
    soLuong: donYeuCau.dsNguyenLieu.map((nl) => nl.soluong),
    donVi: donYeuCau.dsNguyenLieu.map((nl) => nl.donvi),
    ngaySanXuat: donYeuCau.dsNguyenLieu.map((nl) => nl.ngaySanXuat),
    ngayHetHan: donYeuCau.dsNguyenLieu.map((nl) => nl.ngayHetHan),
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
        <h5>Lập đon yêu cầu > Nhập thành phẩm</h5>
        <form class="don">
          <h2 class = "tittle">Đơn yêu cầu nhập thành phẩm</h2>
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
            <input type="date" class="inputLarge" name="taiKhoan" value = ${new Date().toLocaleDateString(
              "en-CA"
            )} readonly/>
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
    let date = new Date();
    let MaDon =
      "2" +
      "0" +
      date.getDate() +
      date.getMonth() +
      date.getFullYear().toString().slice(2, 4) +
      Math.floor(Math.random() * 100 - 1);
    dsNguyenLieu;
    html = dsNguyenLieu.reduce((acc, nl) => {
      let html = `<tr>
              <td>${nl.ten}</td>
              <td>${nl.soluong}</td>
              <td>${nl.donvi}</td>
              <td>${nl.ngaySanXuat}</td>
              <td>${nl.ngayHetHan}</td>
            </tr>`;
      return acc + html;
    }, "");
    html2 = `<div class="content">
        <h5>Lập đon yêu cầu > Nhập thành phẩm</h5>
        <form class="don">
          <h2 class="tittle">Đơn yêu cầu Nhập thành phẩm</h2>
          <div name="maDon" class="inputInfo--flat">
            <label for="" class='label'>Mã đơn: </label>
            <input
              type="text"
              class="inputLarge"
              name="maDon"
              id="maDon"
              readonly
              value="${MaDon}"
            />
          </div>
          <div name="taikhoan" class="inputInfo--flat">
            <label for="" class='label'>Người lập: </label>
            <input
              type="text"
              class="inputLarge mt-1"
              name="taiKhoan"
              readonly
              value=${taiKhoan[3]}
            />
          </div>
          <div name="ngaylap" class="inputInfo--flat">
            <label for="" class='label'>Ngày lập: </label>
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
              <th>Ngày sản xuất</th>
              <th>Ngày hết hạn</th>
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
function renderDsNguyenLieu(dsNguyenLieu) {
  render(dsNguyenLieu);
  const btnHuy = document.querySelector("#Huy");
  const btnXacNhan = document.querySelector("#xacNhan");
  btnHuy.addEventListener("click", (e) => {
    init();
  });
  btnXacNhan.addEventListener("click", async (e) => {
    try {
      const maDon = document.querySelector("#maDon").value;
      const ngayLap = document.querySelector("#ngayLap").value;
      const donYeuCau = {
        maDon,
        ngayLap,
        maLoai: 3,
        trangThai: "Chờ duyệt",
        dsNguyenLieu,
      };
      const res = await themDonYeuCau(donYeuCau);

      if (res) {
        let newRes = await modalThongBao("Đã thêm thành công", true);
        if (newRes) {
          window.location.reload();
        }
      }
    } catch (error) {
      await modalThongBao("Lỗi khi gửi đơn yêu cầu: ".error, false);
      let warning = document.querySelector(".warning");
      warning.innerHTML = `Có lỗi xảy ra khi gửi đơn yêu cầu`;
    }
  });
}

function themInput() {
  return `<div class="inputInfo dsThanhPham row row__5">
              <select class = 'tp'>
                <option value='defalut'">Chọn thành phẩm</option>
                ${dsSanPham
                  .map((sp) => {
                    return `<option value= '${sp.MaSanPham}/${sp.TenSanPham}'>
                    ${sp.TenSanPham}
                  </option>;`;
                  })
                  .join("")}
              </select>
              <input
                type="number"
                placeholder="Nhập số lượng"
                id="soluong"
                class="soluong input"
              />
              <input type='text' disabled id="donVi" class='input bold small_10' placeholder ="Đơn vị"/>
              <input
                id="ngaySanXuat"
                class="ngaySanXuat input"
                placeholder="Ngày sản xuất"
                type="text"
                onfocus="(this.type='date')"
                onblur="(this.type='text')"
              />
              <input
                type="text"
                id="ngayHetHan"
                class="ngayHetHan input"
                placeholder="Ngày hết hạn"
                type="text"
                onfocus="(this.type='date')"
                onblur="(this.type='text')"
              />
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
    let isValid = true;
    let dsThanhPham = [];
    const chonThanhPham = document.querySelectorAll(".dsThanhPham");

    chonThanhPham.forEach((thanhPham) => {
      const ma = thanhPham.children[0].value.split("/")[0];
      const ten = thanhPham.children[0].value.split("/")[1];
      const soluong = parseInt(thanhPham.children[1].value);
      const donvi = thanhPham.children[2].value;
      const ngaySanXuat = thanhPham.children[3].value;
      const ngayHetHan = thanhPham.children[4].value;
      if (
        ma !== "default" &&
        soluong > 0 &&
        !isNaN(soluong) &&
        ngaySanXuat < ngayHetHan &&
        ngaySanXuat < new Date().toISOString() &&
        ngayHetHan > new Date().toISOString()
      ) {
        // Kiểm tra dữ liệu đầu vào
        dsThanhPham.push({
          ma: +ma,
          ten,
          soluong,
          donvi,
          ngaySanXuat,
          ngayHetHan,
        });
      } else {
        isValid = false;
        let warning = document.querySelector(".warning");
        warning.innerHTML = `Vui lòng nhập đầy đủ thông tin và đảm bảo số lượng là số dương, ngầy sản xuất và ngày hết hạn hợp lệ`;
      }
    });

    if (!isValid) return;
    await xuLyThem(dsThanhPham);
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
      ngaySanXuat: newds[0].ngaySanXuat,
      ngayHetHan: newds[0].ngayHetHan,
      ten: newds[0].ten,
      donvi: newds[0].donvi,
    };
  });
  if (!newDs.length) {
    console.log(newDs);
    return;
  }
  if (!(await kiemTraSucChuaKho(newDs))) {
    return;
  }
  renderDsNguyenLieu(newDs);
}
async function kiemTraSucChuaKho(dsThanhPham) {
  try {
    let kho = await layKho();
    let thanhPham = await layToanBoThanhPham();
    let tongSoLuongNhap = 0;
    kho = kho.filter((k) => k.Loai === "Thành phẩm");
    let soluongchonhap = thanhPham.reduce(
      (acc, nl) => nl.SoLuongChoNhap + acc,
      0
    );
    dsThanhPham.forEach((nl) => {
      tongSoLuongNhap += parseInt(nl.soluong) || 0;
    });
    let SucChua = kho.reduce(
      (acc, k) => acc + (k.SucChua - k.SucChuaDaDung),
      0
    );
    // So sánh tổng số lượng nguyên liệu cần nhập với sức chứa của kho
    if (tongSoLuongNhap > SucChua - soluongchonhap) {
      thongBaoLoi(
        "Số lượng thành phẩm nhập vào vượt quá sức chứa tối đa của kho!"
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("Lỗi khi kiểm tra sức chứa kho: ", error);
    return false;
  }
}
init();
