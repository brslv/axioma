import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { usePrevious } from "react-use";
import { Card as CardType, DragDropTypes } from "../../lib/types";
import Card, { CardProps } from "../Card";

interface Props {
  onDragStart?: (card: CardType) => void;
  onDragEnd?: (card: CardType) => void;
}

export default function DraggableCard({
  onDragStart,
  onDragEnd,
  ...rest
}: Props & CardProps) {
  const [{ isDragging, item }, drag, preview] = useDrag(() => ({
    type: DragDropTypes.Card,
    item: rest.card,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
    }),
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const prevIsDragging = usePrevious(isDragging);
  useEffect(() => {
    if (isDragging && !prevIsDragging) onDragStart && onDragStart(item);
    if (!isDragging && prevIsDragging) onDragEnd && onDragEnd(item);
  }, [isDragging, onDragStart, onDragEnd]);

  return <Card ref={drag} {...rest} />;
}
