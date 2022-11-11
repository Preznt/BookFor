document.addEventListener("DOMContentLoaded", () => {
  const infoTable = document.querySelector("table.buyer");
  infoTable.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName == "TD") {
      document.location.href = "/update";
    }
  });
});
