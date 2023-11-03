var checkbox = document.getElementById("flexCheckChecked");
var element = document.getElementById("myElement");

checkbox.addEventListener("change", function() {
  if (checkbox.checked) {
    element.style.display = "none"; // Ẩn phần tử khi checkbox được chọn
  } else {
    element.style.display = "block"; // Hiển thị phần tử khi checkbox không được chọn
  }
});