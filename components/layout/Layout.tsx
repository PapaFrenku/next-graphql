import styles from "../../styles/Layout.module.scss";
import cn from "classnames";
import { Header } from "./Header";
import React, {
  FunctionComponent,
  useState,
  KeyboardEvent,
  useRef,
} from "react";
import { Sidebar } from "./Sidebar";
// import { Footer } from './Footer';
import { AppContextProvider, IAppContext } from "../../context/app.context";
import { Up } from "../Up";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.1,
};

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 1
  },
};

const pageStyle = {
  position: "absolute",
};

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] =
    useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code == "Space" || key.code == "Enter") {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkDisplayed(false);
  };

  return (
    <motion.div
      // style={{ position: "absolute" }}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.wrapper}
    >
      <a
        onFocus={() => setIsSkipLinkDisplayed(true)}
        tabIndex={0}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed,
        })}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0} role="main">
        {children}
      </main>
      {/* <Footer className={styles.footer} /> */}
      <Up />
    </motion.div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider
        menu={props.menu}
        firstСategories={props.firstСategories}
      >
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
