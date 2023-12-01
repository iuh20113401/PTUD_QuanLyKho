import { menu, menuShow, highLightMenu } from "./menu.js";
import { getFetch, modalThongBao } from "./helper.js";
async function layThongTinTaiKhoan() {
  const data = await getFetch("../ajax/session.php", {
    action: "layThongTinTaiKhoan",
  });
  return data;
}

async function dangXuat() {
  const data = await getFetch("../ajax/session.php", {
    action: "dangXuat",
  });
  return data;
}

async function doiMatKhau(matKhauMoi) {
  const data = await getFetch("../ajax/taiKhoan.php", {
    action: "doiMatKhau",
    matKhau: matKhauMoi,
  });
  return data;
}

let taiKhoan = await layThongTinTaiKhoan();
if (taiKhoan) {
  switch (taiKhoan[0]) {
    case 1:
      taiKhoan[1] = "Giám đốc";
      break;
    case 2:
      taiKhoan[1] = "Quản lý kho";
      break;
    case 3:
      taiKhoan[1] = "Nhân viên kho";
      break;
    case 4:
      taiKhoan[1] = "Bộ phận sản xuất";
      break;
    case 5:
      taiKhoan[1] = "Bộ phận bán hàng";
      break;
    case 6:
      taiKhoan[1] = "Bộ phận kiểm kê";
      break;
  }
}
async function render() {
  let html = contentToanBo();
  html = `${menu()}
      ${contentToanBo()}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  highLightMenu();
  //   renderSearch();
  //   renderChiTiet();
}
function contentToanBo() {
  let html = `<div class="content">
       <h3>Tài khoản</h3>
        <div class="content__inner chitiet">
          <h3>Thông tin tài khoản</h3>
          <div  class="inputInfo--flat mt-1">
            <label class="labelLarge" for= "maTK">Mã tài khoản</label>
            <input type="text" class="inputLargeX" name = "maTK" id ="maTK" value = '${taiKhoan[2]}' disabled/> 
          </div>
          <div  class="inputInfo--flat mt-1">
            <label class="labelLarge" for= "tenVT" >Vai trò</label>
            <input type="text" class="inputLargeX" name = "tenVT" id ="tenVT" value = '${taiKhoan[1]}' disabled/> 
          </div>
          <div  class="inputInfo--flat mt-1">
            <label class="labelLarge" for= "tenDN">Tên đăng nhập</label>
            <input type="text" class="inputLargeX" name = "tenDN" id ="tenDN" value = '${taiKhoan[3]}' disabled/> 
          </div>
          <div  class="inputInfo--flat mt-1">
            <label class="labelLarge">Mật khẩu</label>
            <input type="password" class="inputLargeX" name = "MK" id ="MK" value ="soemhdoaigda" disabled/> 
          </div>
          <div class ="buttons mt-1 center">
          <button class="btn primary center" id="sua">Sửa</button>
            <button class="btn btnXoa center" id = "dangXuat">Đăng xuất</button>
            </div>
        </div>
      </div>`;
  return html;
}

function init() {
  render();
  const btnDX = document.querySelector("#dangXuat");
  const btnSua = document.querySelector("#sua");
  btnDX.addEventListener("click", async (e) => {
    await dangXuat();
    window.location.href = "../index.html";
  });
  btnSua.addEventListener("click", async (e) => {
    const matKhau = document.querySelector("#MK");
    matKhau.removeAttribute("disabled");
    const buttons = document.querySelector(".buttons");
    let html = `<button class="btn primary center" id="xacNhan">Xác nhận</button>
            <button class="btn secondary center" id = "quayLai">Quay lại</button>`;
    buttons.innerHTML = html;
    const btnQuayLai = document.querySelector("#quayLai");
    const btnXacNhan = document.querySelector("#xacNhan");
    btnQuayLai.addEventListener("click", (e) => {
      init();
    });
    btnXacNhan.addEventListener("click", async (e) => {
      const matKhauMoi = matKhau.value;
      let res = await doiMatKhau(matKhauMoi);
      if (res) {
        await dangXuat();
        await modalThongBao("Đổi mật khẩu thành công~", true);
        window.location.href("../index.html");
      }
    });
  });
}
init();
export default taiKhoan;
