import { IoAdd } from "react-icons/io5";
import { useCards } from "../context/CardsProvider";

export default function AddCardControl() {
  const { addCard } = useCards();

  return (
    <button onClick={addCard} className="add-card-btn">
      <IoAdd />
      <span>Add card</span>
    </button>
  );
}
