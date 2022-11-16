document.addEventListener("DOMContentLoaded", (req, res) => {
  const btnInsert = document.querySelector("button.product.insert");
  const productList = document.querySelector("table.product.list");

  btnInsert.addEventListener("click", () => {
    document.location.href = "/product/write";
  });

  productList.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const pcode = tr.dataset.p_code;
      if (pcode) {
        document.location.href = `/product/detail/${pcode}`;
      }
    }
  });
});
