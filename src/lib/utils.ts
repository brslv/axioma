import { Card, Todo } from "./types";

const DEFAULT_TODO: Omit<Todo, "id" | "cardId"> = {
  text: "New todo",
  completed: false,
};
export const createTodo = (todo: Partial<Todo> = DEFAULT_TODO): Todo => {
  return {
    id: todo.id || generateId(),
    text: todo.text || "",
    cardId: todo.cardId || generateId(),
    completed: todo.completed || DEFAULT_TODO.completed,
  };
};

const DEFAULT_CARD: Omit<Card, "id"> = { title: "New Card" };
export const createCard = (card: Partial<Card> = DEFAULT_CARD): Card => {
  return {
    id: card.id || generateId(),
    title: card.title || DEFAULT_CARD.title,
  };
};

export function generateId() {
  return Math.random().toString();
}
