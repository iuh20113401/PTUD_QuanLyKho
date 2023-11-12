function exportEcxel(title, HTML) {
  var vEncodeHead = '<html><head><meta charset="UTF-8"></head><body>';
  var vReportName = "";

  vReportName += '<b><font size="4">';
  vReportName += title;
  vReportName += "</b></font><br>";

  var Qlik = new Blob([vEncodeHead + vReportName + HTML + "</body></html>"], {
    type: "application/vnd.ms-excel;charset=utf-8",
  });
  let newTitle = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ");
  newTitle =
    newTitle
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("") +
    "_" +
    new Date().toLocaleDateString();
  saveAs(Qlik, `${newTitle}.xls`);
}
export { exportEcxel };
