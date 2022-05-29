import { FocusEventHandler, useEffect, useState } from "react";
import { useScratchpad } from "../context/ScratchpadProvider";
import { useDebounce } from "react-use";

export default function Scratchpad() {
  const { text, setText } = useScratchpad();
  const [internalValue, setInternalValue] = useState<string>("");

  useEffect(() => {
    setInternalValue(text);
  }, [text]);

  useDebounce(
    () => {
      setText(internalValue);
    },
    200,
    [internalValue]
  );

  return (
    <div className="scratchpad">
      <div className="scratchpad__heading">
        <h2 className="scratchpad__title">✍️ Scratchpad</h2>
      </div>
      <textarea
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
      />
    </div>
  );
}
