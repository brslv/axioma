import { useEffect, useState } from "react";

export default function usePersistence<T>({
  key,
  onLoadedFromStorage,
  state,
}: {
  key: string;
  onLoadedFromStorage: (state: T) => void;
  state: T;
}) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded) {
      const stateFromStorage = localStorage.getItem(key);

      if (stateFromStorage)
        onLoadedFromStorage(JSON.parse(stateFromStorage) as T);

      setIsLoaded(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) localStorage.setItem(key, JSON.stringify(state));
  }, [state]);
}
