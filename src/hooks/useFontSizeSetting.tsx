import { useEffect } from "react";
import { useSettings } from "../context/SettingsProvider";

export default function useFontSizeUpdater() {
  const { fontSize } = useSettings();

  useEffect(() => {
    document.body.className = fontSize;
  }, [fontSize]);
}
