import "./styles/index.scss";
import Dashboard from "./components/Dashboard";
import CardsProvider from "./context/CardsProvider";
import TodosProvider from "./context/TodosProvider";
import SettingsProvider from "./context/SettingsProvider";
import ScratchpadProvider from "./context/ScratchpadProvider";

function App() {
  return (
    <SettingsProvider>
      <CardsProvider>
        <TodosProvider>
          <ScratchpadProvider>
            <Dashboard />
          </ScratchpadProvider>
        </TodosProvider>
      </CardsProvider>
    </SettingsProvider>
  );
}

export default App;
