"use strick";
import { menu, menuShow } from "./menu.js";
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
            <input type="date" class="" name="taiKhoan" />
          </div>
          <h3>Danh sách yêu cầu</h3>
          <div class="largeInput inputCongThuc">
            <div class="inputInfo row ">
              <input type="checkbox" name="congthuc" id="congthuc" />
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
          <button class="btn large center primary" id="lapDonNNL">
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
        <h5>Lập đon yêu cầu > Xuất nguyên liệu</h5>
        <form class="don">
          <h2 class="tittle">Đơn yêu cầu xuất nguyên liệu</h2>
          <div name="maDon" class="inputInfo--flat">
            <label for="">Ma don: </label>
            <input
              type="text"
              class="default"
              name="maDon"
              readonly
              value="212212"
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
              value="2023-03-23"
              name="taiKhoan"
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
  congthuc.addEventListener("click", (e) => {
    if (e.target.checked) {
      const themCongThucInput = themInput();
      const buttonThemNguyenLieu = buttonThem();
      const nguyenlieus = inputCongThuc.querySelector(".nguyenlieus");
      nguyenlieus.innerHTML = themCongThucInput;
      nguyenlieus.insertAdjacentHTML("beforeend", buttonThemNguyenLieu);
      const buttonThemNl = inputCongThuc.querySelector(".themNL");
      console.log(buttonThemNl);
      buttonThemNl.addEventListener("click", (e) => {
        e.target.insertAdjacentHTML("beforebegin", themCongThucInput);
      });
    } else {
      inputCongThuc.querySelector(".nguyenlieus").innerHTML = "";
    }
  });
  nguyenlieu.addEventListener("click", (e) => {
    if (e.target.checked) {
      const themCongThucInput = themInput("nguyenlieu");
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
  btnXacNhan.addEventListener("click", (e) => {
    console.log(dsNguyenLieu);
  });
}
function themInput(name = "congthuc") {
  return `<div class="inputInfo dsNguyenLieu row">
              <select name="${
                name === "congthuc" ? "chonCongThuc" : "chonNguyenLieu"
              }" class="
              ${name === "congthuc" ? "chonCongThuc" : "chonNguyenLieu"}">
                <option value="default">${
                  name === "congthuc" ? "Chọn công thức" : "Chọn nguyên liệu"
                }</option>
                <option value="nguyenlieu1">${
                  name === "congthuc" ? "Congthuc1" : "NguyenLieu1"
                }</option>
              </select>
              <input
                type="number"
                placeholder="Nhập số lượng"
                id="soluong"
                class="soluong"
              />
            </div>`;
}
function buttonThem() {
  return `<button type="button" class="btn secondary themNL" >Thêm</button>`;
}

function submitLapDon() {
  const lapDonNNL = document.querySelector("#lapDonNNL");
  lapDonNNL.addEventListener("click", (e) => {
    e.preventDefault();
    const dsNguyenLieu = [];
    const chonNguyenLieu = document.querySelectorAll(".dsNguyenLieu");
    chonNguyenLieu.forEach((nguyenLieu, i) => {
      const ten = nguyenLieu.children[0].value;
      const soluong = nguyenLieu.children[1].value;
      if (ten != "default" && soluong != "") {
        dsNguyenLieu.push({
          ten,
          soluong,
        });
        if (i === chonNguyenLieu.length - 1) {
          lapDonNNL.replaceWith(lapDonNNL.cloneNode(true));
          renderDsNguyenLieu(dsNguyenLieu);
        }
      } else {
        let warning = document.querySelector(".warning");
        let html = `Vui long chọn đầy đủ thông tin`;
        warning.innerHTML = html;
      }
    });
  });
}
init();
