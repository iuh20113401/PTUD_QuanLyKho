import { MAVAITRO } from "./menu.js";
import renderNV, { contentToanBo, renderChiTiet } from "./nguyenLieuNV.js";
import { themBtn, xoaSuaBtn } from "./nguyenLieuQLKho.js";
import { getFetch } from "./helper.js";
async function layToanBoNguyenLieu() {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "layToanBoNguyenLieu",
  });
  return data;
}

let dsSanPham = (await layToanBoNguyenLieu()) || null;
async function render() {
  await renderNV(dsSanPham);
  if (MAVAITRO === 2) {
    themBtn();
    xoaSuaBtn(dsSanPham);
  }
  sortDanhSachSanPham();
}
await render();
let dsSanPhamAll = dsSanPham;
function renderSort() {
  const content = document.querySelector(".content");
  let html = contentToanBo();
  const placeholder = document.createElement("div");
  placeholder.insertAdjacentHTML("afterbegin", html);
  const node = placeholder.firstElementChild;
  const container = document.querySelector(".container");
  container.replaceChild(node, content);
  renderChiTiet();
  if (MAVAITRO === 2) {
    themBtn();
    xoaSuaBtn();
  }
}
let sltRes = true;
let slcxRes = true;
let slcnRes = true;
function sortDanhSachSanPham() {
  document.body.addEventListener("click", (e) => {
    const slt = Array.from(e.target.classList).includes("slt");
    const slcx = Array.from(e.target.classList).includes("slcx");
    const slcn = Array.from(e.target.classList).includes("slcn");
    if (slt) {
      sltRes = !sltRes;
      sortSoLuongTon(!sltRes);
      renderSort();
    }
    if (slcx) {
      slcxRes = !slcxRes;
      sortSoLuongChoXuat(!slcxRes);
      renderSort();
    }
    if (slcn) {
      slcnRes = !slcnRes;
      sortSoLuongChoNhap(!slcnRes);
      renderSort();
    }
  });
}
function sortSoLuongChoNhap(slt) {
  if (slt) {
    dsSanPhamAll = dsSanPham.sort(
      (a, b) => b.SoLuongChoNhap - a.SoLuongChoNhap
    );
  } else {
    dsSanPhamAll = dsSanPham.sort(
      (a, b) => a.SoLuongChoNhap - b.SoLuongChoNhap
    );
  }
  return;
}
function sortSoLuongChoXuat(slcx) {
  if (slcx) {
    dsSanPhamAll = dsSanPhamAll.sort(
      (a, b) => b.SoLuongChoXuat - a.SoLuongChoXuat
    );
  } else {
    dsSanPhamAll = dsSanPham.sort(
      (a, b) => a.SoLuongChoXuat - b.SoLuongChoXuat
    );
  }
  return;
}
function sortSoLuongTon(slcn) {
  if (slcn) {
    dsSanPhamAll = dsSanPham.sort((a, b) => b.SoLuongTon - a.SoLuongTon);
  } else {
    dsSanPhamAll = dsSanPham.sort((a, b) => a.SoLuongTon - b.SoLuongTon);
  }
  return;
}
