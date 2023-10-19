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
function content(dsThanhPham = null) {
  let html = `<div class="content">
        <h5>Lập đon yêu cầu > Xuất thành phẩm</h5>
        <form class="don">
          <h2 class = "tittle">Đơn yêu cầu xuất thành phẩm</h2>
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
          <div class= "largeInput inputThanhPham">
          ${themInput()}
          </div>
            ${buttonThem()}
          <div class ="warning"></div>
          <button class="btn large center primary" id="lapDonTP">
            Lập đơn yêu cầu
          </button>
        </form>
      </div>`;
  let html2;
  if (dsThanhPham !== null) {
    html = dsThanhPham.reduce((acc, tp) => {
      let html = `<tr>
              <td>${tp.ten}</td>
              <td>${tp.soluong}</td>
              <td>KG</td>
            </tr>`;
      return acc + html;
    }, "");
    html2 = `<div class="content">
        <h5>Lập đon yêu cầu > Xuất thành phẩm</h5>
        <form class="don">
          <h2 class="tittle">Đơn yêu cầu xuất thành phẩm</h2>
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
          <div name="taikhoan" class="inputInfo--flat">
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
              <th>Tên thành phẩm</th>
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

  return dsThanhPham !== null ? html2 : html;
}
function init() {
  render();
  submitLapDon();

  const themCongThucInput = themInput();
  const buttonThemTP = document.querySelector(".themTP");
  const inputThanhPham = document.querySelector(".inputThanhPham");
  buttonThemTP.addEventListener("click", (e) => {
    inputThanhPham.insertAdjacentHTML("beforeend", themCongThucInput);
  });
}
function renderDsNguyenLieu(dsThanhPham) {
  render(dsThanhPham);
  const btnHuy = document.querySelector("#Huy");
  const btnXacNhan = document.querySelector("#xacNhan");
  btnHuy.addEventListener("click", (e) => {
    init();
  });
  btnXacNhan.addEventListener("click", (e) => {
    console.log(dsThanhPham);
  });
}
function themInput() {
  return `<div class="inputInfo dsThanhPham row">
              <select name="thanhPham" class="thanhPham">
                <option value="default">Chọn thành phẩm
                </option>
                <option value="thanhPham1">thanhPham</option>
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
  return `<button type="button" class="btn secondary themTP" >Thêm</button>`;
}

function submitLapDon() {
  const lapDonTP = document.querySelector("#lapDonTP");
  lapDonTP.addEventListener("click", (e) => {
    e.preventDefault();
    const dsThanhPham = [];
    const chonNguyenLieu = document.querySelectorAll(".dsThanhPham");
    chonNguyenLieu.forEach((thanhPham, i) => {
      const ten = thanhPham.children[0].value;
      const soluong = thanhPham.children[1].value;
      if (ten != "default" && soluong != "") {
        dsThanhPham.push({
          ten,
          soluong,
        });
        if (i === chonNguyenLieu.length - 1) {
          lapDonTP.replaceWith(lapDonTP.cloneNode(true));
          renderDsNguyenLieu(dsThanhPham);
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
