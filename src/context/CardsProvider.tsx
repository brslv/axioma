import { createContext, PropsWithChildren, useContext, useState } from "react";
import usePersistence from "../hooks/usePersistence";
import { Card } from "../lib/types";
import { createCard } from "../lib/utils";

interface Context {
  cards: Card[];
  addCard: () => void;
  updateTitle: (id: Card["id"], title: Card["title"]) => void;
  deleteCard: (id: Card["id"]) => void;
}

const CardsContext = createContext<Context | null>(null);

export default function CardsProvider({ children }: PropsWithChildren<{}>) {
  const [cards, setCards] = useState<Card[]>([
    createCard({ id: "inbox-card", title: "📥 Inbox" }),
  ]);

  usePersistence({
    key: "cards",
    state: cards,
    onLoadedFromStorage: (state) => setCards(state),
  });

  const addCard: Context["addCard"] = () => {
    setCards((prev) => [...prev, createCard()]);
  };

  const updateTitle: Context["updateTitle"] = (id, title) =>
    setCards((prev) =>
      prev.map((card) => {
        if (card.id === id) return { ...card, title };
        return card;
      })
    );

  const deleteCard: Context["deleteCard"] = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const value = {
    cards,
    addCard,
    updateTitle,
    deleteCard,
  };

  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
}

export function useCards() {
  const ctx = useContext(CardsContext);
  if (!ctx) throw new Error("Improper use of CardsContext");
  return ctx;
}
