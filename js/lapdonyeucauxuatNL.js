"use strict";
import { menu, menuShow, highLightMenu } from "./menu.js";
import {
  getFetch,
  modalThongBao,
  thongBaoLoi,
  xoaHang,
  taiKhoan,
} from "./helper.js";
async function layCongThuc() {
  const data = await getFetch("../ajax/congThuc.php", {
    action: "layCongThuc",
  });
  return data;
}

async function layToanBoNguyenLieu() {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "layToanBoNguyenLieu",
  });
  return data;
}

async function layChiTietCongThuc(maCongThuc) {
  const data = await getFetch("../ajax/congThuc.php", {
    action: "layChiTietCongThuc",
    maCongThuc,
  });
  return data;
}

async function themDonYeuCau(donYeuCau) {
  console.log(donYeuCau);
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
        <h5>Lập đon yêu cầu > Xuất nguyên liệu</h5>
        <form class="don">
          <h2 class = "tittle">Đơn yêu cầu xuất nguyên liệu</h2>
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
            <label for="" class='label'>Ngày lập: </label>
            <input type="date" class="inputLarge" name="taiKhoan" value=${new Date().toLocaleDateString(
              "en-CA"
            )} disabled />
          </div>
          <h3>Danh sách yêu cầu</h3>
          <div class="largeInput inputCongThuc">
            <div class="inputInfo row ">
              <input type="checkbox" name="congthuc" id="congthuc" />
              <label for="congthuc">Xuất theo công thức</label>
            </div>
            <div class = "nguyenlieus"></div>
          </div>

          <div class="largeInput inputNguyenLieu">
            <div class="inputInfo row">
              <input type="checkbox" name="nguyenlieu" id="nguyenlieu" />
              <label for="nguyenlieu">Xuất theo danh sách nguyên liệu</label>
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
      "2" +
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
        <h5>Lập đon yêu cầu > Xuất nguyên liệu</h5>
        <form class="don">
          <h2 class="tittle">Đơn yêu cầu xuất nguyên liệu</h2>
          <div name="maDon" class="inputInfo--flat ">
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
              value="Giám đốc"
            />
          </div>
          <div name="ngaylap" class="inputInfo--flat mt-1 ">
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
  let inputCongThuc = document.querySelector(".inputCongThuc");
  let inputNguyenLIeu = document.querySelector(".inputNguyenLieu");
  document.body.addEventListener("click", async (e) => {
    if (e.target.matches("#congthuc")) {
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
    } else if (e.target.matches("#nguyenlieu")) {
      if (e.target.checked) {
        const { html, catchEvent } = await themInput("nguyenlieu");
        const buttonThemNguyenLieu = buttonThem();
        const nguyenlieus = inputNguyenLIeu.querySelector(".nguyenlieus");
        nguyenlieus.innerHTML = html;
        nguyenlieus.insertAdjacentHTML("beforeend", buttonThemNguyenLieu);
        const buttonThemNl = inputNguyenLIeu.querySelector(".themNL");
        buttonThemNl.addEventListener("click", (e) => {
          e.target.insertAdjacentHTML("beforebegin", html);
        });
        document.querySelector(".content").addEventListener("change", (e) => {
          catchEvent(e);
        });
        xoaHang();
      } else {
        inputNguyenLIeu.querySelector(".nguyenlieus").innerHTML = "";
      }
    }
    // Thêm các xử lý sự kiện khác ở đây
  });
}
async function renderDsNguyenLieu(dsNguyenLieu) {
  let nguyenLieu = await layToanBoNguyenLieu();
  let res = dsNguyenLieu
    .map((nl) => {
      let old = nguyenLieu.filter((nls) => nls.MaSanPham === nl.ma)[0];
      return +old?.SoLuongTon - +old?.SoLuongChoXuat >= nl.soluong;
    })
    .some((nl) => nl == false);
  if (res === true) {
    thongBaoLoi("Hiện tại không đủ số lượng để xuất");
    return;
  }
  render(dsNguyenLieu);
  const btnHuy = document.querySelector("#Huy");
  const btnXacNhan = document.querySelector("#xacNhan");
  btnHuy.addEventListener("click", (e) => {
    init();
  });
  btnXacNhan.addEventListener("click", async (e) => {
    const maDon = document.querySelector("#maDon").value;
    const ngayLap = document.querySelector("#ngayLap").value;
    const donYeuCau = {
      maDon,
      ngayLap,
      maLoai: 2,
      trangThai: "Chờ duyệt",
      dsNguyenLieu,
    };
    const res = await themDonYeuCau(donYeuCau);
    if (res) {
      let newRes = await modalThongBao("Lập đơn yêu cầu thành công!", true);
      if (newRes || !newRes) {
        window.location.reload();
      }
    }
  });
}
async function themInput(name = "congthuc", ds = null) {
  let className = name === "congthuc" ? "dsCongThuc" : "dsNguyenLieu";
  let dsSanPham =
    name === "congthuc" ? await layCongThuc() : await layToanBoNguyenLieu();
  let html = `<div class="inputInfo inputThanhPham ${className} row">
              <select class = "${name == "congthuc" ? "tp" : ""}">
                <option value="default">${
                  name === "congthuc" ? "Chọn công thức" : "Chọn nguyên liệu"
                }</option>
                ${dsSanPham
                  .map((sp) => {
                    if (name === "congthuc") {
                      return `<option value= ${sp.MaCongThuc}>
                    ${sp.TenCongThuc}
                  </option>;`;
                    } else {
                      return `<option value= '${sp.MaSanPham}/${sp.TenSanPham}'>
                    ${sp.TenSanPham}
                  </option>;`;
                    }
                  })
                  .join("")}
              </select>
              <input
                type="number"
                placeholder="Nhập số lượng"
                id="soluong"
                class="soluong input"
              />
              <input type ='text' disabled class='input donVi' value ="${
                name === "congthuc" ? "Đơn vị" : "KG"
              }" />
              <button type ='button' class ='btn xoaHang btnXoa btnSuperSmall'>
              X</button>
            </div>`;
  function catchEvent(e) {
    if (e.target.matches(".tp")) {
      const chiTiet = dsSanPham.filter(
        (sp) => sp.MaCongThuc == +e.target.value
      )[0];
      console.log(chiTiet.DonVi);
      e.target.closest(".row").querySelector(".donVi").value = chiTiet.DonVi;
    }
  }
  return { html, catchEvent };
}
function buttonThem() {
  return `<button type="button" class="btn secondary themNL" >Thêm</button>`;
}

