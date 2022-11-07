document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav.main");
  nav.addEventListener("click", (e) => {
    const target = e.target;
    let href = "/";
    if (target.tagName == "LI") {
      const navText = target.textContent;
      switch (navText) {
        case "Home":
          href = "/";
      }

      document.location.href = "/";
    }
  });
});
