import renderNV, { contentToanBo, renderChiTiet } from "./thanhPhamNV.js";
import { themBtn, xoaSuaBtn } from "./thanhPhamQLKho.js";
import { MAVAITRO } from "./menu.js";
import { getFetch } from "./helper.js";
async function layToanBoThanhPham() {
  const data = await getFetch("../ajax/sanPham.php", {
    action: "layToanBoThanhPham",
  });
  return data;
}

let dsSanPham = (await layToanBoThanhPham()) || null;
async function render() {
  renderNV(dsSanPham);
  checkVaiTro();
  sortDanhSachSanPham();
}
await render();
function checkVaiTro() {
  if (MAVAITRO === 2) {
    themBtn();
    xoaSuaBtn(dsSanPham);
  }
}
let sltRes = true;
let slcxRes = true;
let slcnRes = true;
function renderSort() {
  const content = document.querySelector(".content");
  let html = contentToanBo();
  const placeholder = document.createElement("div");
  placeholder.insertAdjacentHTML("afterbegin", html);
  const node = placeholder.firstElementChild;
  const container = document.querySelector(".container");
  container.replaceChild(node, content);
  renderChiTiet();
  checkVaiTro();
}
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
    dsSanPham = dsSanPham.sort((a, b) => b.SoLuongChoNhap - a.SoLuongChoNhap);
  } else {
    dsSanPham = dsSanPham.sort((a, b) => a.SoLuongChoNhap - b.SoLuongChoNhap);
  }
  return;
}
function sortSoLuongChoXuat(slcx) {
  if (slcx) {
    dsSanPham = dsSanPham.sort((a, b) => b.SoLuongChoXuat - a.SoLuongChoXuat);
  } else {
    dsSanPham = dsSanPham.sort((a, b) => a.SoLuongChoXuat - b.SoLuongChoXuat);
  }
  return;
}
function sortSoLuongTon(slcn) {
  if (slcn) {
    dsSanPham = dsSanPham.sort((a, b) => b.SoLuongTon - a.SoLuongTon);
  } else {
    dsSanPham = dsSanPham.sort((a, b) => a.SoLuongTon - b.SoLuongTon);
  }
  return;
}
