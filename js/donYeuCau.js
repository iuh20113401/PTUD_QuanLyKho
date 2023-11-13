import initGD from "./donYeuCauGD.js";
import initNV from "./donYeuCauNV.js";
import { MAVAITRO } from "./menu.js";
if (MAVAITRO === 1) {
  initGD();
} else {
  initNV();
}
