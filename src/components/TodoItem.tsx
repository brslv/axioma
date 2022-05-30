import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { IoCheckbox, IoSquareOutline, IoTrash } from "react-icons/io5";
import { useTodos } from "../context/TodosProvider";
import { Todo } from "../lib/types";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { setCompleted, deleteTodo } = useTodos();
  const [shouldConfirmDelete, setShouldConfirmDelete] =
    useState<boolean>(false);

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShouldConfirmDelete(true);

    setTimeout(() => {
      setShouldConfirmDelete(false);
    }, 3000);
  };

  const handleConfirm: MouseEventHandler<HTMLButtonElement> = () => {
    deleteTodo(todo.id);
  };

  const handleTodoToggle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.target.checked;
    setCompleted(todo.id, checked);
  };

  return (
    <label className="todo">
      <input
        type="checkbox"
        className="todo__checkbox"
        checked={todo.completed}
        onChange={handleTodoToggle}
      />
      <div className="todo__checkbox-symbol">
        {todo.completed ? <IoCheckbox /> : <IoSquareOutline />}
      </div>
      <div className="todo__label">{todo.text}</div>
      {!shouldConfirmDelete && (
        <button className="todo__delete-btn" onClick={handleDelete}>
          <IoTrash />
        </button>
      )}
      {shouldConfirmDelete && (
        <button className="todo__delete-btn danger" onClick={handleConfirm}>
          <IoTrash />
        </button>
      )}
    </label>
  );
}
