import { useTodoContext } from "../context/TodoContext";
import { useCallback } from "react";
const TodoItem = ({ Item }) => {
  const { todoDelete, todoComplete, todoEditor } = useTodoContext();
  const deleteHandler = useCallback(
    (e) => {
      const target = e.target;
      const parent = target.closest("DIV.item");
      const uid = parent.dataset.id;
      const childDiv = parent.childNodes;
      const content = childDiv[2].textContent;
      if (
        window.confirm(`삭제확인? \n"${content}" \n할일 아이템을 삭제합니다`)
      ) {
        // TodoMain 에게 uid를 보내서 삭제
        todoDelete(uid);
      }
    },
    [todoDelete]
  );

  const completeHandler = (e) => {
    const target = e.target;
    const uid = target.closest("DIV.item").dataset.id;
    todoComplete(uid);
  };

  const editorHandler = (e) => {
    const target = e.target;
    const parent = target.closest("DIV.item");
    const uid = parent.dataset.id;
    todoEditor(uid);
  };

  return (
    <div className="item" data-id={Item.id}>
      <div className="delete" onClick={deleteHandler}>
        &times;
      </div>
      <div className="sdate">
        <div>{Item.s_date}</div>
        <div>{Item.s_time}</div>
      </div>
      <div
        className={Item.e_date ? "content line" : "content"}
        onClick={editorHandler}
      >
        {Item.t_content}
      </div>
      <div className="complete" onClick={completeHandler}>
        &#x2713;
      </div>
    </div>
  );
};

export default TodoItem;
