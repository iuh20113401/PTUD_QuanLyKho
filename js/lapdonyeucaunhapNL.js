"use strict";
import { menu, menuShow, highLightMenu } from "./menu.js";
import {
  getFetch,
  modalThongBao,
  taiKhoan,
  thongBaoLoi,
  xoaHang,
} from "./helper.js";
async function layCongThuc() {
  try {
    let data = await getFetch("../ajax/congThuc.php", {
      action: "layCongThuc",
    });
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy công thức", error);
    return null;
  }
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
async function layToanBoNguyenLieu() {
  try {
    let data = await getFetch("../ajax/sanPham.php", {
      action: "layToanBoNguyenLieu",
    });
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy nguyên liệu", error);
    return null;
  }
}
async function layChiTietCongThuc(maCongThuc) {
  try {
    const data = await getFetch("../ajax/congThuc.php", {
      action: "layChiTietCongThuc",
      maCongThuc,
    });
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết công thức", error);
    return null;
  }
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
        <h5>Lập đon yêu cầu > Nhập nguyên liệu</h5>
        <form class="don">
          <h2 class = "tittle">Đơn yêu cầu nhập nguyên liệu</h2>
          <div name="taikhoan" class="inputInfo--flat mb-1">
            <label for="" class='label'>Người lập: </label>
            <input
              type="text"
              class="inputLarge"
              name="taiKhoan"
              readonly
              value="${taiKhoan[3]}"
            />
          </div>
          <div name="ngaylap" class="inputInfo--flat mb-1">
            <label for="date" class='label'>Ngày lập: </label>
            <input type="date" class="inputLarge" name="date" value=${new Date().toLocaleDateString(
              "en-CA"
            )} disabled />
          </div>
          <h3>Danh sách yêu cầu</h3>
          <div class="largeInput inputCongThuc">
            <div class="inputInfo row ">
              <input type="checkbox" name="congthuc" id="congthuc"  />
              <label for="congthuc">Nhập theo công thức</label>
            </div>
            <div class = "nguyenlieus"></div>
          </div>

          <div class="largeInput inputNguyenLieu">
            <div class="inputInfo row">
              <input type="checkbox" name="nguyenlieu" id="nguyenlieu" />
              <label for="nguyenlieu">Nhập theo danh sách nguyên liệu</label>
            </div>
            <div class = "nguyenlieus"></div>
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
      "1" +
      "0" +
      date.getDate() +
      date.getMonth() +
      date.getFullYear().toString().slice(2, 4) +
      Math.floor(Math.random() * 100 - 1);
    html = dsNguyenLieu.reduce((acc, nl) => {
      let html = `<tr>
              <td>${nl.ten}</td>
              <td>${nl.soluong}</td>
              <td>KG</td>
            </tr>`;
      return acc + html;
    }, "");
    html2 = `<div class="content">
        <h5>Lập đon yêu cầu > Nhập nguyên liệu</h5>
        <form class="don">
          <h2 class="tittle">Đơn yêu cầu nhập nguyên liệu</h2>
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
          <div name="taikhoan" class="inputInfo--flat mt-1">
            <label for="" class='label'>Người lập: </label>
            <input
              type="text"
              class="inputLarge"
              name="taiKhoan"
              readonly
              value=${taiKhoan[3]}
            />
          </div>
          <div name="ngaylap" class="inputInfo--flat mt-1">
            <label for="" class='label'>Ngày lập: </label>
            <input
              type="date"
              class="inputLarge"
              value="${new Date().toLocaleDateString("en-CA")}"
              name="ngayLap"
              id="ngayLap"
              readonly
            />
          </div>
          <h3 class ='mt-1'>Danh sách yêu cầu</h3>
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

async function init() {
  render();
  submitLapDon();
  let congthuc = document.querySelector("#congthuc");
  let nguyenlieu = document.querySelector("#nguyenlieu");
  let inputCongThuc = document.querySelector(".inputCongThuc");
  let inputNguyenLIeu = document.querySelector(".inputNguyenLieu");

  congthuc.addEventListener("click", async (e) => {
    if (e.target.checked) {
      const { html, catchEvent } = await themInput();
      const buttonThemNguyenLieu = buttonThem();
      const nguyenlieus = inputCongThuc.querySelector(".nguyenlieus");
      nguyenlieus.innerHTML = html;
      nguyenlieus.insertAdjacentHTML("beforeend", buttonThemNguyenLieu);
      const buttonThemNl = inputCongThuc.querySelector(".themNL");
      buttonThemNl.addEventListener("click", (e) => {
        e.target.insertAdjacentHTML("beforebegin", html);
      });
      document.querySelector(".content").addEventListener("change", (e) => {
        catchEvent(e);
      });
      xoaHang();
    } else {
      inputCongThuc.querySelector(".nguyenlieus").innerHTML = "";
    }
  });
  nguyenlieu.addEventListener("click", async (e) => {
    if (e.target.checked) {
      const { html } = await themInput("nguyenlieu");
      const buttonThemNguyenLieu = buttonThem();
      const nguyenlieus = inputNguyenLIeu.querySelector(".nguyenlieus");
      nguyenlieus.innerHTML = html;
      nguyenlieus.insertAdjacentHTML("beforeend", buttonThemNguyenLieu);
      const buttonThemNl = inputNguyenLIeu.querySelector(".themNL");
      buttonThemNl.addEventListener("click", (e) => {
        e.target.insertAdjacentHTML("beforebegin", html);
      });
      xoaHang();
    } else {
      inputNguyenLIeu.querySelector(".nguyenlieus").innerHTML = "";
    }
  });
}
function renderDsNguyenLieu(dsNguyenLieu) {
  render(dsNguyenLieu);
  const btnHuy = document.querySelector("#Huy");
  const btnXacNhan = document.querySelector("#xacNhan");
  btnHuy.addEventListener("click", async (e) => {
    await init();
  });
  btnXacNhan.addEventListener("click", async (e) => {
    const maDon = document.querySelector("#maDon").value;
    const ngayLap = document.querySelector("#ngayLap").value;
    const donYeuCau = {
      maDon,
      ngayLap,
      maLoai: 1,
      trangThai: "Đã duyệt",
      dsNguyenLieu,
    };
    const res = await themDonYeuCau(donYeuCau);
    if (res) {
      let newRes = await modalThongBao("Đã thêm thành công", true);
      if (newRes || !newRes) {
        window.location.reload();
      }
    }
  });
}
async function themInput(name = "congthuc") {
  const className = name === "congthuc" ? "dsCongThuc" : "dsNguyenLieu";
  const dsSanPham =
    name === "congthuc" ? await layCongThuc() : await layToanBoNguyenLieu();
  const options = dsSanPham
    .map(
      (sp) => `
      <option value='${
        name === "congthuc" ? sp.MaCongThuc : `${sp.MaSanPham}/${sp.TenSanPham}`
      }'>
        ${name === "congthuc" ? sp.TenCongThuc : sp.TenSanPham}
      </option>`
    )
    .join("");
  let html = `<div class="inputInfo ${className} row">
            <select class = '${name === "congthuc" ? `tp` : ``}'>
            ${
              name == "congthuc"
                ? `<option>Chọn công thức</option>`
                : `<option>Chọn nguyên liệu</option>`
            }
            ${options}</select>
            <input type="number" placeholder="Nhập số lượng" class="soluong input" />
            <input type='text' class = 'input donVi' value = '${
              name === "congthuc" ? `Đơn vị` : `KG`
            }' disabled/>
            <button type ='button' class ='btn xoaHang btnXoa btnSuperSmall'>
              X</button>
          </div>`;
  function catchEvent(e) {
    if (e.target.matches(".tp")) {
      const chiTiet = dsSanPham.filter(
        (sp) => sp.MaCongThuc == +e.target.value
      )[0];
      if (chiTiet?.DonVi)
        e.target.closest(".row").querySelector(".donVi").value = chiTiet.DonVi;
      else e.target.closest(".row").querySelector(".donVi").value = "Đơn vị";
    }
  }
  return { html, catchEvent };
}

function buttonThem() {
  return `<button type="button" class="btn secondary themNL" >Thêm</button>`;
}

function submitLapDon() {
  const lapDonNNL = document.querySelector("#lapDonNNL");
  lapDonNNL.addEventListener("click", async (e) => {
    e.preventDefault();

    let dsNguyenLieu = [];
    let isValid = true;
    const chonNguyenLieu = document.querySelectorAll(".dsNguyenLieu");
    const chonCongThuc = document.querySelectorAll(".dsCongThuc");

    chonNguyenLieu.forEach((nguyenLieu) => {
      const ma = nguyenLieu.children[0].value.split("/")[0];
      const ten = nguyenLieu.children[0].value.split("/")[1];
      const soluong = nguyenLieu.children[1].value;
      const donvi = nguyenLieu.children[2].value;

      if (
        ten !== "default" &&
        soluong !== "" &&
        !isNaN(soluong) &&
        parseInt(soluong) >= 0
      ) {
        dsNguyenLieu.push({
          ma: +ma,
          ten,
          soluong: +soluong,
          donvi,
        });
      } else {
        isValid = false;
        let warning = document.querySelector(".warning");
        let html = `Vui lòng nhập đầy đủ thông tin và số lượng phải là số không âm`;
        warning.innerHTML = html;
      }
    });

    if (!isValid) return;

    const promises = Array.from(chonCongThuc).map(async (congThuc) => {
      const ma = congThuc.children[0].value;
      const soluong = congThuc.children[1].value;

      if (
        ma !== "default" &&
        soluong !== "" &&
        !isNaN(soluong) &&
        parseInt(soluong) >= 0
      ) {
        let data = await layChiTietCongThuc(ma);
        return data.map((d) => ({
          ma: d.MaSanPham,
          ten: d.TenSanPham,
          soluong: d.SoLuong * soluong,
          donvi: d.DonVi,
        }));
      } else {
        isValid = false;
        let warning = document.querySelector(".warning");
        let html = `Vui lòng chọn đầy đủ thông tin và số lượng phải là số không âm`;
        warning.innerHTML = html;
      }
    });

    if (!isValid) return;

    let congThucResults = await Promise.all(promises);
    congThucResults.forEach((ds) => {
      dsNguyenLieu = dsNguyenLieu.concat(ds);
    });

    dsNguyenLieu = dsNguyenLieu.sort((a, b) => a.ma - b.ma);
    const ma = [...new Set(dsNguyenLieu.map((ds) => ds.ma))];
    const newDs = ma.map((m) => {
      const newds = dsNguyenLieu.filter((ds) => ds.ma == m);
      const soluong = newds.reduce((acc, nl) => acc + nl.soluong, 0);
      return {
        ma: m,
        soluong,
        ten: newds[0].ten,
        donvi: newds[0].donvi,
      };
    });
    if (!(await kiemTraSucChuaKho(newDs))) return;
    if (!newDs.length) {
      return;
    }
    renderDsNguyenLieu(newDs);
  });
}

async function kiemTraSucChuaKho(dsNguyenLieu) {
  try {
    let kho = await layKho();
    let nguyenLieu = await layToanBoNguyenLieu();
    let tongSoLuongNhap = 0;
    kho = kho.filter((k) => k.Loai === "Nguyên liệu");
    let soluongchonhap = nguyenLieu.reduce(
      (acc, nl) => nl.SoLuongChoNhap + acc,
      0
    );
    dsNguyenLieu.forEach((nl) => {
      tongSoLuongNhap += parseInt(nl.soluong) || 0;
    });
    let SucChua = kho.reduce(
      (acc, k) => acc + (k.SucChua - k.SucChuaDaDung),
      0
    );
    // So sánh tổng số lượng nguyên liệu cần nhập với sức chứa của kho
    if (tongSoLuongNhap > SucChua - soluongchonhap) {
      thongBaoLoi(
        "Số lượng nguyên liệu nhập vào vượt quá sức chứa tối đa của kho!"
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("Lỗi khi kiểm tra sức chứa kho: ", error);
  }
}

await init();
