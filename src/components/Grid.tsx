import { PropsWithChildren } from "react";

export default function Grid({ children }: PropsWithChildren<{}>) {
  return <div className="grid">{children}</div>;
}
