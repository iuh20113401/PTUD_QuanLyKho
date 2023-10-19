"use strick";
import { menu, menuShow } from "./menu.js";
const dsDon = [
  {
    MaDon: 1,
    Loai: 3,
    TenDon: "Đon yêu cầu xuất nguyên liệu",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Đã xuất",
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
    TinhTrang: "Đã xuất",
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
    TinhTrang: "Hủy",
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
    TinhTrang: "Đã duyệt",
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
    TinhTrang: "Đã duyệt",
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
  {
    MaDon: 6,
    Loai: 1,
    TenDon: "Đon yêu cầu nhập nguyên liệu",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Đã duyệt",
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
  {
    MaDon: 7,
    Loai: 2,
    TenDon: "Đon yêu cầu nhập thành phẩm",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Hủy",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        Ten: "Bánh đậu xanh",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "23/09/2023",
        NgayHetHan: "3/11/2024",
      },
      {
        Ten: "Bánh trà xanh",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "23/09/2023",
        NgayHetHan: "3/11/2024",
      },
    ],
  },
  {
    MaDon: 8,
    Loai: 1,
    TenDon: "Đon yêu cầu nhập nguyên liệu",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Hủy",
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
  {
    MaDon: 9,
    Loai: 2,
    TenDon: "Đon yêu cầu nhập thành phẩm",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Đã nhập kho",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        Ten: "Bánh đậu xanh",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "23/09/2023",
        NgayHetHan: "3/11/2024",
      },
      {
        Ten: "Bánh trà xanh",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "23/09/2023",
        NgayHetHan: "3/11/2024",
      },
    ],
  },
  {
    MaDon: 10,
    Loai: 1,
    TenDon: "Đon yêu cầu nhập nguyên liệu",
    MaTaiKhoan: 20113401,
    NgayLap: "23/09/2023",
    TinhTrang: "Đã nhập kho",
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
const dsPhieuNhap = [
  {
    MaPhieu: 1,
    MaDon: 1,
    TenDon: "Phiếu nhập kho nguyên liêu",
    MaKho: 1,
    MaTaiKhoan: 20113401,
    NgayLap: "13/09/2023",
    NgayNhap: "14/09/2023",
    TinhTrang: "Đã nhập kho",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        MaSanPham: 1,
        TenSanPham: "Bột mì",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "25/09/2023",
        NgayHetHan: "1/11/2024",
      },
      {
        MaSanPham: 2,
        TenSanPham: "Đường",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "25/09/2023",
        NgayHetHan: "1/11/2024",
      },
    ],
  },
  {
    MaPhieu: 2,
    MaDon: 1,
    TenDon: "Phiếu nhập kho nguyên liệu",
    MaKho: 2,
    MaTaiKhoan: 20113401,
    NgayLap: "13/09/2023",
    NgayNhap: "14/09/2023",

    TinhTrang: "Đã nhập kho",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        MaSanPham: 1,
        TenSanPham: "Bột mì",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "25/09/2023",
        NgayHetHan: "1/11/2024",
      },
      {
        MaSanPham: 2,
        TenSanPham: "Đường",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "25/09/2023",
        NgayHetHan: "1/11/2024",
      },
    ],
  },
];
const dsPhieuXuat = [
  {
    MaPhieu: 1,
    MaDon: 1,
    TenDon: "Phiếu xuất kho nguyên liêu",
    MaKho: 1,
    MaTaiKhoan: 20113401,
    NgayLap: "13/09/2023",
    NgayXuat: "14/09/2023",
    TinhTrang: "Đã xuất kho",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        MaChiTietSanPham: 1,
        MaSanPham: 1,
        TenSanPham: "Bột mì",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "25/09/2023",
        NgayHetHan: "1/11/2024",
      },
      {
        MaChiTietSanPham: 2,
        MaSanPham: 2,
        TenSanPham: "Đường",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "25/09/2023",
        NgayHetHan: "1/11/2024",
      },
    ],
  },
  {
    MaPhieu: 2,
    MaDon: 1,
    TenDon: "Phiếu xuất kho nguyên liệu",
    MaKho: 2,
    MaTaiKhoan: 20113401,
    NgayLap: "13/09/2023",
    NgayXuat: "14/09/2023",
    TinhTrang: "Đã xuất kho",
    SoLuongNguyenLieu: 2,
    NguyenLieu: [
      {
        MaChiTietSanPham: 1,
        MaSanPham: 1,
        TenSanPham: "Bột mì",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "25/09/2023",
        NgayHetHan: "1/11/2024",
      },
      {
        MaChiTietSanPham: 2,
        MaSanPham: 2,
        TenSanPham: "Đường",
        SoLuong: 20,
        DonVi: "KG",
        NgaySanXuat: "25/09/2023",
        NgayHetHan: "1/11/2024",
      },
    ],
  },
];
function render(chiTietNguyenLieu = null, thanhPham, loai = "Don") {
  let html;
  if (loai === "Don") {
    html =
      chiTietNguyenLieu !== null
        ? contentChiTiet(chiTietNguyenLieu, thanhPham)
        : content();
  }
  if (loai === "PhieuNhap") {
    html =
      chiTietNguyenLieu !== null
        ? contentChiTietPhieuNhap(chiTietNguyenLieu, thanhPham)
        : contentPhieuNhap();
  }
  if (loai === "PhieuXuat") {
    html =
      chiTietNguyenLieu !== null
        ? contentChiTietPhieuXuat(chiTietNguyenLieu, thanhPham)
        : contentPhieuXuat();
  }
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
          <div class='buttons'>
            <button class="btn" id="XemDon">Đơn yêu cầu</button>
            <button class="btn" id="XemPhieuNhap">Phiếu nhập kho</button>
            <button class="btn" id="XemPhieuXuat">Phiếu xuất kho</button>
          </div>
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
                  return `<tr>
                <td>${don.MaDon}</td>
                <td>${don.TenDon}</td>
                <td>${don.MaTaiKhoan}</td>
                <td>${don.NgayLap}</td>
                <td class="center">${don.SoLuongNguyenLieu}</td>
                <td><button class="btn primary center large xem" id = ${don.MaDon}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>
         </div>
        </div>`;
  return html;
}
function contentChiTiet(chiTiet, thanhPham = false) {
  let dsNguyenLieu = `<table class="small">
            <tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng yêu cầu</th>
              <th>Đơn vị</th>
              ${
                thanhPham
                  ? ` <th>Ngày sản xuất</th>
              <th>Ngày hết hạn</th>`
                  : ""
              }
            </tr>
            ${chiTiet.NguyenLieu.map((e) => {
              return `<tr>
              <td>${e.Ten}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
              ${
                e.NgayHetHan
                  ? `<td>${e.NgaySanXuat}</td>
                  <td>${e.NgayHetHan}</td>`
                  : ""
              }
            </tr>`;
            }).join("")}
          </table>
          <div class="buttons">
            <button class="btn primary" id="pdf">Xuất dưới dạng pdf</button>
            <button class="btn success" id = "excel">Xuất dưới dạng pdf</button>
            <button class="btn secondary small" id ="quayLai">Quay lại</button>
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
          <p><span class="deMuc">Trạng Thai: </span>${chiTiet.TinhTrang}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieu}
        </div>
      </div>`;
  return html;
}
function contentPhieuNhap() {
  let html = `        
        <div class="content">
         <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
          <form class="search">
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
          </form>
          <div class='buttons'>
            <button class="btn" id="XemDon">Đơn yêu cầu</button>
            <button class="btn" id="XemPhieuNhap">Phiếu nhập kho</button>
            <button class="btn" id="XemPhieuXuat">Phiếu xuất kho</button>
          </div>
         <div class="content__inner">
            <table>
              <tr class="muc">
                <th>Mã phiếu</th>
                <th>Mã đơn</th>
                <th>Tên đơn</th>
                <th>Người lập</th>
                <th>Ngày lập</th>
                <th>Số lượng nguyên liệu</th>
                <th>Hành động</th>
              </tr>
              ${dsPhieuNhap
                .map((phieu) => {
                  return `<tr>
                <td>${phieu.MaPhieu}</td>
                <td>${phieu.MaDon}</td>
                <td>${phieu.TenDon}</td>
                <td>${phieu.MaTaiKhoan}</td>
                <td>${phieu.NgayLap}</td>
                <td class="center">${phieu.SoLuongNguyenLieu}</td>
                <td><button class="btn primary center large xem" id = ${phieu.MaPhieu}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>
         </div>
        </div>`;
  return html;
}
function contentPhieuXuat() {
  let html = `        
        <div class="content">
         <a href="#"> <h3>Phân phối > Đơn yêu cầu nhập</h3></a>
          <form class="search">
            <input type="text" name="search" id="search">
            <button type="button"><i class="fa-solid fa-magnifying-glass" style="color: #1e5cc8;"></i></button>
          </form>
          <div class='buttons'>
            <button class="btn" id="XemDon">Đơn yêu cầu</button>
            <button class="btn" id="XemPhieuNhap">Phiếu nhập kho</button>
            <button class="btn" id="XemPhieuXuat">Phiếu xuất kho</button>
          </div>
         <div class="content__inner">
            <table>
              <tr class="muc">
                <th>Mã phiếu</th>
                <th>Mã đơn</th>
                <th>Tên đơn</th>
                <th>Người lập</th>
                <th>Ngày lập</th>
                <th>Số lượng nguyên liệu</th>
                <th>Hành động</th>
              </tr>
              ${dsPhieuXuat
                .map((phieu) => {
                  return `<tr>
                <td>${phieu.MaPhieu}</td>
                <td>${phieu.MaDon}</td>
                <td>${phieu.TenDon}</td>
                <td>${phieu.MaTaiKhoan}</td>
                <td>${phieu.NgayLap}</td>
                <td class="center">${phieu.SoLuongNguyenLieu}</td>
                <td><button class="btn primary center large xem" id = ${phieu.MaPhieu}>Xem</button></td>
              </tr>`;
                })
                .join("")}
              
            </table>
         </div>
        </div>`;
  return html;
}
function contentChiTietPhieuNhap(chiTiet) {
  let dsNguyenLieu = `<table class="small">
            <tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng</th>
              <th>Đơn vị</th>
            </tr>
            ${chiTiet.NguyenLieu.map((e) => {
              return `<tr>
              <td>${e.TenSanPham}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
            </tr>`;
            }).join("")}
          </table>
           <div class="buttons">
            <button class="btn primary" id="pdf">Xuất dưới dạng pdf</button>
            <button class="btn success" id = "excel">Xuất dưới dạng pdf</button>
            <button class="btn secondary small" id ="quayLai">Quay lại</button>
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
          <p><span class="deMuc">Mã kho:</span>${chiTiet.MaKho}</p>
          <p><span class="deMuc">Tên đơn:</span>${chiTiet.TenDon}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.MaTaiKhoan}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <p><span class="deMuc">Ngày nhập kho:</span>${chiTiet.NgayNhap}</p>
          <p><span class="deMuc">Trạng thái:</span>${chiTiet.TinhTrang}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieu}
        </div>
      </div>`;
  return html;
}
function contentChiTietPhieuXuat(chiTiet) {
  let dsNguyenLieu = `<table class="small">
            <tr>
              <th>Tên nguyên liệu</th>
              <th>Số lượng</th>
              <th>Đơn vị</th>
            </tr>
            ${chiTiet.NguyenLieu.map((e) => {
              return `<tr>
              <td>${e.TenSanPham}</td>
              <td>${e.SoLuong}</td>
              <td>${e.DonVi}</td>
            </tr>`;
            }).join("")}
          </table>
           <div class="buttons">
            <button class="btn primary" id="pdf">Xuất dưới dạng pdf</button>
            <button class="btn success" id = "excel">Xuất dưới dạng pdf</button>
            <button class="btn secondary small" id ="quayLai">Quay lại</button>
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
          <p><span class="deMuc">Mã kho:</span>${chiTiet.MaKho}</p>
          <p><span class="deMuc">Tên đơn:</span>${chiTiet.TenDon}</p>
          <p><span class="deMuc">Người lập:</span>${chiTiet.MaTaiKhoan}</p>
          <p><span class="deMuc">Ngày lập:</span>${chiTiet.NgayLap}</p>
          <p><span class="deMuc">Ngày xuất kho:</span>${chiTiet.NgayXuat}</p>
          <p><span class="deMuc">Trạng thái:</span>${chiTiet.TinhTrang}</p>
          <p><span class="deMuc">Danh sách yêu cầu:</span></p>
          ${dsNguyenLieu}
        </div>
      </div>`;
  return html;
}
function renderChiTiet(id) {
  let chitiet = layDon(id);
  if (chitiet.Loai === 2) render(chitiet, true);
  else render(chitiet, false);
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    initDon();
  });
}
function renderChiTietPhieuNhap(id) {
  let chitiet = layPhieuNhap(id);
  if (chitiet.Loai === 2) render(chitiet, false, "PhieuNhap");
  else render(chitiet, false, "PhieuNhap");
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    initPhieuNhap();
  });
}

function renderChiTietPhieuXuat(id) {
  let chitiet = layPhieuXuat(id);
  if (chitiet.Loai === 2) render(chitiet, false, "PhieuXuat");
  else render(chitiet, false, "PhieuXuat");
  const btnBack = document.querySelector("#quayLai");
  btnBack.addEventListener("click", (e) => {
    initPhieuXuat();
  });
}
function initDon() {
  render();
  init();
  const btnXem = document.querySelectorAll(".xem");
  btnXem.forEach((e) =>
    e.addEventListener("click", (e) => {
      const id = e.target.id;
      renderChiTiet(id);
    })
  );
}
function initPhieuNhap() {
  render(null, false, "PhieuNhap");
  init();
  const btnXem = document.querySelectorAll(".xem");
  btnXem.forEach((e) =>
    e.addEventListener("click", (e) => {
      const id = e.target.id;
      renderChiTietPhieuNhap(id);
    })
  );
}
function initPhieuXuat() {
  render(null, false, "PhieuXuat");
  init();
  const btnXem = document.querySelectorAll(".xem");
  btnXem.forEach((e) =>
    e.addEventListener("click", (e) => {
      const id = e.target.id;
      renderChiTietPhieuXuat(id);
    })
  );
}
function init() {
  const btnPhieuNhapKho = document.querySelector("#XemPhieuNhap");
  const btnPhieuXuatKho = document.querySelector("#XemPhieuXuat");
  const btnDonYeuCau = document.querySelector("#XemDon");
  btnDonYeuCau.addEventListener("click", initDon);
  btnPhieuNhapKho.addEventListener("click", initPhieuNhap);
  btnPhieuXuatKho.addEventListener("click", initPhieuXuat);
}
function layDon(id) {
  const chiTiet = dsDon.filter((e) => e.MaDon == id)[0];
  return chiTiet;
}
function layPhieuNhap(id) {
  const chiTiet = dsPhieuNhap.filter((e) => e.MaPhieu == id)[0];
  return chiTiet;
}
function layPhieuXuat(id) {
  const chiTiet = dsPhieuXuat.filter((e) => e.MaPhieu == id)[0];
  return chiTiet;
}

initDon();
