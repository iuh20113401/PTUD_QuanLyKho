import { MAVAITRO } from "./menu.js";
import initNV from "./kiemKeNV.js";
import initGD from "./kiemKeGD.js";
if (MAVAITRO === 1) {
  initGD();
} else {
  initNV();
}
