import { gql, useQuery } from "@apollo/client";
import _, { groupBy } from "lodash";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { initializeApollo, addApolloState } from "../../lib/apolloClient";
import {
  Product,
  Product as ProductType,
  TopLevelCategory,
  TopPageEntity,
} from "../../generated/types";
import styles from "../../styles/AllCategories.module.scss";
import { withLayout } from "../../components/layout/Layout";
import { Menu } from "../../context/app.context";
import { useRouter } from "next/router";
import { Card } from "../../components/Card";
import CoursesIcon from "../../assets/images/courses.svg";
import ServicesIcon from "../../assets/images/services.svg";
import BooksIcon from "../../assets/images/books.svg";
import { ReactSVG } from "react-svg";
import { Htag } from "../../components/Htag";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { findTopPageByCategory } from "../../redux/topPageSlice";
import { motion } from "framer-motion";

export const FIND_TOP_PAGES_BY_CATEGORY = gql`
  query findByCategory($findTopPageDto: FindTopPageDto!) {
    findByCategory(findTopPageDto: $findTopPageDto) {
      id
      firstCategory
      secondCategory
      alias
      title
      metaTitle
      metaDescription
      category
      seoText
      tagsTitle
      tags
      createdAt
    }
  }
`;

type TopPageType = Omit<TopPageEntity, "hh" | "advantages">;

const Page: React.FC = (props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const pages = useSelector((state: RootState) => state.topPage.pages);

  const firstCategory = useMemo(() => {
    const { alias } = router.query;
    if (typeof alias === "string") {
      const s: any = alias.charAt(0).toUpperCase() + alias.slice(1);
      const arr = Object.keys(TopLevelCategory)
        .map((key) => (TopLevelCategory as any)[key])
        .filter((value) => typeof value === "string") as string[];
      if (arr.includes(s)) {
        return s;
      }
    }
    return null;
  }, [router.query]);

  useEffect(() => {
    if (firstCategory) {
      console.log(firstCategory);
      dispatch(findTopPageByCategory(firstCategory));
    }
  }, [firstCategory]);

  const headTitle = useMemo(() => {
    let title = "";
    let icon;
    if (router.query.alias) {
      switch (router.query.alias) {
        case TopLevelCategory.Courses.toLowerCase():
          (title = "??????????"), (icon = CoursesIcon);
          break;
        case TopLevelCategory.Services.toLowerCase():
          (title = "??????????????"), (icon = ServicesIcon);
          break;
        case TopLevelCategory.Books.toLowerCase():
          (title = "??????????????"), (icon = BooksIcon);
      }
      return (
        <>
          <div className={styles.icon}>{<ReactSVG src={icon?.src} />}</div>
          <h1 className={styles.pageTitle}>{title}</h1>
        </>
      );
    }
    return null;
  }, [router.query]);

  const groupBySecondCategory = useMemo(() => {
    if (pages.length) {
      return _.groupBy<TopPageType>(pages, "secondCategory");
    }
    return {};
  }, [pages]);

  return (
    <motion.div initial="initial" animate="enter" exit="exit" variants={{ exit: { transition: { opacity: 0 } } }}  className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.head}>{headTitle}</div>
        <div className={styles.cardList}>
          {Object.keys(groupBySecondCategory).map((item) => (
            <Card key={item}>
              <div className={styles.subCategory}>
                <Htag tag="h2">{item}</Htag>
                {groupBySecondCategory[item].map((item) => (
                  <Link key={item.alias} href={`/topPages/${item.alias}`}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </motion.div>
  );
};

export default withLayout(Page);
