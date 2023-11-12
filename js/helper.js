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

export { toPDF, toExcel };
