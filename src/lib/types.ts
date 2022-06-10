export enum CardAccentColor {
  None = "none",
  Red = "red",
  Orange = "orange",
  Blue = "blue",
  Yellow = "yellow",
  Green = "green",
  Black = "black",
  Pink = "pink",
  Gray = "gray",
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  cardId: Card["id"];
}

export interface Card {
  id: string;
  title: string;
  accentColor?: CardAccentColor;
}

export enum DragDropTypes {
  Card = "Card",
  TodoItem = "TodoItem",
}
