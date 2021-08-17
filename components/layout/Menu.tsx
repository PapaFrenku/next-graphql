import styles from "../../styles/Menu.module.scss";
import cn from "classnames";
import React, { KeyboardEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CoursesIcon from "../../assets/images/courses.svg";
import ServicesIcon from "../../assets/images/services.svg";
import BooksIcon from "../../assets/images/books.svg";
import { ReactSVG } from "react-svg";
import { groupBy } from "lodash";
import { TopLevelCategory, TopPageEntity } from "../../generated/types";
import ArrowIcon from "../../assets/images/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllTopPages } from "../../redux/topPageSlice";
import { RootState } from "../../redux/store";

type TopPage = Omit<TopPageEntity, 'products'>;

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

const Accordion: React.FC<{
  i: string;
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
      <motion.div
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <div
          className={cn(styles.firstLevel, {
            [styles.firstLevelActive]: i === expanded,
          })}
        >
          <div>
            {icon}
            <span>{title}</span>
          </div>
          <motion.div
            initial={false}
            animate={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <ReactSVG src={ArrowIcon.src} />
          </motion.div>
        </div>
      </motion.div>
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
  const dispatch = useDispatch();
  const menuTopPages = useSelector((state: RootState) => state.topPage.menuTopPages); 
  
  useEffect(() => {
    dispatch(getAllTopPages());
  }, []);

  const menu = groupBy(menuTopPages, "firstCategory");
  
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
                <span
                  className={styles.secondLevel}
                >
                  {m}
                </span>
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
    pages: TopPage[],
    route: string,
    isOpened: boolean
  ) => {
    return pages.map((p) => (
      <li key={p.id}>
        <Link href={`/topPages/${p.alias}`}>
          <a
            tabIndex={isOpened ? 0 : -1}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/topPages/${p.alias}` == router.asPath,
            })}
            aria-current={
              `/topPages/${p.alias}` == router.asPath ? "page" : false
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
