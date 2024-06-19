import React from "react";
import styles from "./DetailNewsCard.module.css";
import Image from "next/image";
const DetailNewsCard = ({ srcImage, Title, Description }) => {
  return (
    <div className={styles.DetailNewsCardContainer}>
      {srcImage ? (
        <Image
          src={srcImage}
          alt="DetailNewsCardImage"
          width={100}
          height={100}
          className={styles.DetailNewsCardImage}
        />
      ) : (
        <></>
      )}
      <div>
        <h2>{Title}</h2>
        <div dangerouslySetInnerHTML={{ __html: Description }} />
      </div>
    </div>
  );
};

export default DetailNewsCard;
