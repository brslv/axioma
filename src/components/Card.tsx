import {
  MouseEventHandler,
  ChangeEventHandler,
  useMemo,
  useState,
  KeyboardEventHandler,
  useRef,
  useEffect,
  forwardRef,
  ForwardedRef,
} from "react";
import { useClickAway } from "react-use";
import {
  IoCheckbox,
  IoCheckmarkDone,
  IoEyeOffSharp,
  IoEyeSharp,
  IoMenu,
  IoTrash,
} from "react-icons/io5";
import { useCards } from "../context/CardsProvider";
import { useTodos } from "../context/TodosProvider";
import { Card as CardType } from "../lib/types";
import TodoItem from "./TodoItem";

export interface CardProps {
  card: CardType;
}

const Card = forwardRef(
  ({ card }: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
    const editTitleInputRef = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const { updateTitle, deleteCard } = useCards();
    const { todos: allTodos, addTodo } = useTodos();
    const [newTodoText, setNewTodoText] = useState("");
    const [newCardTitle, setNewCardTitle] = useState(card.title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShowingCompleted, setIsShowingCompleted] = useState(true);
    const [shouldConfirmDelete, setShouldConfirmDelete] =
      useState<boolean>(false);

    const allTodosInCard = useMemo(
      () => allTodos.filter((todo) => todo.cardId === card.id),
      [card.id, allTodos]
    );

    const todos = useMemo(() => {
      return isShowingCompleted
        ? allTodosInCard
        : allTodosInCard.filter((todo) => todo.completed === false);
    }, [allTodosInCard, isShowingCompleted]);

    const completedTodos = useMemo(
      () => allTodosInCard.filter((todo) => todo.completed),
      [allTodosInCard]
    );

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setNewTodoText(e.target.value);
    };

    const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setNewTodoText("");
        addTodo(card.id, newTodoText);
      }
    };

    const handleTitleClick: MouseEventHandler<HTMLDivElement> = () =>
      setIsEditingTitle(true);
    const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
      setNewCardTitle(e.target.value);
    const handleTitleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === "Enter") {
        if (newCardTitle === "") return; // TODO: show error?

        updateTitle(card.id, newCardTitle);
        setIsEditingTitle(false);
      }
      if (e.key === "Escape") {
        setIsEditingTitle(false);
      }
    };

    const handleMenuClick = () => {
      setIsMenuOpen(true);
    };

    const handleHideCompleted: MouseEventHandler<HTMLButtonElement> = () => {
      setIsShowingCompleted((prev) => !prev);
    };

    const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setShouldConfirmDelete(true);

      setTimeout(() => {
        setShouldConfirmDelete(false);
      }, 3000);
    };

    const handleConfirm: MouseEventHandler<HTMLButtonElement> = () => {
      deleteCard(card.id);
    };

    useEffect(() => {
      if (isEditingTitle && editTitleInputRef && editTitleInputRef.current) {
        editTitleInputRef.current.focus();
      }
    }, [isEditingTitle]);

    useClickAway(menuRef, () => setIsMenuOpen(false));
    useClickAway(editTitleInputRef, () => {
      setIsEditingTitle(false);
    });

    return (
      <div className="card" ref={ref}>
        <div className="card__heading-container">
          <div className="card__heading">
            {!isEditingTitle && (
              <h2 className="card__title" onClick={handleTitleClick}>
                {card.title}
              </h2>
            )}
            {isEditingTitle && (
              <input
                ref={editTitleInputRef}
                type="text"
                value={newCardTitle}
                onChange={handleTitleChange}
                onKeyUp={handleTitleKeyUp}
              />
            )}
            <div className="card__controls">
              <button onClick={handleMenuClick} className="inverted">
                <IoMenu />
              </button>

              {isMenuOpen && (
                <div ref={menuRef} className="card__menu">
                  <button
                    className="card__menu-btn inverted"
                    onClick={handleHideCompleted}
                  >
                    {isShowingCompleted && (
                      <IoEyeOffSharp className="card__menu-btn-icon" />
                    )}
                    {!isShowingCompleted && (
                      <IoEyeSharp className="card__menu-btn-icon" />
                    )}
                    <span>
                      {!isShowingCompleted ? "Show" : "Hide"} completed
                    </span>
                  </button>
                  {!shouldConfirmDelete && (
                    <button
                      className="card__menu-btn inverted"
                      onClick={handleDelete}
                    >
                      <IoTrash className="card__menu-btn-icon" />
                      <span>Delete</span>
                    </button>
                  )}
                  {shouldConfirmDelete && (
                    <button
                      className="card__menu-btn danger"
                      onClick={handleConfirm}
                    >
                      <IoTrash className="card__menu-btn-icon" />
                      <span>Confirm delete</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            className="todo-input"
            value={newTodoText}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
        </div>
        <div className="card__body">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {!todos.length && (
            <div className="card__placeholder">
              <IoCheckmarkDone className="card__placeholder-icon" />
              <div>All done!</div>
            </div>
          )}
        </div>
        <div className="card__footer">
          <div className="card__tiny-stats" title="Completed/Pending">
            <IoCheckbox />
            {completedTodos.length}/{allTodosInCard.length}
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
