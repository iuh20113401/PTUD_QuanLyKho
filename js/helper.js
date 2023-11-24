import { exportEcxel } from "./exportEcxcel.js";

function toExcel(title) {
  $("#excel").click((e) => {
    function excel() {
      themOverlay();
      setTimeout((e) => {
        let html = document.querySelector("table").innerHTML;
        html = `<table>${html}</table>`;
        exportEcxel(title, html);
        xoaOverlay();
      }, 1000);
    }
    excel();
  });
}
function toPDF(title) {
  $("#pdf").click(async (e) => {
    themOverlay();
    title = title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ");

    title =
      title
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join("") +
      "_" +
      new Date().toLocaleDateString().replaceAll("/", "_");

    let html = document.querySelector("#in").innerHTML;
    html = `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <style>
                    * {
                      box-sizing: border-box;
                    }
                    #in {
                      padding: 1%;
                      box-sizing: border-box;
                    }

                    #in {
                      width: 99%;
                      height: 75%;
                      margin: 1% 0%;
                      border: 1px solid black;
                      overflow: scroll;
                    }
                    table {
                      width: 100%;
                      text-align: center;
                      border-collapse: collapse;
                      margin-bottom: 5%;
                    }
                    th {
                      padding: 15px;
                    }
                    tr {
                      border-bottom: 1px solid black;
                    }
                    td {
                      padding: 1% 1rem;
                    }
                    #in {
                      padding: 3% 5%;
                    }
                    h3 {
                          text-align: center;
                          font-size: 30px;
                        }
                          p {
                      width: 100%;
                      display: table;
                      justify-content: space-between;
                      align-items: center;
                    }
                    span {
                      width: 30%;
                    }
                </style>
                
            </head>
            <body>
            <p><i>Ngày 23 tháng 11 năm 2023</i></h5>
            <p><i>Số: 20113401</i></p>
              ${html}
            </body>
            </html>`;
    await $.ajax({
      url: "../ajax/exportPdf.php", // Đường dẫn đến tệp PHP
      type: "post", // Phương thức POST hoặc GET
      data: {
        action: "viewAll",
        html: html,
        title: title,
      },
      success: function (response) {
        console.log(response);
        xoaOverlay();
      },
    });
  });
}
function themSpinner() {
  return `<div >Đang xuất file <i class="fa-solid fa-spinner" style =" animation: spin 0.8s infinite ease-in-out;"></i></div>`;
}
function themOverlay() {
  const overlayDivEl = document.querySelector(".overlayDiv");
  overlayDivEl.innerHTML = `<div class="overlay"></div>
      <div class="message">${themSpinner()}</div>`;
}
function showOverlay(id) {
  init();
  xoaOverlay();
}
function xoaOverlay() {
  const overlayDivEl = document.querySelector(".overlayDiv");
  overlayDivEl.innerHTML = "";
  overlayDivEl.removeEventListener("click", showOverlay);
}
async function getFetch(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  });
  if (!response.ok) {
    throw new Error("Lỗi mạng hoặc lỗi máy chủ");
  }
  let res = await response.json();
  return res;
}
async function layThongTinTaiKhoan() {
  const data = await getFetch("../ajax/session.php", {
    action: "layThongTinTaiKhoan",
  });
  return data;
}
function thongBaoLoi(message) {
  let html = `<div id="notificationContainer" class="notification-container">
  </div>`;
  document.querySelector("body").insertAdjacentHTML("beforeend", html);
  showErrorNotification(message);
}
async function modalXacNhan(message) {
  let html = `
  <div id="fixedNotificationContainer" class="fixed-notification-container">
      <div class="fixed-notification">
        <button class="close-btn">&times;</button>
        <div class="notification-message mt-1"></div>
        <button class="confirm-btn mt-1">Xác nhận</button>
      </div>
    </div>
  `;
  document.querySelector("body").insertAdjacentHTML("beforeend", html);
  return new Promise((resolve, reject) => {
    const container = document.getElementById("fixedNotificationContainer");
    const closeBtn = container.querySelector(".close-btn");
    const confirmBtn = container.querySelector(".confirm-btn");

    closeBtn.onclick = () => {
      container.style.display = "none";
      reject(false);
    };

    confirmBtn.onclick = () => {
      container.style.display = "none";
      resolve(true);
    };

    showFixedNotification(message);
  });
}
function showErrorNotification(message) {
  const notificationContainer = document.getElementById(
    "notificationContainer"
  );
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerText = message;

  // Hiển thị thông báo
  notificationContainer.appendChild(notification);
  notification.style.display = "block";

  // Ẩn thông báo sau 3 giây
  setTimeout(() => {
    notification.style.display = "none";
    notificationContainer.removeChild(notification);
  }, 3000);
}
async function showFixedNotification(message) {
  const container = document.getElementById("fixedNotificationContainer");
  const messageSpan = container.querySelector(".notification-message");
  messageSpan.textContent = message;

  container.style.display = "flex";
}
async function modalThongBao(message, isSuccess) {
  let html = `<div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <p id="modalMessage"></p>
      </div>
    </div>`;
  document.querySelector("body").insertAdjacentHTML("beforeend", html);
  showModal(message, isSuccess);
  return new Promise((resolve, reject) => {
    let span = document.getElementsByClassName("close")[0];
    let modal = document.getElementById("myModal");

    span.onclick = function () {
      modal.style.display = "none";
      resolve(true);
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        resolve(true);
      }
    };
  });
}
function showModal(message, isSuccess) {
  let modal = document.getElementById("myModal");
  let span = document.getElementsByClassName("close")[0];
  let messageElement = document.getElementById("modalMessage");

  messageElement.innerHTML = message;
  if (isSuccess) {
    messageElement.classList.add("successTB");
    messageElement.classList.remove("error");
  } else {
    messageElement.classList.add("error");
    messageElement.classList.remove("successTB");
  }

  modal.style.display = "block";
}
function xoaHang() {
  document.querySelector(".content").addEventListener("click", (e) => {
    if (e.target.matches(".xoaHang")) {
      e.target.closest(".row").remove();
    }
  });
}
let taiKhoan = await layThongTinTaiKhoan();
export {
  toPDF,
  toExcel,
  getFetch,
  taiKhoan,
  thongBaoLoi,
  modalXacNhan,
  modalThongBao,
  xoaHang,
};
