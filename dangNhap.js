"use strict";
async function dangNhap(tk, mk) {
  let data;
  await $.ajax({
    url: "./ajax/dangNhap.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "dangNhap",
      tk,
      mk,
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function getSession() {
  let data;
  await $.ajax({
    url: "./ajax/session.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "getSession",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
const MaVaiTro = await getSession();
function init() {
  const tk = document.querySelector("#username");
  const mk = document.querySelector("#password");
  const button = document.querySelector(".btn");
  tk.addEventListener("keyup", (e) => {
    if (e.target.value.length >= 2) {
      const value = e.target.value;
      const regex = /[^0-9]/;
      if (regex.test(value)) {
        tk.classList.add("inputError");
        textError("Tên đăng nhập phải là mã số nhân viên của bạn");
      } else {
        tk.classList.remove("inputError");
        document.querySelector(".textError").classList.add("hidden");
      }
    }
  });
  button.addEventListener("click", async (e) => {
    let data = await dangNhap(tk.value, mk.value);
    if (data.length) {
      replaceHref(data[0].MaVaiTro);
    } else {
      textError("Sai mật khẩu hoặc tài khoản");
    }
  });
}
function textError(message) {
  let textError = document.querySelector(".textError");
  textError.classList.remove("hidden");
  textError.textContent = message;
}
function replaceHref(MaVaiTro) {
  switch (MaVaiTro) {
    case 1:
      location.replace("./view/baoCao.html");
      break;
    case 2:
      location.replace("./view/phanPhoiDonYeuCauNhap.html");
      break;
    case 3:
      location.replace("./view/xacNhanNhapKho.html");
      break;
    case 4:
      location.replace("./view/nguyenLieu.html");
      break;
    case 5:
      location.replace("./view/nguyenLieu.html");
      break;
    default:
      location.replace("./view/nguyenLieu.html");
      break;
  }
}
if (MaVaiTro) {
  replaceHref(MaVaiTro);
} else {
  init();
}
