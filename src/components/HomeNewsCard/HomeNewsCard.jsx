import React from "react";
import styles from "./HomeNewsCard.module.css";
import Image from "next/image";
const HomeNewsCard = ({srcImage, Title}) => {
  return (
    <div className={styles.HomeNewsCardContainer}>
      <Image src={srcImage} alt="HomeNewsCardImage" width={100} height={100} />
      <h3 className={styles.HomeNewsCardTitle}>{Title}</h3>
    </div>
  );
};

export default HomeNewsCard;
