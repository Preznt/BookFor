document.addEventListener("DOMContentLoaded", () => {
  const tTable = document.querySelector("table.today");
  const tForm = document.querySelector("form.today");
  const btnInput = document.querySelector("button.today.input");
  const btnReset = document.querySelector("button.today.reset");

  tTable?.addEventListener("click", (tag) => {
    const target = tag.target;

    if (target.tagName === "TD") {
      // 클릭된 td 를 감싸고 있는 tr을 찾기
      const pTR = target.closest("TR");
      const t_seq = pTR.dataset.seq; // tr에 부착된 data-seq 값 getter

      const tds = pTR.childNodes;
      for ([index, td] of tds.entries()) {
        // document.querySelector("input[name='t_date']")
        // 배열의 index 를 사용하여 어떤 값을 getter,setter 하는 경우
        // 정확히 원하는 index를 지정이 안되는 경우가 있다
        // input[index].value = td.textContent
        if (td?.title) {
          const input = document.querySelector(`input[name=${td.title}]`);
          input.value = td.textContent;
        }
      }
      document.querySelector("input[name='t_seq']").value = t_seq;
      // button.input tag 에 update 라는 클래스를 부착하라
      btnInput.classList.add("update");

      //   btnInput.textContent = "변경";
      //   btnInput.style.backgroundColor = "green";
      //   const inputProps = {
      //     style: `display:"hidden"`,
      //     name: "t_seq",
      //     value: `${t_seq}`,
      //   };

      //   const t_seq_input = Object.assign(
      //     document.createElement("input"),
      //     inputProps
      //   );

      //   const seqTag = tForm.querySelector("input[name='t_seq']");
      //   if (seqTag) {
      //     tForm.removeChild(seqTag);
      //   }
      //   tForm.appendChild(t_seq_input);
    }
  });
  btnReset?.addEventListener("click", () => {
    btnInput.classList.remove("update");
    // const seqTag = tForm.querySelector("input[name='t_seq']");
    // if (seqTag) tForm.removeChild(seqTag);
    // btnInput.style.backgroundColor = "blue";
    // btnInput.textContent = "추가";
  });

  tTable?.addEventListener("mousedown", async (e) => {
    is_right_click = e.which == 3 || e.button == 2;
    const target = e.target;
    const parentTR = target.closest("TR");
    if (is_right_click && target.tagName == "TD") {
      if (confirm("정말 삭제하시겠습니까?")) {
      }
    }
  });

  window.oncontextmenu = function () {
    return false;
  };

  // tTable.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });
});
