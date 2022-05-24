import "./styles/index.scss";
import Dashboard from "./components/Dashboard";
import CardsProvider from "./context/CardsProvider";
import TodosProvider from "./context/TodosProvider";
import SettingsProvider from "./context/SettingsProvider";

function App() {
  return (
    <SettingsProvider>
      <CardsProvider>
        <TodosProvider>
          <Dashboard />
        </TodosProvider>
      </CardsProvider>
    </SettingsProvider>
  );
}

export default App;
