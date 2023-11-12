import { menu, menuShow, highLightMenu } from "./menu.js";

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
       <h3>Sản phẩm > <a href="nguyenLieu.html">Nguyên Liệu</a></h3>
        <form class="search">
            <div class ='inputGroup'>
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
            </div>
          </form>
        <div class="content__inner chitiet">
          <h3>Thông tin tài khoản</h3>
          <div  class="inputInfo--flat mt-1">
            <label class="labelLarge" for= "maTK">Mã tài khoản</label>
            <input type="text" class="inputLargeX" name = "maTK" id ="maTK" value = ${taiKhoan[2]} disabled/> 
          </div>
          <div  class="inputInfo--flat mt-1">
            <label class="labelLarge" for= "tenVT" >Vai trò</label>
            <input type="text" class="inputLargeX" name = "tenVT" id ="tenVT" value = ${taiKhoan[1]} disabled/> 
          </div>
          <div  class="inputInfo--flat mt-1">
            <label class="labelLarge" for= "tenDN">Tên đăng nhập</label>
            <input type="text" class="inputLargeX" name = "tenDN" id ="tenDN" value = ${taiKhoan[3]} disabled/> 
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
}
init();
export default taiKhoan;
