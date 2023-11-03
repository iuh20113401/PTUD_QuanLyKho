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
        <h5>Lập đơn yêu cầu > Xuất nguyên liệu</h5>
        <form class="don">
          <h2 class = "tittle">ĐƠN YÊU CẦU XUẤT NGUYÊN LIỆU</h2>
          <table>
            <tr>
            <td><label for="">Mã đơn </label></td>
            <td><input type="text" class="" name="maDon" value="0020" readonly/><td>
            </tr>

            <tr>
            <td><label for="">Ngày lập đơn</label></td>
            <td><input type="date" class="" name="ngayLap" /></td>
            </tr>

            <tr>
            <td><label for="">Người lập đơn</label></td>
            <td><input
                type="text"
                class="default"
                name="taiKhoan"
                readonly
                value="20010021"
                /></td>
            </tr>
            </table>

          <h3>Danh sách yêu cầu</h3>
          <div class="largeInput inputNguyenLieu">
            <div class="inputInfo row">
              <input type="checkbox" name="nguyenlieu" id="nguyenlieu" />
              <label for="nguyenlieu">Nhập theo nguyên liệu</label>
            </div>
            <div class = "nguyenlieus"></div>
          </div>

          <div class="largeInput inputCongThuc">
            <div class="inputInfo row ">
              <input type="checkbox" name="congthuc" id="congthuc" />
              <label for="congthuc">Nhập theo công thức</label>
            </div>
            <div class = "nguyenlieus"></div>
          </div>

          
          <div class ="warning"></div>
          <button class="btn large center primary" id="lapDonNNL">Tiếp tục </button>
        </form>
      </div>`;

  return dsNguyenLieu !== null ? html : html;
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
        <table>
            <tr>
            <td>
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
              </select></td>
              <td>
              <input
                type="number"
                placeholder="Nhập số lượng"
                id="soluong"
                class="soluong"
              /></td>

              <td>
              <input
                type="text"
                placeholder="Nhập đơn vị"
                id="donvi"
                class="donvi"
              /></td>
              <tr>
              </table>
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
