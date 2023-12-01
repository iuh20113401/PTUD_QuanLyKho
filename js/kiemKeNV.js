"use strick";
import { MAVAITRO, menu, menuShow, highLightMenu } from "./menu.js";
import {
  toExcel,
  toPDF,
  getFetch,
  thongBaoLoi,
  modalThongBao,
} from "./helper.js";

async function layKho() {
  let data = await getFetch("../ajax/kho.php", {
    action: "layTatCaKho",
  });
  return data ? data : null;
}
async function laySanPhamTheoKho(kho) {
  let data = await getFetch("../ajax/sanPham.php", {
    action: "laySanPhamTheoKho",
    kho,
  });
  return data ? data : null;
}
async function layThongTinTaiKhoan() {
  let data = await getFetch("../ajax/session.php", {
    action: "layThongTinTaiKhoan",
  });
  return data ? data : null;
}
async function layDonKiemKeTheoTaiKhoan() {
  let data = await getFetch("../ajax/kiemKe.php", {
    action: "layDonYeuCauTheoTaiKhoan",
  });
  return data ? data : null;
}
async function lapDonKiemKe(dataLap) {
  let data = await getFetch("../ajax/kiemKe.php", {
    action: "lapDonKiemKe",
    maDon: dataLap.maDon,
    ngayLap: new Date().toLocaleDateString("en-CA"),
    loai: dataLap.loai,
    maTaiKhoan: dataLap.maTaiKhoan,
    moTa: dataLap.moTa,
    tinhTrang: dataLap.tinhTrang,
    kho: dataLap.kho,
  });
  return data;
}
async function laySanPham(don) {
  let data = await getFetch("../ajax/sanPham.php", {
    action: "layMotSoSanPhamTheoKho",
    kho: don.Kho,
    maSanPham: don.MoTa !== "" ? don.MoTa.split(",") : null,
  });
  return data ? data : null;
}
async function laySanPhamTheoDon(don) {
  let data = await getFetch("../ajax/sanPham.php", {
    action: "layDanhMucSanPhamTheoKho",
    kho: don.Kho,
    maSanPham: don.MoTa !== "" ? don.MoTa.split(",") : null,
  });
  return data ? data : null;
}
async function themChiTietKiemKe(don) {
  let data = await getFetch("../ajax/kiemKe.php", {
    action: "themChiTietKiemKe",
    maChiTietSanPham: don.maChiTietSanPham,
    tinhTrang: don.tinhTrang,
    soLuong: don.soLuong,
    moTa: don.moTa,
    maKiemKe: don.maKiemKe,
  });
  return data;
}

async function capNhatTrangThai(don, trangThai) {
  let data = await getFetch("../ajax/kiemKe.php", {
    action: "capNhatTrangThai",
    maDon: don.MaKiemKe,
    trangThai,
  });
  return data;
}

