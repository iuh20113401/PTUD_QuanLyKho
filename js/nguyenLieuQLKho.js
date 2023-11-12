import render, { dsSanPham } from "./nguyenLieuNV.js";
async function themNL(maSanPham, tenSanPham) {
  let data;
  await $.ajax({
    url: "../ajax/sanPham.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "themSanPham",
      maSanPham,
      tenSanPham,
      loai: "Nguyên liệu",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function capNhatSanPham(maSanPham, tenSanPham) {
  maSanPham, tenSanPham;
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
  });
  return data;
}
async function xoaSanPham(maSanPham) {
  let data;
  await $.ajax({
    url: "../ajax/sanPham.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "xoaSanPham",
      maSanPham,
      loai: "Nguyên liệu đã xóa",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
function themBtn() {
  const formSearch = document.querySelector(".search");
  let html = `<button type="button" id="themNL" class ="btn primary">Thêm nguyên liệu</button>`;
  formSearch.insertAdjacentHTML("beforeend", html);
  let btnThem = document.querySelector("#themNL");
  btnThem.addEventListener("click", (e) => {
    renderThemNL();
  });
}
function renderThemNL() {
  let content = document.querySelector(".content");
  content.innerHTML = contentThemNL();
  const btnThemNL = document.querySelector("#themNL");
  btnThemNL.addEventListener("click", async (e) => {
    const maSanPham = document.querySelector("#maNL").value;
    const tenSanPham = document.querySelector("#tenNL").value;
    let res = await themNL(maSanPham, tenSanPham);
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
  let html = `<h3><a href='nguyenLieu.js'>Nguyên liệu</a> > Thêm nguyên liệu</h3>
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
          <h3>Thêm công thức</h3>
          <form action="" class="form">
            <div class="inputInfo--flat mt-1">
              <label for="maNL" class="label" >Mã nguyên liệu</label>
              <input type="text" name="maNL" id="maNL" class="inputLarge" readonly value =${Math.floor(
                Math.random() * 1000
              )} />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="tenNL" class="label">Tên nguyên liệu</label>
              <input type="text" name="tenNL" id="tenNL" class="inputLarge" />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="moTa" class="label">Mô tả</label>
              <input type="text" name="donVi" id="donVi" class="inputLarge" value ="KG" readonly/>
            </div>
            
            <div class="buttons center mt-1">
              <button type="button" id = "themNL" class="btn primary large center">Thêm nguyên liệu</button>
            </div>
          </form>
        </div>`;
  return html;
}
function xoaSuaBtn() {
  const nguyenLieus = document.querySelectorAll(".hover");
  const muc = document.querySelector(".muc");
  let html = `<td><div class="buttons">
            <button class="btn primary large" id="sua">Sửa</button>
            <button class="btn btnXoa large" id = "xoa">Xóa</button>
          </div></td>`;
  muc.insertAdjacentHTML("beforeend", `<th>Hành động</th>`);
  nguyenLieus.forEach((nl) => {
    nl.insertAdjacentHTML("beforeend", html);
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
  let content = document.querySelector(".content");
  content.innerHTML = contentSua(chiTiet[0]);
  const btnSuaNL = document.querySelector("#suaNL");
  btnSuaNL.addEventListener("click", async (e) => {
    const maSanPham = document.querySelector("#maNL").value;
    const tenSanPham = document.querySelector("#tenNL").value;
    let res = await capNhatSanPham(maSanPham, tenSanPham);
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
  let html = `<h3><a href='nguyenLieu.js'>Nguyên liệu</a> > Thêm nguyên liệu</h3>
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
          <h3>Thêm công thức</h3>
          <form action="" class="form">
            <div class="inputInfo--flat mt-1">
              <label for="maNL" class="label" >Mã nguyên liệu</label>
              <input type="text" name="maNL" id="maNL" class="inputLarge" readonly value =${chiTiet.MaSanPham} />
            </div>
            <div class="inputInfo--flat mt-1">
              <label for="tenNL" class="label">Tên nguyên liệu</label>
              <input type="text" name="tenNL" id="tenNL" class="inputLarge" value='${chiTiet.TenSanPham}' />
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
              <input type="text" name="donVi" id="donVi" class="inputLarge" value ="${chiTiet.DonVi}" readonly/>
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
