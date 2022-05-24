import { useCallback, useEffect } from "react";

export default function useOnKeyUp(key: string, handler: () => void) {
  const internalHandler = useCallback(() => handler(), [handler]);

  useEffect(() => {
    const _handler: (e: KeyboardEvent) => void = (e) => {
      if (e.key === key) internalHandler();
    };

    window.addEventListener("keyup", _handler);

    return () => window.removeEventListener("keyup", _handler);
  }, [key, internalHandler]);
}
