import { createContext, PropsWithChildren, useContext, useState } from "react";
import usePersistence from "../hooks/usePersistence";

interface Context {
  text: string;
  setText: (text: string) => void;
}

const ScratchpadContext = createContext<Context | null>(null);

export default function ScratchpadProvider({
  children,
}: PropsWithChildren<{}>) {
  const [text, setText] = useState<string>("");

  usePersistence({
    key: "scratchpad",
    state: text,
    onLoadedFromStorage: (value) => setText(value),
  });

  const value: Context = {
    text,
    setText,
  };

  return (
    <ScratchpadContext.Provider value={value}>
      {children}
    </ScratchpadContext.Provider>
  );
}

export function useScratchpad() {
  const ctx = useContext(ScratchpadContext);
  if (!ctx) throw new Error("Improper use of ScratchpadContext");
  return ctx;
}
