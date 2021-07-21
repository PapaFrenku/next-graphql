import { TopPageAdvantage } from "../generated/types";
import styles from "../styles/Advantages.module.scss";
import React from "react";
import CheckIcon from "../assets/images/check.svg";
import { ReactSVG } from 'react-svg';

export interface AdvantagesProps {
  advantages: TopPageAdvantage[];
}

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <>
      {advantages.map((a) => (
        <div key={a.title} className={styles.advantage}>
         <ReactSVG src={CheckIcon.src} />
          <div className={styles.title}>{a.title}</div>
          <hr className={styles.vline} />
          <div>{a.description}</div>
        </div>
      ))}
    </>
  );
};
