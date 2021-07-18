import styles from '../styles/Review.module.scss';
import UserIcon from '../assets/images/user.svg';
import cn from "classnames";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Rating } from "./Rating";
import { ReactSVG } from "react-svg";
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Review as ReviewType } from '../generated/types';

export interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	review: ReviewType;
}

export const Review = ({
  review,
  className,
  ...props
}: ReviewProps): JSX.Element => {
  const { name, title, description, createdAt, rating } = review;
  return (
    <div className={cn(styles.review, className)} {...props}>
      <ReactSVG src={UserIcon.src} />
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
        <span>{title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(createdAt), "dd MMMM yyyy", { locale: ru })}
      </div>
      <div className={styles.rating}>
        <Rating rating={rating} />
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};
