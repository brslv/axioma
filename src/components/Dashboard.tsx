import { useCards } from "../context/CardsProvider";
import useFontSizeUpdater from "../hooks/useFontSizeSetting";
import AddCardControl from "./AddCardControl";
import Card from "./Card";
import Grid from "./Grid";
import Statusline from "./Statusline";

export default function Dashboard() {
  const { cards } = useCards();

  useFontSizeUpdater();

  return (
    <div className="dashboard">
      <Grid>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
        <AddCardControl />
      </Grid>
      {/* <Queue /> */}
      <Statusline />
    </div>
  );
}