function layDuLieu(element) {
  const [ma, ten] = element.children[0].value.split("/");
  const soluong = element.children[1].value;
  const donvi = element.children[2].value;
  return { ma, ten, soluong, donvi };
}

function isValidNguyenLieu({ ten, soluong }) {
  let res =
    ten !== "default" &&
    soluong !== "" &&
    !isNaN(soluong) &&
    parseInt(soluong) >= 0;
  return res;
}

function submitLapDon() {
  const lapDonNNL = document.querySelector("#lapDonNNL");
  lapDonNNL.addEventListener("click", async (e) => {
    e.preventDefault();
    let dsNguyenLieu = [];
    const chonNguyenLieu = document.querySelectorAll(".dsNguyenLieu");
    const chonCongThuc = document.querySelectorAll(".dsCongThuc");
    chonNguyenLieu.forEach((nguyenLieu, i) => {
      const { ma, ten, soluong, donVi } = layDuLieu(nguyenLieu);
      if (isValidNguyenLieu({ ten, soluong })) {
        dsNguyenLieu.push({
          ma: +ma,
          ten,
          soluong: +soluong,
          donVi,
        });
      } else {
        let warning = document.querySelector(".warning");
        let html = `Vui long chọn đầy đủ thông tin`;
        warning.innerHTML = html;
      }
    });
    const promises = Array.from(chonCongThuc).map(async (congThuc, i) => {
      const ma = congThuc.children[0].value;
      const soluong = congThuc.children[1].value;
      let warning = document.querySelector(".warning");
      if (ma != "default" && soluong != "") {
        warning.innerHTML = "";
        let data = await layChiTietCongThuc(ma);
        return data.map((d) => {
          return {
            ma: d.MaSanPham,
            ten: d.TenSanPham,
            soluong: d.SoLuong * soluong,
            donvi: d.DonVi,
          };
        });
      } else {
        let html = `Vui long chọn đầy đủ thông tin`;
        warning.innerHTML = html;
      }
    });
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
    if (!newDs.length) {
      return;
    }
    await renderDsNguyenLieu(newDs);
  });
}
init();
