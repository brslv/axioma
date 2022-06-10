import { useCallback, useState } from "react";
import { useCards } from "../context/CardsProvider";
import useFontSizeUpdater from "../hooks/useFontSizeSetting";
import { Card } from "../lib/types";
import AddCardControl from "./AddCardControl";
import DraggableCard from "./dnd/DraggableCard";
import DroppableSlot from "./dnd/DroppableSlot";
import Grid from "./Grid";
import Scratchpad from "./Scratchpad";
import Statusline from "./Statusline";

export default function Dashboard() {
  const { cards, dropCard } = useCards();
  const [draggingOverCard, setDraggingOverCard] = useState<Card | null>(null);

  const handleOver: (card: Card) => void = useCallback((card) => {
    setDraggingOverCard(card);
  }, []);

  const handleDropLeft: (draggingCard: Card, droppingCard: Card) => void = (
    draggingCard,
    droppingCard
  ) => {
    dropCard(draggingCard, droppingCard, "left");
    setDraggingOverCard(null);
  };
  const handleDropRight: (draggingCard: Card, droppingCard: Card) => void = (
    draggingCard,
    droppingCard
  ) => {
    dropCard(draggingCard, droppingCard, "right");
    setDraggingOverCard(null);
  };

  useFontSizeUpdater();

  return (
    <div className="dashboard">
      <Grid>
        <Scratchpad />
        {cards.map((card) => (
          <>
            <DroppableSlot
              key={card.id}
              data={card}
              onOverLeft={handleOver}
              onOverRight={handleOver}
              onDropLeft={handleDropLeft}
              onDropRight={handleDropRight}
            >
              <DraggableCard key={card.id} card={card} />
            </DroppableSlot>
          </>
        ))}
        <AddCardControl />
      </Grid>
      {/* <Queue /> */}
      <Statusline />
    </div>
  );
}
