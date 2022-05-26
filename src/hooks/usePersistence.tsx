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

  const getLocalStorageState = (key: string) => {
    const state = localStorage.getItem(key);

    try {
      return state ? JSON.parse(state) : null;
    } catch (e: unknown) {
      return null;
    }
  };

  const removeLocalStorageState = (key: string) => {
    localStorage.removeItem(key);
  };

  const getAndRemoveLocalStorageState = (key: string) => {
    const stateFromLocalStorage = getLocalStorageState(key);
    removeLocalStorageState(key);
    return stateFromLocalStorage;
  };

  const load = async () => {
    const stateFromStorage = await chrome.storage.sync.get(key);

    // As we have moved from localStorage to chrom.storage api,
    // it's crucial not to lose the data, stored in localStorage so far.
    // That's why we do the sync here - get the data from local storage
    // and flush the localStorage[key].
    const stateFromLocalStorage = getAndRemoveLocalStorageState(key);

    const data = stateFromLocalStorage
      ? stateFromLocalStorage
      : stateFromStorage[key];

    if (data) onLoadedFromStorage(data);

    setIsLoaded(true);
  };

  const persist = async (key: string, state: T) => {
    await chrome.storage.sync.set({ [key]: state });
  };

  useEffect(() => {
    if (!isLoaded) load();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) persist(key, state);
  }, [key, state]);
}
