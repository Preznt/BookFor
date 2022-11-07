document.addEventListener("DOMContentLoaded", () => {
  const btnReg = document.querySelector("button.register");
  const inputs = document.querySelectorAll("form.fd_insert input");
  const date = inputs[0];
  const food = inputs[1].value;

  date.setAttribute("readonly", "readonly");

  btnReg?.addEventListener("click", () => {
    if (!food) {
      alert("식품명을 입력해주세요");
      return false;
    }
    document.querySelector("form.fd_insert").submit();
  });
});
