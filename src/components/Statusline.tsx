import { useEffect, useMemo, useState } from "react";
import { IoCheckbox, IoSettingsSharp, IoTime } from "react-icons/io5";
import { useTodos } from "../context/TodosProvider";
import useDisclosure from "../hooks/useDisclosure";
import SettingsModal from "./SettingsModal";

function getTime() {
  const d = new Date();
  const s = d.getSeconds();
  const m = d.getMinutes();
  const h = d.getHours();
  const hh = "0" + h;
  const mm = "0" + m;
  const ss = "0" + s;

  return (
    hh.substring(hh.length - 2) +
    ":" +
    mm.substring(mm.length - 2) +
    ":" +
    ss.substring(ss.length - 2)
  );
}

export default function Statusline() {
  const { todos } = useTodos();
  const allCount = todos.length;
  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos]
  );
  const completedCount = completedTodos.length;
  const pendingTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );
  const pendingCount = pendingTodos.length;

  const [time, setTime] = useState("");
  useEffect(() => {
    setInterval(() => setTime(getTime()), 1000);
  }, [time]);

  const {
    value: isSettingsOpen,
    off: closeSettings,
    toggle: toggleSettings,
  } = useDisclosure();

  return (
    <div className="statusline">
      <div className="side">
        <div className="status" title="Completed/Pending/All todos">
          <IoCheckbox />
          <span>
            {completedCount}/{pendingCount}({allCount})
          </span>
        </div>
        <div className="status" title="Current time">
          <IoTime />
          <time>{time}</time>
        </div>
      </div>
      <div className="side">
        <button title="Settings" onClick={toggleSettings}>
          <IoSettingsSharp />
        </button>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
    </div>
  );
}
