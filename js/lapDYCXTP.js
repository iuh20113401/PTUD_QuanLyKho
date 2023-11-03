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
        <h5>Lập đơn yêu cầu > Xuất thành phẩm</h5>
        <form class="don">
          <h2 class = "tittle">ĐƠN YÊU CẦU XUẤT THÀNH PHẨM</h2>
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
          <div class= "largeInput inputThanhPham">
          <table id="table2">
                <tr>
                    <th>Tên thành phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn vị</th>
                </tr></table>
          ${themInput()}
          </div>
            ${buttonThem()}
          <div class ="warning"></div>
          <button class="btn large center primary" id="lapDonTP"> Tiếp tục</button>
        </form>
      </div>`;

  return dsThanhPham !== null ? html : html;
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
            <table>
            <tr>
            <th><select name="thanhPham" class="thanhPham">
                <option value="default">Chọn thành phẩm
                </option>
                <option value="thanhPham1">thanhPham</option>
              </select></th>
            
            <th><input
                type="number"
                placeholder="Nhập số lượng"
                id="soluong"
                class="soluong"
              /></th>

              <th><input
                    type="text"
                    placeholder="Nhập đơn vị"
                    id="donvi"
                    class="donvi"
                  /></th>
            </table>
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
