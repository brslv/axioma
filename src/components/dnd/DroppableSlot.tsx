import { PropsWithChildren, useEffect } from "react";
import { useDrop } from "react-dnd";
import { DragDropTypes } from "../../lib/types";

interface DroppableSlotProps<T> {
  data: T;
  onOver?: (data: T) => void;
  onOverLeft?: (data: T) => void;
  onOverRight?: (data: T) => void;
  onDrop?: (draggingCard: T, data: T) => void;
  onDropLeft?: (draggingCard: T, data: T) => void;
  onDropRight?: (draggingCard: T, data: T) => void;
}

export default function DroppableSlot<T>({
  children,
  data,
  onOver,
  onOverLeft,
  onOverRight,
  onDrop,
  onDropLeft,
  onDropRight,
}: PropsWithChildren<DroppableSlotProps<T>>) {
  const [{ isOver }, drop] = useDrop<T, unknown, { isOver: boolean }>(() => ({
    accept: DragDropTypes.Card,
    drop: (draggingCard) => {
      onDrop && onDrop(draggingCard, data);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [{ isOverLeft }, dropLeft] = useDrop<
    T,
    unknown,
    { isOverLeft: boolean }
  >(() => ({
    accept: DragDropTypes.Card,
    drop: (draggingCard) => {
      onDropLeft && onDropLeft(draggingCard, data);
    },
    collect: (monitor) => ({
      isOverLeft: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [{ isOverRight }, dropRight] = useDrop<
    T,
    unknown,
    { isOverRight: boolean }
  >(() => ({
    accept: DragDropTypes.Card,
    drop: (draggingCard) => {
      onDropRight && onDropRight(draggingCard, data);
    },
    collect: (monitor) => ({
      isOverRight: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    if (isOver && typeof onOver === "function") {
      onOver(data);
    }
    if (isOverLeft && typeof onOverLeft === "function") {
      onOverLeft(data);
    }
    if (isOverRight && typeof onOverRight === "function") {
      onOverRight(data);
    }
  }, [isOver, onOver, isOverLeft, onOverLeft, isOverRight, onOverRight]);

  return (
    <div ref={drop} style={{ position: "relative" }}>
      {children}

      {isOver ? (
        <>
          <div
            ref={dropLeft}
            style={{
              opacity: 0,
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              background: isOverLeft ? "green" : "yellow",
            }}
          />
          {isOverLeft ? (
            <div className="droppable-slot__placeholder droppable-slot__placeholder-left" />
          ) : null}
        </>
      ) : null}
      {isOver ? (
        <>
          <div
            ref={dropRight}
            style={{
              opacity: 0,
              position: "absolute",
              top: 0,
              left: "50%",
              width: "50%",
              height: "100%",
              background: isOverRight ? "green" : "blue",
            }}
          />
          {isOverRight ? (
            <div className="droppable-slot__placeholder droppable-slot__placeholder-right" />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
