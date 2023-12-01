import render from "./thanhPhamNV.js";
import {
  getFetch,
  modalThongBao,
  modalXacNhan,
  thongBaoLoi,
} from "./helper.js";
async function themTP(maSanPham, tenSanPham, donVi) {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "themSanPham",
    maSanPham,
    tenSanPham,
    donVi,
    loai: "Thành phẩm",
  });
  return data;
}

async function capNhatSanPham(maSanPham, tenSanPham, donVi) {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "capNhatSanPham",
    maSanPham,
    tenSanPham,
    donVi,
  });
  return data;
}
async function xoaSanPham(maSanPham) {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "xoaSanPham",
    maSanPham,
    loai: "Thành phẩm đã xóa",
  });
  return data;
}

function themBtn() {
  const formSearch = document.querySelector(".search");
  let html = `<button type="button" id="themTP" class ="btn primary">Thêm thành phẩm</button>`;
  formSearch.insertAdjacentHTML("beforeend", html);
  let btnThem = document.querySelector("#themTP");
  btnThem.addEventListener("click", (e) => {
    renderThemNL();
  });
}
function renderThemNL() {
  let content = document.querySelector(".content");
  content.innerHTML = contentThemNL();
  const btnThemNL = document.querySelector("#themTP");
  btnThemNL.addEventListener("click", async (e) => {
    const maSanPham = document.querySelector("#maTP").value;
    const tenSanPham = document.querySelector("#tenTP").value;
    const donVi = document.querySelector("#donVi").value;
    if (tenSanPham == "" || donVi == "") {
      thongBaoLoi("Vui lòng điền đầy đủ thông tin ");
      return;
    }
    let res = await themTP(maSanPham, tenSanPham, donVi);
    if (res) {
      let resConfirm = await modalThongBao("Bạn đã thêm thành công!", true);
      window.location.reload();
    }
  });
}
function contentThemNL() {
  let maThanhPham =
    "2" + Math.floor(Math.random() * (9999999 - 1000000) + 1000000);
  let html = `<h3><a href='thanhPham.html'>Thành phẩm</a> > Thêm thành phẩm</h3>
        <form class="search">
          <div class="inputGroup">
            <input type="text" name="search" id="search" />
            <button type="button">
              <i
                class="fa-solid fa-magnifying-glass"
                style="color: #1e5cc8"
              ></i>
            </button>
          </div>
          <button class ="btn secondary">Quay lại</button>
        </form>
        <div class="content__inner chitiet">
          <h3>Thêm thành phẩm</h3>
          <form action="" class="form">
            <div class="inputInfo--flat mt-1">
              <label for="maTP" class="label" >Mã thành phẩm</label>
              <input type="text" name="maTP" id="maTP" class="inputLarge" readonly value =${maThanhPham} />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="tenTP" class="label">Tên thành phẩm</label>
              <input type="text" name="tenTP" id="tenTP" class="inputLarge" />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="moTa" class="label">Đơn vị</label>
              <input type="text" name="donVi" id="donVi" class="inputLarge" value ="Hộp"/>
            </div>
            
            <div class="buttons center mt-1">
              <button type="button" id = "themTP" class="btn primary large center">Thêm thành phẩm</button>
            </div>
          </form>
        </div>`;
  return html;
}
function xoaSuaBtn(dsSanPham) {
  if (!dsSanPham) return;
  const thanhPhams = document.querySelectorAll(".hover");
  const muc = document.querySelector(".muc");
  let html = `<td><div class="buttons">
            <button class="btn primary large" id="sua">Sửa</button>
            <button class="btn btnXoa large" id = "xoa">Xóa</button>
          </div></td>`;
  muc.insertAdjacentHTML("beforeend", `<th>Hành động</th>`);
  thanhPhams.forEach((tp) => {
    tp.insertAdjacentHTML("beforeend", html);
  });
  const btnSua = document.querySelectorAll("#sua");
  const btnXoa = document.querySelectorAll("#xoa");
  btnSua.forEach((sua) => {
    sua.addEventListener("click", (e) => {
      const ma = sua.closest("tr").children[0].textContent;
      renderSua(dsSanPham, ma);
    });
  });
  btnXoa.forEach((xoa) => {
    xoa.addEventListener("click", (e) => {
      const ma = xoa.closest("tr").children[0].textContent;
      const ten = xoa.closest("tr").children[1].textContent;
      const soLuong = xoa.closest("tr").children[2].textContent;
      renderXoa(ma, ten, soLuong);
    });
  });
}
function renderSua(dsSanPham, id) {
  const chiTiet = dsSanPham.filter((sp) => sp.MaSanPham == id);
  id, dsSanPham, chiTiet;
  let content = document.querySelector(".content");
  content.innerHTML = contentSua(chiTiet[0]);
  const btnSuaNL = document.querySelector("#suaNL");
  btnSuaNL.addEventListener("click", async (e) => {
    const maSanPham = document.querySelector("#maTP").value;
    const tenSanPham = document.querySelector("#tenTP").value;
    const donVi = document.querySelector("#donVi").value;
    if (tenSanPham == "" || donVi == "") {
      thongBaoLoi("Vui điền đầy đủ thông tin");
      return;
    }
    let res = await capNhatSanPham(maSanPham, tenSanPham, donVi);
    if (res) {
      await modalThongBao("Bạn đã cập nhật thành công! ", true);
      window.location.reload();
    }
  });
}
function contentSua(chiTiet) {
  let html = `<h3><a href='thanhPham.html'>Thành phẩm</a> > Sửa thành phẩm </h3>
        <form class="search">
          <div class="inputGroup">
            <input type="text" name="search" id="search" />
            <button type="button">
              <i
                class="fa-solid fa-magnifying-glass"
                style="color: #1e5cc8"
              ></i>
            </button>
          </div>
          <button class ="btn secondary">Quay lại</button>
        </form>
        <div class="content__inner chitiet">
          <h3>Thêm thành phẩm</h3>
          <form action="" class="form">
            <div class="inputInfo--flat mt-1">
              <label for="maTP" class="label" >Mã thành phẩm</label>
              <input type="text" name="maTP" id="maTP" class="inputLarge" readonly value =${chiTiet.MaSanPham} />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="tenTP" class="label">Tên thành phẩm</label>
              <input type="text" name="tenTP" id="tenTP" class="inputLarge" value='${chiTiet.TenSanPham}' />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="slTon" class="label">Số lượng tồn</label>
              <input type="number" name="slTon" id="slTon" class="inputLarge" value ="${chiTiet.SoLuongTon}" readonly/>
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="slTon" class="label">Số lượng chờ nhập</label>
              <input type="number" name="slChoNhap" id="slChoNhap" class="inputLarge" value ="${chiTiet.SoLuongChoNhap}" readonly/>
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="slTon" class="label">Số lượng chờ xuất</label>
              <input type="number" name="slChoXuat" id="slChoXuat" class="inputLarge" value ="${chiTiet.SoLuongChoXuat}" readonly/>
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="moTa" class="label">Đơn vị</label>
              <input type="text" name="donVi" id="donVi" class="inputLarge" value ="${chiTiet.DonVi}" />
            </div>
            
            <div class="buttons center mt-1">
              <button type="button" id = "suaNL" class="btn primary large center">Sửa</button>
            </div>
          </form>
        </div>`;
  return html;
}
async function renderXoa(ma, ten, soLuong) {
  if (soLuong > 0) {
    await modalThongBao(
      "Thành phẩm hiện còn đang tồn kho! Không thể xóa",
      false
    );
    return;
  }
  let resConfirm = await modalXacNhan(
    `Bạn có xác nhận muốn xóa thành phẩm "${ten}"`
  );
  if (resConfirm) {
    let res = xoaSanPham(ma);
    if (!res) {
      await modalThongBao("Xóa không thành công", false);
    } else {
      await modalThongBao("Đã xóa thành công!", true);
      window.location.reload();
    }
  }
}
export { themBtn, xoaSuaBtn };
