import { Product, TopLevelCategory, TopPageEntity } from "../generated/types";
import styles from "../styles/ProductsTable.module.scss";
import { priceRu } from "./HhData";
import { withLayout } from "./layout/Layout";
import { declOfNum } from "./Product";
import { Tag } from "./Tag";
import { Sort, SortEnum } from "./Sort";
import cn from "classnames";
import { Rating } from "./Rating";

interface Props {
  title: string;
  products: Product[];
  setSortType?: (a: SortEnum) => void;
  sortType?: SortEnum;
  headTableColumns: string[];
  topLevelCategory?: TopLevelCategory;
  productOnClick?: (id: number) => void,
  renderProductFields: (i: number, item: Product) => string | number | undefined
}

const ProductsTable: React.FC<Props> = ({
  title,
  products,
  setSortType,
  sortType,
  headTableColumns,
  productOnClick,
  renderProductFields
}) => {
  return (
    <>
      <div className={styles.head}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <Tag size="m" color="grey">
          {products.length}
        </Tag>
        {setSortType && sortType ? (
          <Sort
            sort={sortType}
            setSort={(a) => {
              setSortType(a);
            }}
          />
        ) : null}
      </div>
      <div className={styles.table}>
        <div className={`${styles.table_head} ${styles.table_row}`}>
          <div
            className={`${styles.table_cel} ${styles.table_middleCell}`}
          ></div>
          {headTableColumns.map((item, idx, arr) => {
            if (idx + 1 === arr.length) {
              return (
                <div
                  key={item}
                  className={`${styles.table_cel} ${styles.table_microCell}`}
                >
                  {item}
                </div>
              );
            }
            return (
              <div
                key={item}
                className={`${styles.table_cel} ${styles.table_tinyCell}`}
              >
                {item}
              </div>
            );
          })}
        </div>
        {products.map((item) => (
          <div onClick={() => {
            if(productOnClick) {
              productOnClick(item.id);
            }
          }} className={`${styles.card} ${styles.table_row}`} key={item.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              className={`${styles.table_cel} ${styles.table_middleCell}`}
            >
              <div className={styles.table_cel_content}>
                <div className={styles.table_title}>{item.title}</div>
              </div>
              <div className={styles.productInfo}>
                <span>
                  {item.characteristics?.length
                    ? item.characteristics[0]?.value
                    : null}
                </span>
                {item?.tags?.map((tag, idx) => (
                  <Tag
                    className={cn({
                      [styles.tagPopular]: idx === 0,
                      [styles.tagCheap]: idx === 1,
                    })}
                    color="ghost"
                    key={tag}
                    size="m"
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
            <div className={`${styles.table_cel} ${styles.table_tinyCell}`}>
                {renderProductFields(1, item)}
            </div>
            <div className={`${styles.table_cel} ${styles.table_tinyCell}`}>
              {renderProductFields(2, item)}
            </div>
            <div className={`${styles.table_cel} ${styles.table_tinyCell}`}>
              {renderProductFields(3, item)}
            </div>
            <div className={`${styles.table_cel} ${styles.table_microCell}`}>
              <div>
                <Rating rating={item.reviewAvg || item.initialRating} />
                {`${item.reviews.length} ${declOfNum(item.reviews.length, [
                  "отзыв",
                  "отзыва",
                  "отзывов",
                ])}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsTable;
