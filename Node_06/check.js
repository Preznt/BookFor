const numInput = document.querySelector("input[name='s_num']");
const nameInput = document.querySelector("input[name='s_name']");
const gradeInput = document.querySelector("input[name='s_grade']");
const btnAdd = document.querySelector("button.add");

const chkInput = () => {
  if (!numInput.value) {
    alter("학번을 입력해주세요");
  } else if (!nameInput.value) {
    alter("이름을 입력해주세요");
  } else if (!gradeInput.value >= 1 && gradeInput.value <= 4) {
    alter("학년을 1~4까지만 입력해주세요");
  }
};

btnAdd.addEventListener("click", chkInput);
