document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.input");
  const inputs = document.querySelectorAll("input");
  const formLegend = document.querySelector("form.product.write legend");
  const ptaxInput = inputs[8];
  const pcodeInput = inputs[0];

  btnInput?.addEventListener("click", () => {
    const ptitleInput = inputs[1];
    if (pcodeInput.value.length < 13) {
      alert("13자리를 입력해주세요");
      return false;
    }
    if (!ptitleInput.value) {
      alert("상품명을 입력해주세요");
      return false;
    }

    document.querySelector("form.product.write").submit();
  });

  if (!ptaxInput.value) {
    ptaxInput.value = 1;
  }

  if (pcodeInput.value) {
    formLegend.textContent = "거래처 정보 수정";
    //  bcodeInput.setAttribute("readonly", "readonly");
    // bcodeInput.readOnly = "readOnly"
    pcodeInput.readOnly = true;
    btnInput.style.backgroundColor = "#00AAAA";
    btnInput.textContent = "수정";
  }
});
