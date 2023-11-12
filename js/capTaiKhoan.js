"use strict;";
import { menu, menuShow, highLightMenu } from "./menu.js";
const dsTaiKhoan = [{ TenDangNhap: 20113401, MatKhau: "password123" }];
async function themTaiKhoan(loai, tenDangNhap, password) {
  let data;
  await $.ajax({
    url: "../ajax/taiKhoan.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "themTaiKhoan",
      loai: loai,
      tenDangNhap: tenDangNhap,
      pass: password,
    },
    success: function (response) {
      response;
      data = JSON.parse(response);
    },
  });
  return data;
}
function init() {
  let html = `${menu()}`;
  let container = document.querySelector(".container");
  container.insertAdjacentHTML("afterbegin", html);
  menuShow();
  highLightMenu();
  let btnCapTaiKhoan = document.querySelector("#capTaiKhoan");
  btnCapTaiKhoan.addEventListener("click", (e) => {
    let msnv = document.querySelector("#msnv").value;
    let vaitro = document.querySelector("#vaitro").value;
    let vaitroValue = document.querySelector(
      "#vaitro option:checked"
    ).textContent;
    let reg = /^[0-9]{8}$/;
    let error = document.querySelector(".loiMsnv");
    let errorVT = document.querySelector(".loiVaiTro");
    if (!reg.test(msnv)) {
      error.textContent =
        "Vui lòng nhập đúng định dạng mã số nhân viên bao gồm 8 chữ số trỡ lên!";
      return;
    } else {
      if (dsTaiKhoan.filter((tk) => tk.TenDangNhap == msnv).length) {
        error.textContent = "Mã nhân viên đã có trong hệ thống!";
        return;
      } else error.textContent = "";
    }
    if (vaitro === "") {
      errorVT.textContent = "Vui lòng chọn loại vai trò cho tài khoản!";
      return;
    } else {
      errorVT.textContent = "";
    }
    themOverLay(msnv, vaitro, vaitroValue);
    msnv, vaitro, vaitroValue;
  });
}
function themOverLay(msnv, vaitro, vaitroValue) {
  let html = `<div class="overlay"></div>
      <div class="message message__lage xacNhanTaiKhoan">
        <h3>Tài khoản của bạn là</h3>
        <p><span>Vai trò:</span> ${vaitroValue}</p>
        <p><span>Mã tài khoản:</span> ${msnv}</p>
        <p><span>Password:</span> pasword123</p>
        <div class="buttons">
          <button class="btn primary" id="xacNhan">Xác nhận</button>
          <button class="btn secondery"  id="huy">Hủy</button>
        </div>
      </div>`;
  const overlayDivEl = document.querySelector(".overlayDiv");
  overlayDivEl.innerHTML = html;
  let btnHuy = overlayDivEl.querySelector("#huy");
  let btnXacNhan = overlayDivEl.querySelector("#xacNhan");
  let divMessage = overlayDivEl.querySelector(".message");
  btnXacNhan.addEventListener("click", async (e) => {
    divMessage.classList.remove("message__large");
    const data = await themTaiKhoan(vaitro, msnv, "password123");
    data;
    divMessage.innerHTML =
      "<h2 class='text__center'>Tạo tài khoản thành công</h2>";
    overlayDivEl.addEventListener("click", function hideOverLay(e) {
      if (e.target != btnXacNhan) {
        window.location.reload();
      }
    });
  });
}
function xoaOverLay() {
  const overlayDivEl = document.querySelector(".overlayDiv");
  overlayDivEl.innerHTML = "";
}
init();