async function layChiTietDonKiemKeLoi(don) {
  let data = await getFetch("../ajax/kiemKe.php", {
    action: "layChiTietDonKiemKeLoi",
    maKiemKe: don.MaKiemKe,
  });
  return data;
}
let dsKho = await layKho();
dsKho = dsKho.filter((k) => k.SucChuaDaDung > 0);
let dsSanPham;
const maDon = Math.floor(Math.random() * 1000);
const taiKhoan = await layThongTinTaiKhoan();
const dsDon = await layDonKiemKeTheoTaiKhoan();
async function render(loai = null, chiTietNguyenLieu = null, trangThai = null) {
  let html;
  switch (loai) {
    case "them":
      html = contentThem();
      break;
    case "sua":
      html = await contentChiTiet(chiTietNguyenLieu);
      break;
    case "kiemKe":
      html = await contentKiemKe(chiTietNguyenLieu);
      break;
    case "loi":
      html = await contentDonLoi(chiTietNguyenLieu);
      break;
    default:
      html = content();
      break;
  }

  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  highLightMenu();
}
function content(trangThai = null) {
  let dsDonKiemKe = dsDon
    ?.map((don) => {
      return `<tr>
              <td>${don.MaKiemKe}</td>
              <td>${don.NgayLap}</td>
              <td>${don.Kho}</td>
              <td>${don.Loai}</td>
              <td>${don.TinhTrang}</td>
              <td>
                <button class="xem btn primary center large " id=${don.MaKiemKe}>
                  Xem
                </button>
              </td>
            </tr>`;
    })
    .join("");
  let html = `        
       <div class="content">
        <a href="#"> <h3>biên bản kiểm kê</h3></a>
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
          <button type="button" class="btn primary large" id="themKK">
            Lập biên bản kiêm kê
          </button>
        </form>
        <div class="content__inner">
          ${
            dsDon
              ? `<table>
            <tr class="muc">
              <th>Mã biên bản</th>
              <th>Ngày lập</th>
              <th>Kho</th>
              <th>Loại</th>
              <th>Tình trạng</th>
              <th>Hành dộng</th>
            </tr>
            ${dsDonKiemKe}
          </table>`
              : `<h3 class = 'khongDon'>Không có biên bản nào</h3>`
          }
        </div>
      </div>`;
  return html;
}
async function contentChiTiet(chiTiet) {
  let dsNguyenLieu;
  if (chiTiet.Loai == "Theo sản phẩm") {
    dsNguyenLieu = await laySanPham(chiTiet);
    let uniqueMa = [...new Set(dsNguyenLieu.map((nl) => nl.MaSanPham))];
    dsNguyenLieu = uniqueMa.map((u) =>
      dsNguyenLieu.find((nl) => nl.MaSanPham == u)
    );
    dsNguyenLieu = dsNguyenLieu
      .map((sp) => {
        return `
          <div div class="mt-1" id='danhsachNL' >
          <div class="mt-1" >
            <input class='input' value = "${sp.TenSanPham}" readonly/>
          </div>`;
      })
      .join("");
  }
  let html = `<div class="content">
        <a href="#"> <h3>biên bản kiểm kê  > ${chiTiet.MaKiemKe}</h3></a>
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
          <button type="button" class="btn primary large" id="themKK">
            Lập biên bản kiểm kê
          </button>
        </form>
        <div class="content__inner chitiet">
          <h3>Lập biên bản kiểm kê</h3>
          <p><span class="deMuc">Mã biên bản:</span>${chiTiet.MaKiemKe}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.TenDangNhap}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <div class="inputInfo--flat">
            <label for="" class="labelLarge">Kho</label>
            <select name="kho" id="kho" readonly>
              <option id = 'kho'> ${chiTiet.Kho}</option>
            </select>
          </div>
          <div class="inputInfo--flat mt-1" id='divLoai'>
            <label for="" class="labelLarge">Loại</label>
            <select name="loai" id="loai" readonly>
              <option id = 'loai'>${chiTiet.Loai}</option>
            </select>
          </div>
          <div id="danhSachNguyenLieu" >
          ${
            dsNguyenLieu
              ? `<h4 class="mt-1">Danh sách nguyên liệu cần kiểm kê</h4>
              ${dsNguyenLieu}`
              : ""
          }</div>
          ${
            chiTiet.TinhTrang == "Đã duyệt"
              ? `<div class ="buttons">
              <button class="btn large center primary mt-1" id ='kiemKe'>
            Tiến hành kiểm kê
          </button> <button class="btn large center secondary mt-1" id ='quayLai'>
            Quay lại
          </button></div>`
              : `<button class="btn large center secondary mt-1" id ='quayLai'>
            Quay lại
          </button>`
          }
        </div>
      </div>`;
  return html;
}

