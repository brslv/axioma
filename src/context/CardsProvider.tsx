import { createContext, PropsWithChildren, useContext, useState } from "react";
import usePersistence from "../hooks/usePersistence";
import { Card } from "../lib/types";
import { createCard } from "../lib/utils";

type Zone = "left" | "right";

interface Context {
  cards: Card[];
  addCard: () => void;
  dropCard: (draggingCard: Card, droppingCard: Card, zone: Zone) => void;
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

  const dropCard: (
    draggingCard: Card,
    droppingCard: Card,
    zone: Zone
  ) => void = (dragging, dropping, zone) => {
    setCards((prev) => {
      let newCards = [...prev];
      const draggingIndex = newCards.findIndex(
        (card) => card.id === dragging.id
      );
      const droppingIndex = newCards.findIndex(
        (card) => card.id === dropping.id
      );

      const cardToMove = newCards.splice(draggingIndex, 1)[0];

      if (zone === "left") {
        const position =
          draggingIndex < droppingIndex ? droppingIndex - 1 : droppingIndex;

        newCards.splice(position, 0, cardToMove);
      }

      if (zone === "right") {
        const position = droppingIndex + 1;
        newCards.splice(position, 0, cardToMove);
      }

      return newCards;
    });
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
    dropCard,
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
