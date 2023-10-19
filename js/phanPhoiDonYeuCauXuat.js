"use strick";
import { menu, menuShow } from "./menu.js";
let dsDonXuat = [];
const dsDon = [
  {
    MaDon: 1,
    Loai: 3,
    TenDon: "Đon yêu cầu xuất nguyên liệu",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Chờ duyệt",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      { MaNguyenLieu: 1, Ten: "Bột mì", SoLuong: 20, DonVi: "KG" },
      {
        MaNguyenLieu: 2,
        Ten: "Đường",
        SoLuong: 20,
        DonVi: "KG",
      },
    ],
  },
  {
    MaDon: 2,
    Loai: 4,
    TenDon: "Đon yêu cầu xuất thành phẩm",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Chờ duyệt",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        MaNguyenLieu: 3,
        Ten: "Bánh đậu xanh",
        SoLuong: 20,
        DonVi: "KG",
      },
      {
        MaNguyenLieu: 4,
        Ten: "Bánh trà xanh",
        SoLuong: 20,
        DonVi: "KG",
      },
    ],
  },
  {
    MaDon: 3,
    Loai: 3,
    TenDon: "Đon yêu cầu xuất nguyên liệu",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Chờ duyệt",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        MaNguyenLieu: 1,
        Ten: "Bột mì",
        SoLuong: 20,
        DonVi: "KG",
      },
      {
        MaNguyenLieu: 2,
        Ten: "Đường",
        SoLuong: 20,
        DonVi: "KG",
      },
    ],
  },
  {
    MaDon: 4,
    Loai: 4,
    TenDon: "Đon yêu cầu xuất thành phẩm",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Chờ duyệt",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        MaNguyenLieu: 3,
        Ten: "Bánh đậu xanh",
        SoLuong: 40,
        DonVi: "KG",
      },
      {
        MaNguyenLieu: 4,
        Ten: "Bánh trà xanh",
        SoLuong: 50,
        DonVi: "KG",
      },
    ],
  },
  {
    MaDon: 5,
    Loai: 3,
    TenDon: "Đon yêu cầu xuất nguyên liệu",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Chờ duyệt",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        Ten: "Bột mì",
        SoLuong: 20,
        DonVi: "KG",
      },
      {
        Ten: "Đường",
        SoLuong: 20,
        DonVi: "KG",
      },
    ],
  },
];
const dsNguyenLieu = [
  {
    MaChiTiet: 1,
    MaNguyenLieu: 1,
    TenNguyenLieu: "Bột mì",
    SoLuong: 50,
    DonVi: "KG",
    NgaySanXuat: "23/09/2023",
    NgayHetHan: "23/11/2024",
    Kho: 1,
  },
  {
    MaChiTiet: 2,
    MaNguyenLieu: 1,
    TenNguyenLieu: "Bột mì",
    SoLuong: 50,
    DonVi: "KG",
    NgaySanXuat: "23/09/2023",
    NgayHetHan: "23/11/2024",
    Kho: 2,
  },
  {
    MaChiTiet: 3,
    MaNguyenLieu: 2,
    TenNguyenLieu: "Đường",
    SoLuong: 50,
    DonVi: "KG",
    NgaySanXuat: "23/09/2023",
    NgayHetHan: "23/11/2024",
    Kho: 1,
  },
  {
    MaChiTiet: 4,
    MaNguyenLieu: 2,
    TenNguyenLieu: "Đường",
    SoLuong: 50,
    DonVi: "KG",
    NgaySanXuat: "23/09/2023",
    NgayHetHan: "23/11/2024",
    Kho: 2,
  },
  {
    MaChiTiet: 5,
    MaNguyenLieu: 3,
    TenNguyenLieu: "Bánh đậu xanh",
    SoLuong: 50,
    DonVi: "KG",
    NgaySanXuat: "23/09/2023",
    NgayHetHan: "23/11/2024",
    Kho: 1,
  },
  {
    MaChiTiet: 6,
    MaNguyenLieu: 3,
    TenNguyenLieu: "Bánh đậu xanh",
    SoLuong: 50,
    DonVi: "KG",
    NgaySanXuat: "23/09/2023",
    NgayHetHan: "23/11/2024",
    Kho: 2,
  },
  {
    MaChiTiet: 7,
    MaNguyenLieu: 4,
    TenNguyenLieu: "Bánh trà xanh",
    SoLuong: 50,
    DonVi: "KG",
    NgaySanXuat: "23/09/2023",
    NgayHetHan: "23/11/2024",
    Kho: 1,
  },
  {
    MaChiTiet: 8,
    MaNguyenLieu: 4,
    TenNguyenLieu: "Bánh trà xanh",
    SoLuong: 50,
    DonVi: "KG",
    NgaySanXuat: "23/09/2023",
    NgayHetHan: "23/11/2024",
    Kho: 2,
  },
];
function render(chiTietNguyenLieu = null, sua = false, newChiTiet = null) {
  let html =
    chiTietNguyenLieu !== null
      ? contentChiTiet(chiTietNguyenLieu, sua, newChiTiet)
      : content();
  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
}
function content() {
  let html = `        
        <div class="content">
         <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
          <form class="search">
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
          </form>
         <div class="content__inner">
            <table>
              <tr class="muc">
                <th>Mã đơn</th>
                <th>Tên đơn</th>
                <th>Người lập</th>
                <th>Ngày lập</th>
                <th>Số lượng nguyên liệu</th>
                <th>Hành động</th>
              </tr>
              ${dsDon
                .map((don) => {
                  if (don.TinhTrang === "Chờ duyệt")
                    return `<tr>
                <td>${don.MaDon}</td>
                <td>${don.TenDon}</td>
                <td>${don.MaTaiKhoan}</td>
                <td>${don.NgayLap}</td>
                <td class="center">${don.SoLuongNguyenLieu}</td>
                <td><button class="btn primary center large" id = ${don.MaDon}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>
         </div>
        </div>`;
  return html;
}
function contentChiTiet(chiTiet, sua = false, newChiTiet = null) {
  let dsNguyenLieu = sua
    ? `<table class="small">
            <tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
              <th>Đơn vị</th>
              <th></th>
              ${newChiTiet ? `<th></th>` : ""}
            </tr>
            ${chiTiet.NguyenLieu.map((nl, i) => {
              const checked = dsDonXuat.some((dx) => {
                return dx.MaNguyenLieu == nl.MaNguyenLieu;
              });
              return `<tr>
              <td>${nl.Ten}</td>
              <td class = "SoLuongCan">${nl.SoLuong}</td>
              <td>${nl.DonVi}</td>
              <td><button class="btn secondary large chonNL" ${
                checked ? "disabled" : ""
              } id=${nl.MaNguyenLieu}>Chọn nguyên liệu</button></td>
               ${
                 newChiTiet
                   ? `<td><input type="checkbox" ${
                       checked ? "checked" : ""
                     } class ="daChon"/></td>`
                   : ""
               }
            </tr>`;
            }).join("")}
          </table>
          <div class="buttons">
            <button class="btn primary " id="xacNhan">Xác nhận</button>
            <button class="btn secondary small" id = "quayLai">Quay lại</button>
          </div>`
    : `<table class="small">
            <tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
              <th>Đơn vị</th>
            </tr>
            ${chiTiet.NguyenLieu.map((e) => {
              return `<tr>
              <td>${e.Ten}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
            </tr>`;
            }).join("")}
          </table>
          <div class="buttons">
            <button class="btn primary" id="phanPhoi">Phân phối đơn yêu càu</button>
            <button class="btn secondary small" id = "quayLai">Quay lại</button>
          </div>`;
  let html = `<div class="content">
        <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
        <form class="search">
          <input type="text" name="search" id="search" />
          <button type="button">
            <i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8"></i>
          </button>
        </form>
        <div class="content__inner chitiet">
          <h3>Đơn yêu cầu nhập nguyên liệu</h3>
          <p><span class="deMuc">Mã đơn:</span>${chiTiet.MaDon}</p>
          <p><span class="deMuc">Tên đơn:</span>${chiTiet.TenDon}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.MaTaiKhoan}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieu}
        </div>
      </div>`;
  return html;
}
function chonChiTietNL(idNL, SoLuongCan) {
  let chiTietNL = layNL(idNL);
  let dsNguyenLieu = chiTietNL
    .map((ct) => {
      let nl = dsDonXuat.filter((dx) => {
        return dx.MaNguyenLieu == ct.MaNguyenLieu;
      })[0]?.dsNguyenLieu;
      const ctNL = nl?.filter((c) => c.MaChiTiet == ct.MaChiTiet);
      console.log(nl);
      return `<tr class ="nguyenlieu">
              <td>
                <input type="checkbox" class="chon" id="chon" ${
                  ctNL?.length ? "checked" : ""
                } />
              </td>
              <td class = "MaChiTiet">${ct.MaChiTiet}</td>
              <td >${ct.TenNguyenLieu}</td>
              <td class = "soLuongTon">${ct.SoLuong}</td>
              <td >${ct.DonVi}</td>
              <td >${ct.NgaySanXuat}</td>
              <td >${ct.NgayHetHan}</td>
              <td >${ct.Kho}</td>
              <td>
                <input
                  type="number"
                  class="soLuong ${ctNL?.length ? "" : "disabled"}"
                  placeholder="Nhập số lượng bạn muốn"
                  value = "${ctNL?.length ? ctNL[0]?.SoLuong : ""}"
                  ${ctNL?.length ? "" : "disabled"}
                />
              </td>
            </tr>`;
    })
    .join("");
  let html = `<div class="formChonNL">
      <div class="overlay"></div>
      <div class="dsNguyenLieu">
        <div class="top">
          <h3>Danh sách chi tiết nguyên liệu</h3>
          <button class="btn btnClose">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="content__inner">
          <table>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Mã chi tiết nguyên liệu</th>
              <th>Tên nguyên liệu</th>
              <th>Số lượng tồn</th>
              <th>Đơn vị</th>
              <th>Ngày sản xuất</th>
              <th>Ngày hết hạn</th>
              <th>kho</th>
              <th>Số lượng muốn xuất</th>
            </tr>
            ${dsNguyenLieu}
          </table>
        </div>
        <div class="bottomDs">
        <h3>Số lượng cần là: ${SoLuongCan}</h3>
          <button class="btn primary" id="xacNhan">Xác nhận</button>
      </div>
    </div>`;
  return html;
}
function xacNhan(id) {
  let chiTiet = layDon(id);
  console.log(id, chiTiet);
  const nguyenlieu = dsDonXuat.map((dx) => dx.dsNguyenLieu);
  console.log(nguyenlieu);
  let dsNguyenLieuCuoi = `<table class="small">
            <tr>
              <th>Mã chi tiết nguyên liệu</th>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
              <th>Đơn vị</th>
              <th>Kho</th>
            </tr>
            ${nguyenlieu
              .map((e) => {
                return e.map((nguyenLieu) => {
                  const NL = dsNguyenLieu.filter(
                    (nl) => nl.MaChiTiet == nguyenLieu.MaChiTiet
                  )[0];
                  return `<tr>
              <td>${nguyenLieu.MaChiTiet}</td>
              <td>${NL.TenNguyenLieu}</td>
              <td>${nguyenLieu.SoLuong}</td>
              <td>${NL.DonVi}</td>
              <td>${NL.Kho}</td>
            </tr>`;
                });
              })
              .join("")}
          </table>
          <div class="buttons">
            <button class="btn primary" id="lapPhie">Lập phiếu xuất kho</button>
            <button class="btn secondary small" id = "quayLai">Quay lại</button>
          </div>`;
  let html = `<div class="content">
        <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
        <form class="search">
          <input type="text" name="search" id="search" />
          <button type="button">
            <i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8"></i>
          </button>
        </form>
        <div class="content__inner chitiet">
          <h3>Đơn yêu cầu nhập nguyên liệu</h3>
          <p><span class="deMuc">Mã đơn:</span>${chiTiet.MaDon}</p>
          <p><span class="deMuc">Tên đơn:</span>${chiTiet.TenDon}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.MaTaiKhoan}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieuCuoi}
        </div>
      </div>`;
  console.log(dsNguyenLieuCuoi);
  return html;
}
function layDon(id) {
  const chiTiet = dsDon.filter((e) => e.MaDon == id)[0];
  return chiTiet;
}
function layNL(idNL) {
  const chiTiet = dsNguyenLieu.filter((e) => e.MaNguyenLieu == idNL);
  return chiTiet;
}
function renderChiTiet(id) {
  let chiTiet = layDon(id);
  render(chiTiet, false, null);
  const btnBack = document.querySelector("#quayLai");
  const btnPhanPhoi = document.querySelector("#phanPhoi");
  btnPhanPhoi.addEventListener("click", (e) => {
    renderPhanPhoi(chiTiet, id);
  });
  btnBack.addEventListener("click", (e) => {
    init();
  });
}
function renderChiTietPhanPhoi(id, chiTietNL = null) {
  let chiTiet = layDon(id);
  render(chiTiet, true, chiTietNL);
  const btnBack = document.querySelector("#quayLai");
  const daChon = document.querySelectorAll(".daChon");
  const btnChonNL = document.querySelectorAll(".chonNL");
  const SoLuongCan = document.querySelectorAll(".SoLuongCan");
  daChon.forEach((dc) => {
    dc.addEventListener("click", (e) => {
      if (dc.checked === false)
        dc.closest("tr").querySelector(".chonNL").removeAttribute("disabled");
      else
        dc.closest("tr")
          .querySelector(".chonNL")
          .setAttribute("disabled", true);
    });
  });
  btnBack.addEventListener("click", (e) => {
    renderChiTiet(id);
  });

  btnChonNL.forEach((btn, i) => {
    btn.addEventListener("click", (e) =>
      renderChonNL(id, SoLuongCan[i].textContent, btn.id)
    );
  });
  let btnXacNhan = document.querySelector("#xacNhan");
  btnXacNhan.addEventListener("click", (e) => {
    renderXacNhanCuoi(id);
  });
}
function renderPhanPhoi(chiTiet, id) {
  render(chiTiet, true);
  const btnBack = document.querySelector("#quayLai");
  const btnChonNL = document.querySelectorAll(".chonNL");
  const SoLuongCan = document.querySelectorAll(".SoLuongCan");
  btnBack.addEventListener("click", (e) => {
    renderChiTiet(id);
  });
  btnChonNL.forEach((btn, i) => {
    btn.addEventListener("click", (e) =>
      renderChonNL(id, SoLuongCan[i].textContent, btn.id)
    );
  });
}
function renderChonNL(id, SoLuongCan, MaNguyenLieu) {
  let html = chonChiTietNL(MaNguyenLieu, SoLuongCan);
  document.querySelector("body").insertAdjacentHTML("beforeend", html);
  const chonNL = document.querySelector(".formChonNL");
  const NguyenLieu = chonNL.querySelectorAll(".nguyenlieu");
  let dsNguyenLieu =
    dsDonXuat.filter((dx) => dx.MaNguyenLieu == MaNguyenLieu)[0]
      ?.dsNguyenLieu ?? [];
  const btnClose = chonNL.querySelector(".btnClose");
  btnClose.addEventListener("click", (e) => {
    chonNL.remove();
  });
  NguyenLieu.forEach((nl) => {
    const soLuongTon = nl.querySelector(".soLuongTon").textContent;
    const soLuong = nl.querySelector(".soLuong");
    const MaChiTiet = nl.querySelector(".MaChiTiet");
    nl.addEventListener("click", (e) => {
      if (e.target.className === "chon") {
        const inputSL = nl.querySelector(".soLuong");
        if (!e.target.checked) {
          inputSL.classList.add("disabled");
          inputSL.setAttribute("disabled", true);
          dsNguyenLieu = dsNguyenLieu.filter(
            (ds) => ds.MaChiTiet !== MaChiTiet.textContent
          );
          return;
        }
        inputSL.classList.remove("disabled");
        inputSL.removeAttribute("disabled");
        dsNguyenLieu.push({
          MaChiTiet: MaChiTiet.textContent,
          SoLuong: soLuong.textContent,
        });
      } else return;
    });

    nl.querySelector(".soLuong").addEventListener("keyup", (e) => {
      if (e.target.value > +soLuongTon) {
        e.target.value = soLuongTon;
      }
      const index = dsNguyenLieu.findIndex(
        (ds) => ds.MaChiTiet === MaChiTiet.textContent
      );
      dsNguyenLieu[index].SoLuong = e.target.value;
    });
  });
  const xacNhan = chonNL.querySelector("#xacNhan");
  xacNhan.addEventListener("click", (e) => {
    const soLuongNhap = dsNguyenLieu.reduce((acc, ds) => acc + +ds.SoLuong, 0);
    if (soLuongNhap !== +SoLuongCan) {
      alert("Vui lòng chọn đúng số lượng yêu cầu");
      return;
    }
    chonNL.remove();
    dsDonXuat.filter((dx) => dx.MaNguyenLieu == MaNguyenLieu).length ||
      dsDonXuat.push({ MaNguyenLieu, dsNguyenLieu });
    renderChiTietPhanPhoi(id, dsNguyenLieu);
  });
}
function renderXacNhanCuoi(id) {
  let html = xacNhan(id);
  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
}
function init() {
  render();
  const btnXem = document.querySelectorAll("button");
  btnXem.forEach((e) =>
    e.addEventListener("click", (e) => {
      const id = e.target.id;
      renderChiTiet(id);
    })
  );
}
init();
