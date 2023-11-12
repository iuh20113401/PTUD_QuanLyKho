"use strick";
import { menu, menuShow } from "./menu.js";
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
async function themDonYeuCau(donYeuCau) {
  let data;
  await $.ajax({
    url: "../ajax/lapDonYeuCau.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "lapDonYeuCau",
      maDon: donYeuCau.maDon,
      maLoai: donYeuCau.maLoai,
      ngayLap: donYeuCau.ngayLap,
      trangThai: donYeuCau.trangThai,
      maSanPham: donYeuCau.dsNguyenLieu.map((nl) => nl.ma),
      soLuong: donYeuCau.dsNguyenLieu.map((nl) => nl.soluong),
      donVi: donYeuCau.dsNguyenLieu.map((nl) => nl.donvi),
    },
    success: function (response) {
      data = JSON.parse(response);
    },
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
}
function content(dsNguyenLieu = null) {
  let html = `<div class="content">
        <h5>Lập đon yêu cầu > Xuất nguyên liệu</h5>
        <form class="don">
          <h2 class = "tittle">Đơn yêu cầu xuất nguyên liệu</h2>
          <div name="taikhoan" class="inputInfo--flat mb-1">
            <label for="">Người lập: </label>
            <input
              type="text"
              class="default"
              name="taiKhoan"
              readonly
              value="Giám đốc"
            />
          </div>
          <div name="ngaylap" class="inputInfo--flat mb-1">
            <label for="">Ngày lập: </label>
            <input type="date" class="inputLarge" name="taiKhoan" />
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
            <label for="">Mã đơn: </label>
            <input
              type="text"
              class="default"
              name="maDon"
              id="maDon"
              readonly
              value="${Math.floor(Math.random() * 1000)}"
            />
          </div>
          <div name="taikhoan" class="inputInfo--flat">
            <label for="">Người lập: </label>
            <input
              type="text"
              class="default"
              name="taiKhoan"
              readonly
              value="Giám đốc"
            />
          </div>
          <div name="ngaylap" class="inputInfo--flat">
            <label for="">Ngày lập: </label>
            <input
              type="date"
              class="default"
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
  let congthuc = document.querySelector("#congthuc");
  let nguyenlieu = document.querySelector("#nguyenlieu");
  let inputCongThuc = document.querySelector(".inputCongThuc");
  let inputNguyenLIeu = document.querySelector(".inputNguyenLieu");
  congthuc.addEventListener("click", async (e) => {
    if (e.target.checked) {
      const themCongThucInput = await themInput();
      const buttonThemNguyenLieu = buttonThem();
      const nguyenlieus = inputCongThuc.querySelector(".nguyenlieus");
      nguyenlieus.innerHTML = themCongThucInput;
      nguyenlieus.insertAdjacentHTML("beforeend", buttonThemNguyenLieu);
      const buttonThemNl = inputCongThuc.querySelector(".themNL");
      buttonThemNl.addEventListener("click", (e) => {
        e.target.insertAdjacentHTML("beforebegin", themCongThucInput);
      });
    } else {
      inputCongThuc.querySelector(".nguyenlieus").innerHTML = "";
    }
  });
  nguyenlieu.addEventListener("click", async (e) => {
    if (e.target.checked) {
      const themCongThucInput = await themInput("nguyenlieu");
      const buttonThemNguyenLieu = buttonThem();
      const nguyenlieus = inputNguyenLIeu.querySelector(".nguyenlieus");
      nguyenlieus.innerHTML = themCongThucInput;
      nguyenlieus.insertAdjacentHTML("beforeend", buttonThemNguyenLieu);
      const buttonThemNl = inputNguyenLIeu.querySelector(".themNL");
      buttonThemNl.addEventListener("click", (e) => {
        e.target.insertAdjacentHTML("beforebegin", themCongThucInput);
      });
    } else {
      inputNguyenLIeu.querySelector(".nguyenlieus").innerHTML = "";
    }
  });
}
function renderDsNguyenLieu(dsNguyenLieu) {
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
      let newRes = confirm("Đã thêm thành công");
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
  return `<div class="inputInfo ${className} row">
              <select >
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
              <select  id ="donVi">
                ${dsSanPham
                  .map((sp) => {
                    if (name === "congthuc") {
                      return `<option>
                    Cái
                  </option>;`;
                    } else {
                      return `<option value= '${sp.DonVi}'>
                    ${sp.DonVi}
                  </option>;`;
                    }
                  })
                  .join("")}
              </select>
            </div>`;
}
function buttonThem() {
  return `<button type="button" class="btn secondary themNL" >Thêm</button>`;
}

function submitLapDon() {
  const lapDonNNL = document.querySelector("#lapDonNNL");
  lapDonNNL.addEventListener("click", async (e) => {
    e.preventDefault();
    let dsNguyenLieu = [];
    const chonNguyenLieu = document.querySelectorAll(".dsNguyenLieu");
    const chonCongThuc = document.querySelectorAll(".dsCongThuc");
    chonNguyenLieu.forEach((nguyenLieu, i) => {
      const ma = nguyenLieu.children[0].value.split("/")[0];
      const ten = nguyenLieu.children[0].value.split("/")[1];
      const soluong = nguyenLieu.children[1].value;
      const donvi = nguyenLieu.children[2].value;
      if (ten != "default" && soluong != "") {
        dsNguyenLieu.push({
          ma: +ma,
          ten,
          soluong: +soluong,
          donvi,
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
    renderDsNguyenLieu(newDs);
  });
}
init();
