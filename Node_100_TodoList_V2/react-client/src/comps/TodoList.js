import { useTodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todoContentList } = useTodoContext();

  const todoListItemView = todoContentList.map((Item) => {
    return <TodoItem Item={Item} key={Item.id} />;
  });
  return <div>{todoListItemView}</div>;
};

export default TodoList;
