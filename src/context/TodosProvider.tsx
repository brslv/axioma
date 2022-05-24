import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { Card, Todo } from "../lib/types";
import { createTodo } from "../lib/utils";
import usePersistence from "../hooks/usePersistence";

type FilterOpts = {
  cardId: Card["id"];
  completed: Todo["completed"];
};

interface Context {
  todos: Todo[];
  addTodo: (cardId: Card["id"], text: Todo["text"]) => void;
  deleteTodo: (id: Todo["id"]) => void;
  setCompleted: (id: Todo["id"], completed: Todo["completed"]) => void;
  filter: (filterOpts: FilterOpts) => Todo[];
}

const TodosContext = createContext<Context | null>(null);

export default function TodosProvider({ children }: PropsWithChildren<{}>) {
  const [todos, setTodos] = useState<Todo[]>([
    createTodo({
      cardId: "inbox-card",
      text: "👋 Welcome to Axioma. The minimalistic, at-a-glance todo app.",
    }),
    createTodo({
      cardId: "inbox-card",
      text: "🙈 At-a-glance is Axioma's unique UI feature. It means that the app never hides anything from you.",
    }),
    createTodo({
      cardId: "inbox-card",
      text: "👌 No multiple nested menus. It's all layed out in front of you, just as it should be.",
    }),
    createTodo({
      cardId: "inbox-card",
      text: "❤️ It might feel overwhelming at first, but give it a try. We promise you'll fall in love with it's simplicity.",
    }),
    createTodo({
      cardId: "inbox-card",
      text: "🚀 You'll also notice that Axioma doesn't support any formatting, file-uploads, nesting, etc. It's intentional. We consider all of these a distraction.",
    }),
    createTodo({
      cardId: "inbox-card",
      text: "🗂 Now, go ahead and create a card for the most important areas of your life.",
    }),
    createTodo({
      cardId: "inbox-card",
      text: "🧘‍♂️ List the things you have to do there and never forget to delete cards once you're done with them. Just to keep it light and easy to the eye :).",
    }),
    createTodo({
      cardId: "inbox-card",
      text: "😍 Enjoy your new, calm way of keeping track of your todos.",
    }),
  ]);

  usePersistence<Todo[]>({
    key: "todos",
    state: todos,
    onLoadedFromStorage: (state) => {
      setTodos(state as Todo[]);
    },
  });

  const filter = useCallback(
    (filters: {
      cardId: Card["id"];
      completed?: Todo["completed"];
      pending?: boolean;
    }) => {
      const _todos = todos.reduce((acc, todo) => {
        const isInCard = filters.cardId === todo.cardId;

        if (!isInCard) return acc;

        if (filters.completed === false && todo.completed) return [...acc];

        return [...acc, todo];
      }, [] as Todo[]);

      console.log(_todos);

      return _todos;
    },
    [todos]
  );

  const setCompleted: Context["setCompleted"] = (id, completed) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) return { ...todo, completed };
        return todo;
      })
    );
  };

  const addTodo: Context["addTodo"] = (cardId, text) =>
    setTodos((prev) => [createTodo({ text, cardId }), ...prev]);

  const deleteTodo: Context["deleteTodo"] = (id) =>
    setTodos((prev) => [...prev.filter((todo) => todo.id !== id)]);

  const value = {
    todos,
    addTodo,
    deleteTodo,
    setCompleted,
    filter,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("Improper use of TodosContext");
  return ctx;
}
