import render, { dsSanPham } from "./thanhPhamNV.js";
<<<<<<< HEAD
<<<<<<< HEAD
import { getFetch } from "./helper.js";
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
=======
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
async function themTP(maSanPham, tenSanPham) {
  let data;
  await $.ajax({
    url: "../ajax/sanPham.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "themSanPham",
      maSanPham,
      tenSanPham,
      loai: "Thành phẩm",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function capNhatSanPham(maSanPham, tenSanPham) {
  let data;
  await $.ajax({
    url: "../ajax/sanPham.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "capNhatSanPham",
      maSanPham,
      tenSanPham,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
<<<<<<< HEAD
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
  });
  return data;
}
async function xoaSanPham(maSanPham) {
<<<<<<< HEAD
<<<<<<< HEAD
  const data = await getFetch("../ajax/sanPham.php", {
    action: "xoaSanPham",
    maSanPham,
    loai: "Thành phẩm đã xóa",
  });
  return data;
}

=======
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
  let data;
  await $.ajax({
    url: "../ajax/sanPham.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "xoaSanPham",
      maSanPham,
      loai: "Thành phẩm đã xóa",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
<<<<<<< HEAD
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
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
<<<<<<< HEAD
<<<<<<< HEAD
    const donVi = document.querySelector("#donVi").value;

    let res = await themTP(maSanPham, tenSanPham, donVi);
=======
    let res = await themTP(maSanPham, tenSanPham);
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
    let res = await themTP(maSanPham, tenSanPham);
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
    if (res) {
      let resConfirm = confirm("Bạn đã thêm thành công! Bạn có muốn tiếp tục");
      if (resConfirm) {
        renderThemNL();
      } else {
        window.location.reload();
      }
    }
  });
}
function contentThemNL() {
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
<<<<<<< HEAD
<<<<<<< HEAD
          <h3>Thêm thành phẩm</h3>
=======
          <h3>Thêm công thức</h3>
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
          <h3>Thêm công thức</h3>
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
          <form action="" class="form">
            <div class="inputInfo--flat mt-1">
              <label for="maTP" class="label" >Mã thành phẩm</label>
              <input type="text" name="maTP" id="maTP" class="inputLarge" readonly value =${Math.floor(
                Math.random() * 1000
              )} />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="tenTP" class="label">Tên thành phẩm</label>
              <input type="text" name="tenTP" id="tenTP" class="inputLarge" />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="moTa" class="label">Đơn vị</label>
<<<<<<< HEAD
<<<<<<< HEAD
              <input type="text" name="donVi" id="donVi" class="inputLarge" value ="Cái"/>
=======
              <input type="text" name="donVi" id="donVi" class="inputLarge" value ="Cái" readonly/>
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
              <input type="text" name="donVi" id="donVi" class="inputLarge" value ="Cái" readonly/>
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
            </div>
            
            <div class="buttons center mt-1">
              <button type="button" id = "themTP" class="btn primary large center">Thêm thành phẩm</button>
            </div>
          </form>
        </div>`;
  return html;
}
function xoaSuaBtn() {
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
      renderSua(ma);
    });
  });
  btnXoa.forEach((xoa) => {
    xoa.addEventListener("click", (e) => {
      const ma = xoa.closest("tr").children[0].textContent;
      const ten = xoa.closest("tr").children[1].textContent;
      renderXoa(ma, ten);
    });
  });
}
function renderSua(id) {
  const chiTiet = dsSanPham.filter((sp) => sp.MaSanPham == id);
  id, dsSanPham, chiTiet;
  let content = document.querySelector(".content");
  content.innerHTML = contentSua(chiTiet[0]);
  const btnSuaNL = document.querySelector("#suaNL");
  btnSuaNL.addEventListener("click", async (e) => {
    const maSanPham = document.querySelector("#maTP").value;
    const tenSanPham = document.querySelector("#tenTP").value;
<<<<<<< HEAD
<<<<<<< HEAD
    const donVi = document.querySelector("#donVi").value;
    let res = await capNhatSanPham(maSanPham, tenSanPham, donVi);
=======
    let res = await capNhatSanPham(maSanPham, tenSanPham);
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
    let res = await capNhatSanPham(maSanPham, tenSanPham);
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
    if (res) {
      let resConfirm = confirm(
        "Bạn đã cập nhật thành công! Có muốn tiếp tục không?"
      );
      if (resConfirm) {
        renderSua(maSanPham);
      } else {
        window.location.reload();
      }
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
<<<<<<< HEAD
<<<<<<< HEAD
          <h3>Thêm thành phẩm</h3>
=======
          <h3>Thêm công thức</h3>
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
          <h3>Thêm công thức</h3>
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
          <form action="" class="form">
            <div class="inputInfo--flat mt-1">
              <label for="maTP" class="label" >Mã thành phẩm</label>
              <input type="text" name="maTP" id="maTP" class="inputLarge" readonly value =${chiTiet.MaSanPham} />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="tenTP" class="label">Tên nguyên liệu</label>
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
<<<<<<< HEAD
<<<<<<< HEAD
              <input type="text" name="donVi" id="donVi" class="inputLarge" value ="${chiTiet.DonVi}" />
=======
              <input type="text" name="donVi" id="donVi" class="inputLarge" value ="${chiTiet.DonVi}" readonly/>
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
=======
              <input type="text" name="donVi" id="donVi" class="inputLarge" value ="${chiTiet.DonVi}" readonly/>
>>>>>>> 9b080c2a6249ad6774275c31feadc130497312ac
            </div>
            
            <div class="buttons center mt-1">
              <button type="button" id = "suaNL" class="btn primary large center">Sửa nguyên liệu</button>
            </div>
          </form>
        </div>`;
  return html;
}
async function renderXoa(ma, ten) {
  let resConfirm = confirm(`Bạn có xác nhận muốn xóa nguyên liệu "${ten}"`);
  if (resConfirm) {
    let res = xoaSanPham(ma);
    if (!res) {
      alert("Xóa không thành công");
    } else {
      alert("Đã xóa thành công!");
      window.location.reload();
    }
  }
}
export { themBtn, xoaSuaBtn };
