document.addEventListener("DOMContentLoaded", () => {
  const btnUpdate = document.querySelector("button.product.update");
  const btnDelete = document.querySelector("button.product.delete");
  const buttonBox = document.querySelector("article.detail.button");

  buttonBox?.addEventListener("click", (tag) => {
    const button = tag.target;
    if (button.tagName === "BUTTON") {
      const pcode = button.closest("article")?.dataset.p_code;
      const classList = Array.from(button.classList);
      let url = "/product";
      if (classList.indexOf("update") > 0) {
        url += `/update/${pcode}`;

        document.location.href = url;
      } else if (classList.indexOf("delete") > 0) {
        if (!confirm("정말로 삭제 하겠습니까?")) {
          return false;
        }
        url += `/delete/${pcode}`;

        document.location.replace(url);
      }
    }
  });
});
