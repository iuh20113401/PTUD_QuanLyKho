"use strict";
import { menu, menuShow } from "./menu.js";
function render(bienBan = null) {
  let html = bienBan !== null ? content(bienBan) : content();
  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
}
function content(bienBan = null) {
  let html = `<div class="content">
  <h5>Lập biên bản</h5>
  <form class="don">
    <h2 class = "tittle">BIÊN BẢN</h2>
    <table>
      <tr>
      <td><label for="">Ngày lập đơn</label></td>
      <td><input type="date" 
        name="ngayLapDon"
        id="ngayLapDon"
        value="01-11-2023"/></td>
      </tr>

      <tr>
      <td><label for="">Người lập đơn</label></td>
      <td><input
        type="text"
        class=""
        name="taiKhoan"
        value="20010021"
        readonly
      /></td>
      </tr>

      <tr>
      <td><label for="">Mã đơn truy xuất</label></td>
      <td><input
          type="text"
          class=""
          name="madon"
          required>
        </td>
      </tr>

      <tr>
      <td><label for="">Lý do lập đơn</label></td>
      <td><textarea 
          type="text"
          class=""
          name="lydo"
          required
          rows="4"></textarea></td>
      </tr>
  </table>
    <div class ="warning"></div>
    <button class="btn large center primary" id="tiepTuc">Tiếp tục</button>
  </form>
</div>`;
   return bienBan !== null ? html : html;
}
function init() {
  render();
  submitLapBB();

}

/*
function submitLapBB() {
  const tiepTucBtn = document.querySelector("#tiepTuc");
  tiepTucBtn.addEventListener("click", function(event) {
    event.preventDefault();

    }
}
*/
init();
