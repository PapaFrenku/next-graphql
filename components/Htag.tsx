import styles from "../styles/Htag.module.scss";
import { ReactNode } from "react";

export interface HtagProps {
  tag: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string
}

export const Htag = ({ tag, children, className='' }: HtagProps): JSX.Element => {
  switch (tag) {
    case "h1":
      return <h1 className={`${styles.h1} ${className}`}>{children}</h1>;
    case "h2":
      return <h2 className={`${styles.h2} ${className}`}>{children}</h2>;
    case "h3":
      return <h3 className={`${styles.h3} ${className}`}>{children}</h3>;
    default:
      return <></>;
  }
};
