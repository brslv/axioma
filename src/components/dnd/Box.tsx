import type { CSSProperties, FC } from "react";
import { memo } from "react";

const styles: CSSProperties = {
  border: "1px dashed gray",
  padding: "2.5rem 3rem",
  cursor: "move",
};

export interface BoxProps {
  title: string;
  preview?: boolean;
}

export const Box: FC<BoxProps> = memo(function Box({ title, preview }) {
  const backgroundColor = "white";
  return (
    <div
      style={{
        ...styles,
        backgroundColor,
        boxShadow: `0 0 4px 2px rgba(0,0,0,0.1)`,
      }}
      role={preview ? "BoxPreview" : "Box"}
    >
      {title}
    </div>
  );
});
