"use strict";
function render() {
  return `<div class="form">
        <form action="">
          <div class="inputInfo">
            <label for="tenDangNhap">Tên đăng nhập</label>
            <input
              type="text"
              name="tenDangNhap"
              id="tenDangNhap"
              placeholder="Nhập mã số nhân viên của bạn"
            />
            <div class="textError hidden">
              Tên đăng nhập hoặc mật khẩu của không đúng
            </div>
          </div>
          <div class="inputInfo">
            <label for="matKhau">Mật khẩu</label>
            <input
              type="password"
              name="matKhau"
              id="matKhau"
              placeholder="Nhập mật khẩu của bạn"
            />
          </div>
           <div class="textError hidden">
            Tên đăng nhập hoặc mật khẩu của không đúng
          </div> 
          <button type="submit" class="btn center large" name="dangNhap" disabled>
            Đăng nhập
          </button>
        </form>
      </div>`;
}
function init() {
  const container = document.querySelector(".container");
  const renderFirst = render();
  container.innerHTML = renderFirst;
  const tk = document.querySelector("#tenDangNhap");
  const mk = document.querySelector("#matKhau");
  const button = document.querySelector(".btn");
  tk.addEventListener("keyup", (e) => {
    if (e.target.value.length >= 2) {
      const value = e.target.value;
      const regex = /[^a-zA-Z0-9]/;
      if (regex.test(value)) {
        tk.classList.add("inputError");
        document.querySelector(".textError").classList.remove("hidden");
      } else {
        tk.classList.remove("inputError");
        document.querySelector(".textError").classList.add("hidden");
        checkInput();
      }
    }
  });
  mk.addEventListener("keyup", (e) => {
    const value = e.target.value;
    console.log();
    checkInput();
  });
  function checkInput() {
    if (
      tk.value.length >= 2 &&
      mk.value.length >= 8 &&
      !tk.classList.contains("inputError") &&
      !mk.classList.contains("inputError")
    ) {
      button.classList.add("primary");
      button.removeAttribute("disabled");
    } else {
      button.classList.remove("primary");
      button.setAttribute("disabled", "true");
    }
  }
}
function checkTaiKhoan() {
  const tk = document.querySelector("#tenDangNhap");
}
init();
