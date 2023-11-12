import { MAVAITRO, menu, menuShow, highLightMenu } from "./menu.js";

async function nguyenLieu() {
  let data;
  await $.ajax({
    url: "../ajax/baoCao.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "nguyenLieu",
    },
    success: function (response) {
      data = JSON.parse(response);
    },
  });
  return data;
}
async function thanhPham() {
  let data;
  await $.ajax({
    url: "../ajax/baoCao.php", // Đường dẫn đến tệp PHP
    type: "post", // Phương thức POST hoặc GET
    data: {
      action: "thanhPham",
    },
    success: function (response) {
      response;
      data = JSON.parse(response);
    },
  });
  return data;
}
let uniqueSP;
let dsUniqueSP;
let dsNhap;
let data;
let colors = [
  "rgb(255, 99, 132)", // Đỏ
  "rgb(54, 162, 235)", // Xanh dương
  "rgb(255, 206, 86)", // Vàng
  "rgb(75, 192, 192)", // Xanh lá
  "rgb(153, 102, 255)", // Tím
  "rgb(255, 159, 64)", // Cam
  "rgb(53, 102, 235)", // Xanh lam
  "rgb(255, 99, 132)", // Hồng
  "rgb(54, 162, 235)", // Xanh dương nhạt
  "rgb(75, 192, 192)", // Xanh lá nhạt
];
let myPieChart;
let myLineChart;
let mybarChart;
function render(ma = 1) {
  let html = content(ma);
  html = `${menu()}
      ${html}
      `;
  let container = document.querySelector(".container");
  container.innerHTML = html;
  menuShow();
  highLightMenu();
  let pieChartTop10 = document.querySelector("#top10").getContext("2d");
  let barChart = document.querySelector(".barChart").getContext("2d");
  let lineChart = document.querySelector(".lineChart").getContext("2d");
  myPieChart = pieChartVisual(pieChartTop10);
  mybarChart = barChartVisual(barChart);
  myLineChart = lineChartVisual(lineChart);
}
function content(ma) {
  return `<div class="content">
        <h2>Xin chào, mừng bạn trở lại</h2>
        <div class="content__inner">
          <div class="data">
            <select name="" id="tieuchi">
              <option value="1" ${
                ma === 1 ? "selected" : ""
              }>Nguyên liệu</option>
              <option value="2" ${
                ma !== 1 ? "selected" : ""
              }>Thành phẩm</option>
              <!-- tổng số lượng tồn, toàn bộ san phẩm theo số lượng (pie), top 10 số lượng lớn nhất (bar), số lượng chờ xuất và số lượng chờ nhập (pie) -->
              <option value="">Nguyên liệu chờ nhập</option>
              <option value="">Nguyên liệu đã nhập</option>
              <option value="">Nguyên liệu chờ xuất</option>
              <option value="">Nguyên liệu đã xuất</option>
              <option value="">Đơn yêu cầu</option>
            </select>
          </div>
          <div class="charts">
            <canvas class="pieChart" id="top10"></canvas>
            <canvas class="barChart"></canvas>
            <canvas class="lineChart"></canvas>
          </div>
        </div>
      </div>`;
}

function barChartVisual(ctx) {
  const data = {
    labels: dsUniqueSP.map((d) => d.TenSanPham),
    datasets: [
      {
        data: dsUniqueSP.map((d) => d.SoLuongTon),
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          position: "left",
        },
        title: {
          display: true,
          text: "Top 10 sản phẩm có số lượng tồn lớn nhất (KG)",
        },
      },
    },
  };
  if (myLineChart) {
    mybarChart.destroy();
  }
  const myChart = new Chart(ctx, config);

  return myChart;
}
function pieChartVisual(ctx) {
  const data = {
    labels: dsUniqueSP.map((d) => d.TenSanPham),
    datasets: [
      {
        data: dsUniqueSP.map((d) => d.SoLuongTon), // Dữ liệu biểu thị cho mỗi phần của pie chart
        backgroundColor: colors,
        hoverOffset: 4, // Khoảng cách khi hover chuột lên phần tử của biểu đồ
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: true,
          text: "Top 10 sản phẩm có số lượng tồn lớn nhất",
        },
      },
    },
  };
  if (myLineChart) {
    myPieChart.destroy();
  }
  const myChart = new Chart(ctx, config);

  return myChart;
}

function lineChartVisual(ctx) {
  const data = {
    labels: dsNhap.map((d) => d.NgayNhap),
    datasets: [
      {
        data: dsNhap.map((d) => d.SoLuong),
        backgroundColor: colors,
        hoverOffset: 4,
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
        title: {
          display: true,
          text: "Số lượng nhập theo ngày",
        },
      },
    },
  };
  if (myLineChart) {
    myLineChart.destroy();
  }
  const myChart = new Chart(ctx, config);
  Chart.defaults.font.size = 16;
  return myChart;
}
async function init(ma = 1) {
  let data = ma === 1 ? await nguyenLieu() : await thanhPham();
  if (data.length) trichXuatData(data);
  render(ma);
  const select = document.querySelector("select");
  select.addEventListener("change", (e) => {
    changeSelect();
  });
}

function trichXuatData(data) {
  console.log(data);
  uniqueSP = [...new Set(data.map((d) => d.TenSanPham))];
  dsUniqueSP = uniqueSP.map((uSP) => {
    let ds = data.filter((d) => d.TenSanPham === uSP);
    return {
      TenSanPham: uSP,
      SoLuongTon: ds[0].SoLuongTon,
      SoLuongChoXuat: ds[0].SoLuongChoNhap,
      SoLuongChoNhap: ds[0].SoLuongChoXuat,
    };
  });
  dsUniqueSP = dsUniqueSP
    .sort((a, b) => b.SoLuongTon - a.SoLuongTon)
    .splice(0, 10);
  dsNhap = [...new Set(data.map((d) => d.NgayNhap))];
  dsNhap = dsNhap.map((nn) => {
    let ds = data.filter((d) => d.NgayNhap === nn);
    return {
      NgayNhap: nn,
      SoLuong: ds.reduce((acc, d) => acc + d.SoLuong, 0),
    };
  });
}
async function changeSelect() {
  const selectValue = document.querySelector("select").value;

  if (selectValue == 1) {
    await init(1);
  } else {
    await init(2);
  }
}
await init(1);
