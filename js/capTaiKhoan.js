"use strict;";
import { menu, menuShow, highLightMenu } from "./menu.js";
import { getFetch } from "./helper.js";
const dsTaiKhoan = [];
async function themTaiKhoan(loai, tenDangNhap, password, viTriKho = null) {
  let data = await getFetch("../ajax/taiKhoan.php", {
    action: "themTaiKhoan",
    loai: loai,
    tenDangNhap: tenDangNhap,
    pass: password,
    viTriKho,
  });
  return data;
}
async function layToanBoKho() {
  let data = await getFetch("../ajax/kho.php", {
    action: "layTatCaKho",
  });
  return data;
}

function init() {
  let html = `${menu()} ${content()}`;
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
  });
  let vaitroSelect = document.querySelector("#vaitro");
  vaitroSelect.addEventListener("change", function (e) {
    handleVaiTroChange(e.target.value);
  });
}
async function handleVaiTroChange(vaitro) {
  let inputKhoContainer = document.querySelector(".inputKhoContainer");
  if (vaitro === "3") {
    let dsKho = await layToanBoKho();
    if (!inputKhoContainer) {
      let html = `
                <div class="inputInfo inputInfo__center inputKhoContainer">
                    <label for="viTriKho">Vị trí kho</label>
                    <select id='kho'>
                      ${dsKho.map((kho) => {
                        return `<option value='${kho.MaKho}'>${kho.TenKho}</option>`;
                      })}
                    </select>
                </div>
            `;
      let form = document.querySelector("form");
      form.insertAdjacentHTML("beforeend", html);
    }
  } else {
    if (inputKhoContainer) {
      // Xóa input nếu không phải là Nhân viên kho
      inputKhoContainer.remove();
    }
  }
}
function content() {
  return `<div class="content">
        <a href="#"> <h3>Phân phối > Cấp tài khoản</h3></a>
        <div class="content__inner chitiet">
          <h3>Cấp tài khoản nhân viên</h3>
          <form action="#">
            <div class="inputInfo inputInfo__center">
              <label for="msnv">Mã số nhân viên</label>
              <input
                type="text"
                class="noMargin largeInput"
                name="msnv"
                id="msnv"
              />
              <p class="loiMsnv alert"></p>
            </div>
            <div class="inputInfo inputInfo__center">
              <label for="vaitro">Loại vai trò</label>
              <select class="noMargin" name="vaitro" id="vaitro">
                <option value="">Chọn loại vai trò</option>
                <option value="3">Nhân viên kho</option>
                <option value="5">Bộ phận bán hàng</option>
                <option value="6">Bộ phận kiểm kê</option>
                <option value="4">Bộ phận sản xuất</option>
              </select>
              <p class="loiVaiTro alert"></p>
            </div>
          </form>
          <div class="buttons buttons__large">
            <button class="btn primary center large" id="capTaiKhoan">
              Tạo tài khoản
            </button>
          </div>
        </div>
      </div>`;
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
  let viTriKho = document.querySelector("#kho") || null;

  btnXacNhan.addEventListener("click", async (e) => {
    divMessage.classList.remove("message__large");
    if (viTriKho != null) {
      console.log(vaitro, msnv, "password123", viTriKho.value);
      const data = await themTaiKhoan(
        vaitro,
        msnv,
        "password123",
        viTriKho.value
      );
    } else {
      const data = await themTaiKhoan(vaitro, msnv, "password123");
    }
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
