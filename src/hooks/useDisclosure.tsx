import { useCallback, useState } from "react";

export default function useDisclosure(
  { initialValue = false }: { initialValue?: boolean } = { initialValue: false }
) {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const on = useCallback(() => {
    setValue(true);
  }, []);

  const off = useCallback(() => {
    setValue(false);
  }, []);

  return {
    value,
    on,
    off,
    toggle,
  };
}
