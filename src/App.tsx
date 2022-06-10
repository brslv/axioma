import "./styles/index.scss";
import Dashboard from "./components/Dashboard";
import CardsProvider from "./context/CardsProvider";
import TodosProvider from "./context/TodosProvider";
import SettingsProvider from "./context/SettingsProvider";
import ScratchpadProvider from "./context/ScratchpadProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { CustomDragLayer } from "./components/dnd/CustomDragLayer";

function App() {
  return (
    <SettingsProvider>
      <CardsProvider>
        <TodosProvider>
          <DndProvider backend={HTML5Backend}>
            <ScratchpadProvider>
              <CustomDragLayer snapToGrid={false} />
              <Dashboard />
            </ScratchpadProvider>
          </DndProvider>
        </TodosProvider>
      </CardsProvider>
    </SettingsProvider>
  );
}

export default App;
