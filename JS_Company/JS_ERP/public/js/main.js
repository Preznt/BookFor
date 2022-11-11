document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.input");
  const btnSave = document.querySelector("button.save");
  btnInput.addEventListener("click", () => {
    document.location.href = "/input";
  });

  btnSave.addEventListener("click", () => {
    document.querySelector("form.buyer").submit();
  });
});
