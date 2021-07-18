import styles from "../styles/Divider.module.scss";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DividerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {}

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
  return <hr className={cn(className, styles.hr)} {...props} />;
};
