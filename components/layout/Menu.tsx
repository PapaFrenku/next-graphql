import styles from "../../styles/Menu.module.scss";
import cn from "classnames";
import React, { useContext, KeyboardEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
// import { TopLevelCategory, TopPageEntity } from "../../generated/types";
import CoursesIcon from "../../assets/images/courses.svg";
import ServicesIcon from "../../assets/images/services.svg";
import BooksIcon from "../../assets/images/books.svg";
import { ReactSVG } from "react-svg";
import { gql, useQuery } from "@apollo/client";
import { groupBy } from "lodash";
import { AppContext } from "../../context/app.context";
import { useApollo } from "../../lib/apolloClient";
import { TopPageEntity, TopLevelCategory } from "../../generated/types";
import ArrowIcon from "../../assets/images/up.svg";
import { Button } from "../Button";

export const firstLevelMenu = [
  {
    route: "courses",
    name: "Курсы",
    icon: <ReactSVG src={CoursesIcon.src} />,
    id: TopLevelCategory.Courses,
  },
  {
    route: "services",
    name: "Сервисы",
    icon: <ReactSVG src={ServicesIcon.src} />,
    id: TopLevelCategory.Services,
  },
  {
    route: "books",
    name: "Книги",
    icon: <ReactSVG src={BooksIcon.src} />,
    id: TopLevelCategory.Books,
  },
];

export interface PageItem {
  alias: string;
  title: string;
  _id: string;
  category: string;
}

export const ALL_TOP_PAGES = gql`
  query getAllTopPages {
    getAllTopPages {
      id
      firstCategory
      secondCategory
      alias
      title
      category
    }
  }
`;

const Accordion: React.FC<{
  i: any;
  expanded: any;
  setExpanded: (n: any) => void;
  title: string;
  icon?: JSX.Element;
  content: any;
}> = ({ i, expanded, setExpanded, title, icon, content }) => {
  const isOpen = i === expanded;

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <>
      <motion.header
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <div
          className={cn(styles.firstLevel, {
            [styles.firstLevelActive]: true,
          })}
        >
          <div>
            {icon}
            <Link href={`/allCategories/${i}`}>{title}</Link>
          </div>
          <motion.div
            initial={false}
            animate={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <ReactSVG src={ArrowIcon.src} />
          </motion.div>
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.3 }}
            >
              {content}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export const Menu: React.FC<{ menu?: any }> = (props): JSX.Element => {
  const { loading, error, data } = useQuery<{
    getAllTopPages: any[];
  }>(ALL_TOP_PAGES, {
    notifyOnNetworkStatusChange: true,
  });
  const allTopPages = data?.getAllTopPages || [];
  const menu = groupBy(allTopPages, "firstCategory");

  const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>();
  const [firstСategories, setFirstСategories] = useState<TopLevelCategory[]>([
    TopLevelCategory.Courses,
  ]);
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
    },
    hidden: { marginBottom: 0 },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
  };

  //   const openSecondLevel = (secondCategory: string) => {
  //     setMenu &&
  //       setMenu(
  //         menu.map((m) => {
  //           if (m._id.secondCategory == secondCategory) {
  //             setAnnounce(m.isOpened ? "closed" : "opened");
  //             m.isOpened = !m.isOpened;
  //           }
  //           return m;
  //         })
  //       );
  //   };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code == "Space" || key.code == "Enter") {
      key.preventDefault();
      //   openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return firstLevelMenu.map((item) => (
      <Accordion
        title={item.name}
        i={item.id}
        expanded={firstСategories}
        setExpanded={setFirstСategories}
        icon={item.icon}
        content={buildSecondLevel(item.id)}
      />
    ));
  };

  const buildSecondLevel = (firstCategory: TopLevelCategory) => {
    const arr = menu[firstCategory] || [];
    const bySecondCategory = groupBy(arr, "secondCategory");
    const secondCategories = Object.keys(bySecondCategory);
    if (!secondCategories.length) return null;
    return (
      <>
        <ul className={styles.secondBlock}>
          {secondCategories.map((m) => {
            return (
              <li key={m}>
                <button
                  onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m)}
                  className={styles.secondLevel}
                  onClick={() => {
                    console.log("a");
                  }}
                  // aria-expanded={m.isOpened}
                >
                  {m}
                </button>
                <ul className={styles.secondLevelBlock}>
                  {buildThirdLevel(
                    bySecondCategory[m],
                    firstCategory.toLowerCase(),
                    true
                  )}
                </ul>
              </li>
            );
          })}
          <li className={`${styles.secondLevel} ${styles.showMoreBtn}`}>
            <Link href={`/allCategories/${firstCategory.toLowerCase()}`}>
              Показать ещё...
            </Link>
          </li>
        </ul>
      </>
    );
  };

  const buildThirdLevel = (
    pages: TopPageEntity[],
    route: string,
    isOpened: boolean
  ) => {
    return pages.map((p) => (
      <li key={p.id}>
        <Link href={`/${route}/${p.alias}`}>
          <a
            tabIndex={isOpened ? 0 : -1}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${p.alias}` == router.asPath,
            })}
            aria-current={
              `/${route}/${p.alias}` == router.asPath ? "page" : false
            }
          >
            {p.category}
          </a>
        </Link>
      </li>
    ));
  };

  return (
    <nav className={styles.menu} role="navigation">
      {buildFirstLevel()}
    </nav>
  );
};
