import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import styles from "../styles/Card.module.scss";
import cn from "classnames";
import { ForwardedRef, forwardRef } from "react";

export interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: "white" | "blue";
  actionButtons?: ReactNode[];
}

export const Card = forwardRef(
  (
    {
      color = "white",
      children,
      actionButtons = [],
      className,
      ...props
    }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div
        className={cn(styles.card, className, {
          [styles.blue]: color == "blue",
        })}
        ref={ref}
        {...props}
      >
        {children}
        {actionButtons.length ? (
          <div className={styles.cardActions}>
            {actionButtons.map((item) => (
              <div className={styles.buttonWrapper}>{item}</div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
