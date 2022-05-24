import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import usePersistence from "../hooks/usePersistence";

export enum FontSizes {
  Sm = "font-sm",
  Md = "font-md",
  Lg = "font-lg",
  Xl = "font-xl",
}

interface Settings {
  fontSize: FontSizes;
}

interface Context extends Settings {
  setSettings: Dispatch<SetStateAction<Settings>>;
}

const SettingsContext = createContext<Context | null>(null);

export default function SettingsProvider({ children }: PropsWithChildren<{}>) {
  const [settings, setSettings] = useState<Settings>({
    fontSize: FontSizes.Md,
  });

  usePersistence<Settings>({
    key: "settings",
    state: settings,
    onLoadedFromStorage: (state) => setSettings(state as Settings),
  });

  const value = {
    ...settings,
    setSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("Improper use of SettingsProvider");
  return ctx;
}
