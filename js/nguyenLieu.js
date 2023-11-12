import { MAVAITRO } from "./menu.js";
import renderNV from "./nguyenLieuNV.js";
import { themBtn, xoaSuaBtn } from "./nguyenLieuQLKho.js";
await renderNV();
if (MAVAITRO === 2) {
  themBtn();
  xoaSuaBtn();
}
