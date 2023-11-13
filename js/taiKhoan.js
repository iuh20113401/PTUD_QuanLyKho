import { menu, menuShow, highLightMenu } from "./menu.js";
<<<<<<< HEAD
<<<<<<< HEAD
import { getFetch } from "./helper.js";
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
=======
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac

async function layThongTinTaiKhoan() {
  let data;
  await $.ajax({
    url: "../ajax/session.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layThongTinTaiKhoan",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function dangXuat() {
  let data;
  await $.ajax({
    url: "../ajax/session.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "dangXuat",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
let taiKhoan = await layThongTinTaiKhoan();
<<<<<<< HEAD
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
async function render() {
  let html = contentToanBo();

  html = `${menu()}
      ${html}
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
<<<<<<< HEAD
<<<<<<< HEAD
       <h3>Tài khoản</h3>
=======
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
       <h3>Sản phẩm > <a href="nguyenLieu.html">Nguyên Liệu</a></h3>
        <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
<<<<<<< HEAD
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
        <div class="content__inner chitiet">
          <h3>Thông tin tài khoản</h3>
          <div  class="inputInfo--flat mt-1">
            <label class="labelLarge" for= "maTK">Mã tài khoản</label>
<<<<<<< HEAD
<<<<<<< HEAD
            <input type="text" class="inputLargeX" name = "maTK" id ="maTK" value = '${taiKhoan[2]}' disabled/> 
          </div>
          <div  class="inputInfo--flat mt-1">
            <label class="labelLarge" for= "tenVT" >Vai trò</label>
            <input type="text" class="inputLargeX" name = "tenVT" id ="tenVT" value = '${taiKhoan[1]}' disabled/> 
          </div>
          <div  class="inputInfo--flat mt-1">
            <label class="labelLarge" for= "tenDN">Tên đăng nhập</label>
            <input type="text" class="inputLargeX" name = "tenDN" id ="tenDN" value = '${taiKhoan[3]}' disabled/> 
=======
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
            <input type="text" class="inputLargeX" name = "maTK" id ="maTK" value = ${taiKhoan[2]} disabled/> 
          </div>
          <div  class="inputInfo--flat mt-1">
            <label class="labelLarge" for= "tenVT" >Vai trò</label>
            <input type="text" class="inputLargeX" name = "tenVT" id ="tenVT" value = ${taiKhoan[1]} disabled/> 
          </div>
          <div  class="inputInfo--flat mt-1">
            <label class="labelLarge" for= "tenDN">Tên đăng nhập</label>
            <input type="text" class="inputLargeX" name = "tenDN" id ="tenDN" value = ${taiKhoan[3]} disabled/> 
<<<<<<< HEAD
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
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

<<<<<<< HEAD
<<<<<<< HEAD
function init() {
  render();
  const btnDX = document.querySelector("#dangXuat");
  const btnSua = document.querySelector("#sua");
  btnDX.addEventListener("click", async (e) => {
    await dangXuat();
    window.location.reload();
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
        alert("Đổi mật khẩu thành công~");
        await dangXuat();
        window.location.reload();
      }
    });
  });
=======
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
function renderChiTiet() {
  const sanPham = document.querySelectorAll(".hover");
  sanPham.forEach((sp) => {
    sp.addEventListener("click", async (e) => {
      if (e.target.id === "sua" || e.target.id === "xoa") return;
      const dsChiTietSanPham = await layChiTietSanPham(sp.id);
      document.querySelector(".content").innerHTML =
        contentChitiet(dsChiTietSanPham);
      const quayLai = document.querySelector("#quayLai");
      quayLai.addEventListener("click", (e) => {
        window.location.reload();
      });
    });
  });
}
function init() {
  render();
  const btnDX = document.querySelector("#dangXuat");
  btnDX.addEventListener("click", async (e) => {
    dangXuat();
    window.location.reload();
  });
<<<<<<< HEAD
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
}
init();
export default taiKhoan;
