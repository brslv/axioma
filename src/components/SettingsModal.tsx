import { ChangeEventHandler } from "react";
import { IoClose, IoText } from "react-icons/io5";
import { FontSizes, useSettings } from "../context/SettingsProvider";
import useOnKeyUp from "../hooks/useOnKeyUp";

export default function SettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { fontSize, setSettings } = useSettings();

  useOnKeyUp("Escape", onClose);

  const handleFontSizeChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    setSettings((prev) => ({ ...prev, fontSize: value as FontSizes }));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="settings-modal__bg" onClick={onClose} />
      <div className="settings-modal">
        <div className="settings-modal__heading">
          <h2>Settings</h2>
          <button onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <div className="settings-modal__body">
          <div className="settings-modal__item">
            <div className="settings-modal__left">
              <IoText className="settings-modal__icon" />
              <span>Font size</span>
            </div>
            <div className="settings-modal__right">
              <select value={fontSize} onChange={handleFontSizeChange}>
                <option value={FontSizes.Sm}>Small</option>
                <option value={FontSizes.Md}>Medium</option>
                <option value={FontSizes.Lg}>Large</option>
                <option value={FontSizes.Xl}>Extra Large</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