function contentThem() {
  let html = `<div class="content">
        <a href="#"> <h3>biên bản kiểm kê</h3></a>
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
          <button type="button" class="btn secondary large" id="quayLai">
            Quay lại
          </button>
        </form>
        <div class="content__inner chitiet">
          <h3>Lập biên bản kiểm kê</h3>
          <p><span class="deMuc">Mã biên bản:</span>${maDon}</p>
          <p><span class="deMuc">Người lập:</span>${taiKhoan[3]}</p>
          <p><span class="deMuc">Vai trò:</span>${taiKhoan[1]}</p>
          <p><span class="deMuc">Ngày lập:</span>${new Date().toLocaleDateString()}</p>
          <div class="inputInfo--flat">
            <label for="" class="labelLarge">Kho</label>
            <select name="kho" id="kho">
              <option value="">Chọn kho cần kiểm kê</option>
              
              ${dsKho
                .map((kho) => {
                  return `<option value=${kho.MaKho} >${kho.TenKho} </option>`;
                })
                .join("")}
            </select>
          </div>
          <div class="inputInfo--flat mt-1" id='divLoai'>
            <label for="" class="labelLarge">Loại</label>
            <select name="loai" id="loai">
              <option value="1">Toàn bộ</option>
              <option value="2">Theo nguyên liệu</option>
            </select>
          </div>
          <div id="danhSachNguyenLieu" ></div>
          <button class="btn large center primary mt-1" id ='lapKK'>
            Lập biên bản yêu cầu kiểm kê
          </button>
        </div>
      </div>`;
  return html;
}
async function contentDonLoi(chiTiet) {
  let dsNguyenLieuLoi = await layChiTietDonKiemKeLoi(chiTiet);
  dsNguyenLieuLoi = dsNguyenLieuLoi
    .map((sp) => {
      return `
          <tr>
            <td>${sp.MaChiTietSanPham}</td>
            <td>${sp.TenSanPham}</td>
            <td>${sp.TinhTrang}</td>
            <td>${sp.SoLuong} ${sp.DonVi}</td>
            <td>${sp.MoTa}</td>
          </tr>`;
    })
    .join("");
  let html = `<div class="content">
        <a href="#"> <h3>biên bản kiểm kê</h3> > ${chiTiet.MaKiemKe}</a>
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
          <button type="button" class="btn primary large" id="themKK">
            Lập biên bản kiểm kê
          </button>
        </form>
        <div class="content__inner chitiet">
          <h3>Lập biên bản kiểm kê</h3>
          <p><span class="deMuc">Mã biên bản:</span>${chiTiet.MaKiemKe}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.TenDangNhap}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <p><span class="deMuc">Tình trạng:</span>${chiTiet.TinhTrang}</p>
          <div class="inputInfo--flat">
            <label for="" class="labelLarge">Kho</label>
            <select name="kho" id="kho" readonly>
              <option id = 'kho'> ${chiTiet.Kho}</option>
            </select>
          </div>
          <div class="inputInfo--flat mt-1" id='divLoai'>
            <label for="" class="labelLarge">Loại</label>
            <select name="loai" id="loai" readonly>
              <option id = 'loai'>${chiTiet.Loai}</option>
            </select>
          </div>
          <div id="danhSachNguyenLieu" >
          ${
            dsNguyenLieuLoi != null
              ? `<h4 class="mt-1">Danh sách nguyên liệu cần kiểm kê</h4>
              <table>
                <tr>
                  <th>Mã chi tiết nguyên liệu</th>
                  <th>Tên nguyên liệu</th>
                  <th>Tình trạng kiểm kê</th>
                  <th>Số lượng</th>
                  <th>Mô tả</th>
                </tr>
                ${dsNguyenLieuLoi}
              </table>`
              : ""
          }</div>
          ${
            chiTiet.TinhTrang == "Lỗi"
              ? `<div class ="buttons center">
              <button class="btn  center secondary mt-1" id ='quayLai'>
                Quay lại
              </button>
          ${
            taiKhoan[1] === "GiamDoc"
              ? `<button class="btn  center btnXoa mt-1 large" id ='tieuHuy' >
            Cập nhật số lượng tồn
          </button>`
              : ""
          }
              </div>`
              : `
            <button class="btn large center secondary mt-1" id ='quayLai'>
            Quay lại
          </button>`
          }
        </div>
      </div>`;
  return html;
}
async function renderChiTietLoi(chitiet) {
  await render("loi", chitiet);
  goBack();
}
function goBack() {
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    init();
  });
}
async function renderChiTiet(id) {
  let chitiet = dsDon.filter((don) => don.MaKiemKe == id)[0];
  if (chitiet.TinhTrang == "Lỗi" || chitiet.TinhTrang == "Đã tiêu hủy") {
    await renderChiTietLoi(chitiet);
  } else {
    await render("sua", chitiet);
    goBack();
    const themKK = document.querySelector("#themKK");
    themKK.addEventListener("click", (e) => {
      renderThem();
    });
    if (chitiet.TinhTrang === "Đã duyệt") {
      const kiemKe = document.querySelector("#kiemKe");
      kiemKe.addEventListener("click", (e) => {
        renderKiemKe(chitiet);
      });
    }
  }
}
async function init(dsDonMoi, trangThai = null) {
  render(null, null, trangThai);
  const btnXem = document.querySelectorAll(".xem");
  btnXem.forEach((e) =>
    e.addEventListener("click", (e) => {
      const id = e.target.id;
      renderChiTiet(id);
    })
  );
  const themKK = document.querySelector("#themKK");
  themKK.addEventListener("click", (e) => {
    renderThem();
  });
}
function renderThem() {
  render("them", null, null);
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    init();
  });
  const loai = document.querySelector("#loai");
  loai.addEventListener("change", async (e) => {
    if (loai.value == 2) {
      const kho = document.querySelector("#kho").value;
      if (kho !== "") {
        dsSanPham = await laySanPhamTheoKho(kho);
      }
      themNL();
    } else {
      const divLoai = document.querySelector("#danhSachNguyenLieu");
      divLoai.innerHTML = "";
    }
  });
  const kho = document.querySelector("#kho");
  kho.addEventListener("change", async (e) => {
    if (loai.value == 2) {
      if (kho.value !== "") {
        dsSanPham = await laySanPhamTheoKho(kho.value);
      }
      themNL();
    }
  });
  const btnLap = document.querySelector("#lapKK");
  btnLap.addEventListener("click", async (e) => {
    if (kho.value === "") {
      thongBaoLoi("Vui lòng chọn kho muốn kiểm kê");
      return;
    }
    if (loai.value == 1) {
      const ttkk = {
        maDon,
        ngayLap: new Date().toLocaleDateString(),
        maTaiKhoan: taiKhoan[2],
        tinhTrang: 0,
        kho: kho.value,
        loai: loai.value,
        moTa: null,
      };
      const res = await lapDonKiemKe(ttkk);
      if (res) {
        await modalThongBao("Bạn đã tạo biên bản kiểm kê thành công!", true);
        window.location.reload();
      }
    } else {
      let dsNguyenLieu = [];
      const nguyenLieus = document.querySelectorAll(".nl");
      for (let index = 0; index < nguyenLieus.length; index++) {
        const element = nguyenLieus[index];
        if (element.value === "") {
          dsNguyenLieu = [];
          return;
        }
        dsNguyenLieu.push(element.value);
        if (index === nguyenLieus.length - 1) {
          const ttkk = {
            maDon,
            ngayLap: new Date().toLocaleDateString(),
            maTaiKhoan: taiKhoan[2],
            tinhTrang: 0,
            kho: kho.value,
            loai: loai.value,
            moTa: dsNguyenLieu.join(","),
          };
          const res = await lapDonKiemKe(ttkk);
          if (res) {
            await modalThongBao(
              "Bạn đã tạo biên bản kiểm kê thành công!",
              true
            );
            window.location.reload();
          }
        }
      }
    }
  });
}
function themNL() {
  let uniqueMa = [...new Set(dsSanPham.map((nl) => nl.MaSanPham))];
  dsSanPham = uniqueMa.map((u) => dsSanPham.find((nl) => nl.MaSanPham == u));
  let html = `<h4 class="mt-1">Danh sách nguyên liệu cần kiểm kê</h4>
          <div div class="mt-1" id='danhsachNL'>
          <div class="mt-1" >
            <select class="nl" >
            <option value=''>Chọn sản phẩm</option>
              ${dsSanPham
                .map((sp) => {
                  return `<option value=${sp.MaSanPham}>${sp.TenSanPham}</option>`;
                })
                .join("")}
            </select>
          </div>
          <button class= 'btn secondary mt-1' id="themNL"> Thêm </button>
          </div>
          `;
  const divLoai = document.querySelector("#danhSachNguyenLieu");
  divLoai.innerHTML = html;
  const btnThem = document.querySelector("#themNL");
  btnThem.addEventListener("click", (e) => {
    btnThem.insertAdjacentHTML("beforebegin", themDivNL());
  });
}
function themDivNL() {
  return `<div class="mt-1" >
            <select class="nl" >
            <option value=''>Chọn sản phẩm</option>
              ${dsSanPham
                .map((sp) => {
                  return `<option value=${sp.MaSanPham}>${sp.TenSanPham}</option>`;
                })
                .join("")}
            </select>
          </div>`;
}
function contentKiemKe(chiTiet) {
  let html = `<div class="content">
        <a href="#"> <h3>biên bản kiểm kê > ${chiTiet.MaKiemKe}</h3> </a>
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
          <button type="button" class="btn primary large" id="themKK">
            Lập biên bản kiểm kê
          </button>
        </form>
        <div class="content__inner chitiet">
          <h3>Lập biên bản kiểm kê</h3>
          <p><span class="deMuc">Mã biên bản:</span>${chiTiet.MaKiemKe}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.TenDangNhap}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <div class="inputInfo--flat">
            <label for="" class="labelLarge">Kho</label>
            <select name="kho" id="kho" readonly>
              <option id = 'kho'> ${chiTiet.Kho}</option>
            </select>
          </div>
          <div class="inputInfo--flat mt-1" id='divLoai'>
            <label for="" class="labelLarge">Loại</label>
            <select name="loai" id="loai" readonly>
              <option id = 'loai'>${chiTiet.Loai}</option>
            </select>
          </div>
          <div class="mulRadioInput mt-1">
          <h4>Kết quả kiểm kê</h4>
          <div class="radioInput" id='divLoai' value=1>
            <input type ='radio' name='tinhTrang' id="1" value=1 />
            <label for="1"  >Bình thường</label>
          </div>
          <div class="radioInput " id='divLoai' >
            <input type ='radio' name ='tinhTrang' id="2" value = 2 />
            <label for="2" class="labelLarge">Có sai sót</label>
          </div></div>
          <div id="danhSachNguyenLieu" >
          </div>
          <button class="btn large center primary mt-1" id ='kiemKe'>
            Hoàn tất kiểm kê
          </button>
        </div>
      </div>`;
  return html;
}
async function renderKiemKe(chiTiet) {
  await render("kiemKe", chiTiet);
  const radios = document.querySelectorAll("input[name='tinhTrang']");
  let kiemKeValue;
  radios.forEach((radio) => {
    radio.addEventListener("change", async (e) => {
      kiemKeValue = radio.value;
      if (kiemKeValue == 2) {
        await themKiemKe(chiTiet);
        return;
      } else {
        const divLoai = document.querySelector("#danhSachNguyenLieu");
        divLoai.innerHTML = "";
      }
    });
  });
  const kiemKe = document.querySelector("#kiemKe");
  kiemKe.addEventListener("click", async (e) => {
    if (kiemKeValue == 1) {
      let res = await capNhatTrangThai(chiTiet, 3);
      if (res) {
        await modalThongBao("Bạn đã cập nhật thành công", true);
        window.location.reload();
      }
    } else {
      let nls = document.querySelectorAll(".nl");
      let loai = document.querySelectorAll(".loai");
      let soLuong = document.querySelectorAll(".soLuong");
      let dsNl = [];
      let dsLoai = [];
      let dsSoLuong = [];
      let dsMoTa = [];
      for (let index = 0; index < nls.length; index++) {
        if (!nls[index].value || !loai[index].value || !soLuong[index].value) {
          thongBaoLoi("Vui lòng nhập đủ thông tin");
          dsNl.splice(0);
          loai.splice(0);
          soLuong.splice(0);
          return;
        }
        dsNl.push(nls[index].value);
        dsLoai.push(loai[index].value);
        dsSoLuong.push(soLuong[index].value);
        let moTa =
          loai[index].value == 0
            ? "Thiếu so với thực tế"
            : loai[index].value == 1
            ? "Dư so với thực tế"
            : "Hư hỏng";
        dsMoTa.push(moTa);
        if (index == nls.length - 1) {
          const ttkk = {
            maKiemKe: chiTiet.MaKiemKe,
            maChiTietSanPham: dsNl,
            tinhTrang: dsLoai,
            soLuong: dsSoLuong,
            moTa: dsMoTa,
          };
          let res = await themChiTietKiemKe(ttkk);
          let res2;
          if (res) {
            res2 = await capNhatTrangThai(chiTiet, 4);
          }
          if (res2) {
            alert("Bạn đã cập nhập biên bản kiểm kê thành công!");
            window.location.reload();
          }
        }
      }
    }
  });
}
async function themKiemKe(chiTiet) {
  let dsSanPham = await laySanPhamTheoDon(chiTiet);
  dsSanPham = dsSanPham.sort((a, b) => a.MaChiTietSanPham - b.MaChiTietSanPham);
  let html = `<h4 class="mt-1">Danh sách nguyên liệu cần kiểm kê</h4>
          <div div class="mt-1" id='danhsachNL'>
              <div class=" row inputInfo inputInfo--flat" >
            <select class="nl" >
            <option value=''>Chọn chi tiết sản phẩm</option>
              ${dsSanPham
                .map((sp) => {
                  return `<option value=${sp.MaChiTietSanPham}>${sp.MaChiTietSanPham}</option>`;
                })
                .join("")}
            </select>
            <select class="loai" >
            <option value=''>Loại ghi nhận</option>
             <option value=0> Thiếu </option>
             <option value=1> Dư </option>
             <option value=2> Hư hỏng </option>
            </select>
            <input class = 'input soLuong' type='number' placeholder = 'Số lượng sai lệch ' id="soLuong" />
            <input class = 'input' type='text' value ="KG" readonly id="donVi" />
          </div>
          <button class= 'btn secondary mt-1' id="themNL"> Thêm </button>
          </div>
          `;
  const divLoai = document.querySelector("#danhSachNguyenLieu");
  divLoai.innerHTML = html;
  const btnThem = document.querySelector("#themNL");
  btnThem.addEventListener("click", (e) => {
    btnThem.insertAdjacentHTML("beforebegin", themDivKiemKe(dsSanPham));
  });
  divLoai.addEventListener("change", (e) => {
    if (e.target.matches(".nl")) {
      const dsNL = e.target.closest("div").querySelector("#soLuong");
      const chiTiet = dsSanPham.filter(
        (sp) => sp.MaChiTietSanPham == e.target.value
      )[0];
      dsNL.max = chiTiet.SoLuongTon;
    }
  });
  divLoai.addEventListener("input", (e) => {
    if (e.target.matches("#soLuong")) {
      const input = e.target;
      if (+input.value > +input.max) {
        input.value = input.max;
      }
    }
  });
}
function themDivKiemKe(dsSanPham) {
  return ` <div class="row inputInfo inputInfo--flat" >
            <select class="nl" >
            <option value=''>Chọn sản phẩm</option>
              ${dsSanPham
                .map((sp) => {
                  return `<option value=${sp.MaChiTietSanPham}>${sp.MaChiTietSanPham}</option>`;
                })
                .join("")}
            </select>
            <select class="loai" >
            <option value=''>Loại ghi nhận</option>
             <option value=0> Thiếu </option>
             <option value=1> Dư </option>
             <option value=2> Hư hỏng </option>
            </select>
            <input class = 'input soLuong' type='number' placeholder = 'Số lượng sai lệch ' id="soLuong" />
            <input class = 'input' type='text' value ="KG" readonly id="donVi" />
          </div>`;
}
export default init;
