import { gql, useQuery } from "@apollo/client";
import _, { groupBy } from "lodash";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { initializeApollo, addApolloState } from "../../lib/apolloClient";
import {
  Product as ProductType,
  TopLevelCategory,
  TopPageEntity,
} from "../../generated/types";
import styles from "../../styles/TopPage.module.scss";
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
import {
  currentPageSelector,
  findTopPageByCategory,
  getTopPageByAlias,
  setSortType,
} from "../../redux/topPageSlice";
import { getProduct } from "../../redux/product";
import { Tag } from "../../components/Tag";
import { Sort, SortEnum } from "../../components/Sort";
import cn from "classnames";
import { declOfNum, Product } from "../../components/Product";
import { priceRu } from "../../components/HhData";
import { Rating } from "../../components/Rating";
import ProductsTable from "../../components/ProductsTable";
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
  const currentPage = useSelector((state: RootState) =>
    currentPageSelector(state)
  );
  const sortType = useSelector((state: RootState) => state.topPage.sort);
  useEffect(() => {
    if (router.query.topPage) {
      dispatch(getTopPageByAlias(router.query.topPage as string));
    }
  }, [router.query]);

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
  }, [currentPage]);

  const renderProductFields = (i: number, product: ProductType) : string | number | undefined => {
    const fields: {[x: number]: string | number} = {
      1: '3 ????????????',
      2: product.price,
      3: product.credit,
    };

    return fields[i];
  };

  return (
    <motion.div initial="initial" animate="enter" exit="exit" variants={{ exit: { transition: { opacity: 0 } } }} className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ProductsTable 
          sortType={sortType}
          setSortType={(e) => {
            dispatch(setSortType(e));
          }}
          renderProductFields={renderProductFields}
          headTableColumns={[
            '????????????????????????',
            '????????',
            '??????????????????',
            '??????????????'
          ]}
          products={currentPage?.products || []}
          title={currentPage?.metaTitle || ""}
        />
        <Htag tag="h2">?????????????????? ????????????????</Htag>
        {currentPage?.products.map((item) => (
          <Product product={item} />
        ))}
      </main>
    </motion.div>
  );
};

export default withLayout(Page);
