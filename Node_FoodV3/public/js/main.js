document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.today.input");
  const fd_table = document.querySelector("table.today");
  const todayInputs = document.querySelectorAll("input");
  const tds = document.querySelectorAll("tbody td");

  btnInput?.addEventListener("click", (tag) => {
    const updateTag = tag.currentTarget;

    // tag에 update 라는 class 가 포함되어 있으면
    // 유효성 검사 하지 말기
    console.log(updateTag.classList);
    // if (Array.from(updateTag.classList).includes("update")) return false;

    for (const tag of todayInputs) {
      // input tag 의 name seq 이면 건너뛰기
      if (tag.name !== "t_seq") {
        console.log(tag.value);
        const value = tag.value;
        if (!value) {
          alert(`값을 입력해주세요\n"${tag.title}"`);
          tag.select(); // tag.focus() 를 포함한다
          return false;
        }
      }
    } // end for
    // 유효성 검사가 끝나면 server 로 데이터를 전송하기
    document.querySelector("form.today").submit();
  });

  const fdclickHandler = (tag) => {
    const target = tag.target;
    const parentTR = target.closest("TR");
    const childTD = parentTR.children;

    for (let i = 0; i < childTD.length - 1; i++) {
      todayInputs[i].value = childTD[i].textContent;
    }

    // Array.from(childTD).forEach((TD, index) => {
    //   todayInputs[index].value = TD.textContent;
    // });
    // 위에 for문을 할때는 childTD에 Array.from 안해도 실행되는데
    // 아래 반복문은 써줘야하는 이유는?

    // 서버에서 보내온 todays라는 데이터를 이용해서 클릭하면
    // 그 테이블이 몇번인지를 찾아서 그 객체의 속성의 값을 하나씩 넣어주려고 했지만
    // 표를 화면에 보여줄때 따로 정렬을 해줘서 순서가 바뀌어버렸다..
    // const fd_index = parentTR.dataset.seq;
    // todayInputs[0].value = todays[fd_index].t_date;
  };

  // fd_table?.addEventListener("click", fdclickHandler);
});
