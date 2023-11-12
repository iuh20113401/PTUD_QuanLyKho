import render from "./thanhPhamNV.js";
import { themBtn, xoaSuaBtn } from "./thanhPhamQLKho.js";
import { MAVAITRO } from "./menu.js";
render();
if (MAVAITRO === 2) {
  themBtn();
  xoaSuaBtn();
}
