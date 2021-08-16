import styles from "../../styles/Sidebar.module.scss";
import cn from "classnames";
import { Menu } from "./Menu";
import Logo from "../../assets/images/logo.svg";
import { ReactSVG } from "react-svg";
import { Search } from "../Search";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Link from "next/link";

export interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Link href="/">
        <ReactSVG style={{cursor: "pointer"}} src={Logo.src} />
      </Link>
      <Search />
      <Menu />
    </div>
  );
};
	