"use strick";
import { menu, menuShow } from "./menu.js";
<<<<<<< HEAD
import { getFetch } from "./helper.js";
async function layToanBoThanhPham() {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "layToanBoThanhPham",
=======
async function layToanBoThanhPham() {
  let data;
  await $.ajax({
    url: "../ajax/sanPham.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "layToanBoThanhPham",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
  });
  return data;
}
async function themDonYeuCau(donYeuCau) {
<<<<<<< HEAD
  const data = await getFetch("../ajax/lapDonYeuCau.php", {
    action: "lapDonYeuCau",
    maDon: donYeuCau.maDon,
    maLoai: donYeuCau.maLoai,
    ngayLap: donYeuCau.ngayLap,
    trangThai: donYeuCau.trangThai,
    maSanPham: donYeuCau.dsNguyenLieu.map((nl) => nl.ma),
    soLuong: donYeuCau.dsNguyenLieu.map((nl) => nl.soluong),
    donVi: donYeuCau.dsNguyenLieu.map((nl) => nl.donvi),
  });
  return data;
}

=======
  let data;
  await $.ajax({
    url: "../ajax/lapDonYeuCau.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "lapDonYeuCau",
      maDon: donYeuCau.maDon,
      maLoai: donYeuCau.maLoai,
      ngayLap: donYeuCau.ngayLap,
      trangThai: donYeuCau.trangThai,
      maSanPham: donYeuCau.dsNguyenLieu.map((nl) => nl.ma),
      soLuong: donYeuCau.dsNguyenLieu.map((nl) => nl.soluong),
      donVi: donYeuCau.dsNguyenLieu.map((nl) => nl.donvi),
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
>>>>>>> 500f2844852555753fbec2839fe359020e5fe6f4
let dsSanPham = await layToanBoThanhPham();

function render(dsNguyenLieu = null) {
  let html = dsNguyenLieu !== null ? content(dsNguyenLieu) : content();
  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
}
function content(dsNguyenLieu = null) {
  let html = `<div class="content">
        <h5>Lập đon yêu cầu > Xuất thành phẩm</h5>
        <form class="don">
          <h2 class = "tittle">Đơn yêu cầu Xuất thành phẩm</h2>
          <div name="taikhoan" class="inputInfo--flat mb-1">
            <label for="">Người lập: </label>
            <input
              type="text"
              class="default"
              name="taiKhoan"
              readonly
              value="Giám đốc"
            />
          </div>
          <div name="ngaylap" class="inputInfo--flat mb-1">
            <label for="">Ngày lập: </label>
            <input type="date" class="inputLarge" name="taiKhoan" />
          </div>
          <h3>Danh sách yêu cầu</h3>
          <div class="largeInput inputThanhPham">
            <div class = "thanhPhams"></div>
          </div>
          <div class ="warning"></div>
          <button class="btn large center primary mt-1" id="lapDonNNL">
            Lập đơn yêu cầu
          </button>
        </form>
      </div>`;
  let html2;
  if (dsNguyenLieu !== null) {
    html = dsNguyenLieu.reduce((acc, nl) => {
      let html = `<tr>
              <td>${nl.ten}</td>
              <td>${nl.soluong}</td>
              <td>KG</td>
            </tr>`;
      return acc + html;
    }, "");
    html2 = `<div class="content">
        <h5>Lập đon yêu cầu > Xuất thành phẩm</h5>
        <form class="don">
          <h2 class="tittle">Đơn yêu cầu xuất thành phẩm</h2>
          <div name="maDon" class="inputInfo--flat">
            <label for="">Mã đơn: </label>
            <input
              type="text"
              class="default"
              name="maDon"
              id="maDon"
              readonly
              value="${Math.floor(Math.random() * 1000)}"
            />
          </div>
          <div name="taikhoan" class="inputInfo--flat">
            <label for="">Người lập: </label>
            <input
              type="text"
              class="default"
              name="taiKhoan"
              readonly
              value="Giám đốc"
            />
          </div>
          <div name="ngaylap" class="inputInfo--flat">
            <label for="">Ngày lập: </label>
            <input
              type="date"
              class="default"
              value="${new Date().toLocaleDateString("en-CA")}"
              name="ngayLap"
              id="ngayLap"
              readonly
            />
          </div>
          <h3>Danh sách yêu cầu</h3>
          <table>
            <tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng</th>
              <th>Đơn vị</th>
            </tr>
            ${html}
          </table>
          <div class="buttons">
            <button type = "button" class="btn primary" id="xacNhan">Lập đơn</button>
            <button type = "button" class="btn secondary" id="Huy">Hủy</button>
          </div>
        </form>
      </div>`;
  }

  return dsNguyenLieu !== null ? html2 : html;
}
function init() {
  render();
  submitLapDon();
  let inputThanhPham = document.querySelector(".inputThanhPham");
  const themCongThucInput = themInput();
  const buttonThemNguyenLieu = buttonThem();
  const thanhPhams = inputThanhPham.querySelector(".thanhPhams");
  thanhPhams.innerHTML = themCongThucInput;
  thanhPhams.insertAdjacentHTML("beforeend", buttonThemNguyenLieu);
  const buttonThemNl = inputThanhPham.querySelector(".themNL");
  buttonThemNl.addEventListener("click", (e) => {
    e.target.insertAdjacentHTML("beforebegin", themCongThucInput);
  });
}
function renderDsNguyenLieu(dsNguyenLieu) {
  render(dsNguyenLieu);
  const btnHuy = document.querySelector("#Huy");
  const btnXacNhan = document.querySelector("#xacNhan");
  btnHuy.addEventListener("click", (e) => {
    init();
  });
  btnXacNhan.addEventListener("click", async (e) => {
    const maDon = document.querySelector("#maDon").value;
    const ngayLap = document.querySelector("#ngayLap").value;
    const donYeuCau = {
      maDon,
      ngayLap,
      maLoai: 4,
      trangThai: "Chờ duyệt",
      dsNguyenLieu,
    };
    const res = await themDonYeuCau(donYeuCau);
    if (res) {
      let newRes = confirm("Đã thêm thành công");
      if (newRes || !newRes) {
        window.location.reload();
      }
    }
  });
}
function themInput() {
  return `<div class="inputInfo dsThanhPham row">
              <select >
                <option value='defalut'">Chọn thành phẩm</option>
                ${dsSanPham.map((sp) => {
                  return `<option value= '${sp.MaSanPham}/${sp.TenSanPham}'>
                    ${sp.TenSanPham}
                  </option>;`;
                })}
              </select>
              <input
                type="number"
                placeholder="Nhập số lượng"
                id="soluong"
                class="soluong input"
              />
              <select  id ="donVi">
                ${dsSanPham
                  .map((sp) => {
                    return `<option value= '${sp.DonVi}'>
                    ${sp.DonVi}
                  </option>;`;
                  })
                  .join("")}
              </select>
            </div>`;
}
function buttonThem() {
  return `<button type="button" class="btn secondary themNL" >Thêm</button>`;
}

function submitLapDon() {
  const lapDonNNL = document.querySelector("#lapDonNNL");
  lapDonNNL.addEventListener("click", async (e) => {
    e.preventDefault();
    let dsThanhPham = [];
    const chonThanhPham = document.querySelectorAll(".dsThanhPham");
    chonThanhPham.forEach((thanhPham, i) => {
      const ma = thanhPham.children[0].value.split("/")[0];
      const ten = thanhPham.children[0].value.split("/")[1];
      const soluong = thanhPham.children[1].value;
      const donvi = thanhPham.children[2].value;
      ma, soluong;
      if (ma != "default" && soluong != 0) {
        dsThanhPham.push({
          ma: +ma,
          ten,
          soluong: +soluong,
          donvi,
        });
        if (i == chonThanhPham.length - 1) {
          xuLyThem(dsThanhPham);
        }
      } else {
        let warning = document.querySelector(".warning");
        let html = `Vui long chọn đầy đủ thông tin`;
        warning.innerHTML = html;
        x;
      }
    });
  });
}
function xuLyThem(dsThanhPham) {
  dsThanhPham = dsThanhPham.sort((a, b) => a.ma - b.ma);
  const ma = [...new Set(dsThanhPham.map((ds) => ds.ma))];
  const newDs = ma.map((m) => {
    const newds = dsThanhPham.filter((ds) => ds.ma == m);
    const soluong = newds.reduce((acc, nl) => acc + nl.soluong, 0);
    return {
      ma: m,
      soluong,
      ten: newds[0].ten,
      donvi: newds[0].donvi,
    };
  });
  renderDsNguyenLieu(newDs);
}
init();
