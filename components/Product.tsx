import styles from "../styles/Product.module.scss";
import cn from "classnames";
import { Card } from "./Card";
import { Rating } from "./Rating";
import { Tag } from "./Tag";
import { Button } from "./Button";
import { Divider } from "./Divider";
import Image from "next/image";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import { Review } from "./Review";
import { ReviewForm } from "./ReviewForm";
import { motion } from "framer-motion";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Product as ProductType } from "../generated/types";

export interface ProductProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductType;
}

export const declOfNum = (
  number: number,
  titles: [string, string, string]
): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

export const priceRu = (price: number): string =>
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .concat(" ₽");

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);

      const variants = {
        visible: { opacity: 1, height: "auto" },
        hidden: { opacity: 0, height: 0 },
      };

      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        reviewRef.current?.focus();
      };

      return (
        <div className={className} {...props} ref={ref}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              {product.image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`}
                  alt={product.title}
                  width={70}
                  height={70}
                />
              )}
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              <span>
                <span className="visualyHidden">цена</span>
                {priceRu(product.price)}
              </span>
              {product.oldPrice && (
                <Tag className={styles.oldPrice} color="green">
                  <span className="visualyHidden">скидка</span>
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              <span className="visualyHidden">кредит</span>
              {priceRu(product.credit)}/
              <span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}>
              <span className="visualyHidden">
                {"рейтинг" + (product.reviewAvg ?? product.initialRating)}
              </span>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((c: any) => (
                <Tag key={c} className={styles.category} color="ghost">
                  {c}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle} aria-hidden={true}>
              цена
            </div>
            <div className={styles.creditTitle} aria-hidden={true}>
              кредит
            </div>
            <div className={styles.rateTitle}>
              <a href="#ref" onClick={scrollToReview}>
                {product.reviews.length}{" "}
                {declOfNum(product.reviews.length, [
                  "отзыв",
                  "отзыва",
                  "отзывов",
                ])}
              </a>
            </div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
              {product.characteristics &&
                product.characteristics.map((c: any) => (
                  <div className={styles.characteristics} key={c.name}>
                    <span className={styles.characteristicsName}>{c.name}</span>
                    <span className={styles.characteristicsDots}></span>
                    <span className={styles.characteristicsValue}>
                      {c.value}
                    </span>
                  </div>
                ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disAdvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{product.disAdvantages}</div>
                </div>
              )}
            </div>
            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button appearance="primary">Узнать подробнее</Button>
              <Button
                appearance="ghost"
                arrow={isReviewOpened ? "down" : "right"}
                className={styles.reviewButton}
                onClick={() => setIsReviewOpened(!isReviewOpened)}
                aria-expanded={isReviewOpened}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            animate={isReviewOpened ? "visible" : "hidden"}
            variants={variants}
            initial="hidden"
          >
            <Card
              color="blue"
              className={styles.reviews}
              ref={reviewRef}
              tabIndex={isReviewOpened ? 0 : -1}
            >
              {product.reviews.map((r: any) => (
                <div key={r._id}>
                  <Review review={r} />
                  <Divider />
                </div>
              ))}
              <ReviewForm productId={product.id} isOpened={isReviewOpened} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
