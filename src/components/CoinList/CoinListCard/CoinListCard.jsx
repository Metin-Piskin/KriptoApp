import Image from "next/image";
import styles from "./CoinListCard.module.css";
import { IoStarOutline, IoStar } from "react-icons/io5";//Icon Kütüphanesi
import Link from "next/link";

const CoinListCard = ({
  onClick,
  image,
  name,
  current_price,
  price_change_24h,
  total_volume,
  id,
  isFavorite,
}) => {
  const handleButtonClick = (event) => {
    event.preventDefault(); 
    event.stopPropagation();
    onClick(); 
  };

  return (
    <Link href={`/detail/${id}`} className={styles.CoinListContainer}>
      <button className={styles.CoinListStarButton} onClick={handleButtonClick}>
        {isFavorite ? <IoStar size={30} color="#0070f3"/> : <IoStarOutline size={30} />}
      </button>
      <div className={styles.CoinListImage}>
        <Image src={image} alt="CoinImage" width={100} height={100} />
      </div>
      <h3 className={styles.CoinListNameText}>{name}</h3>
      <p className={styles.CoinListPrice}>${current_price}</p>
      <p className={styles.CoinListDayPrice}>${price_change_24h}</p>
      <p className={styles.CoinListVolume}>${total_volume}</p>
    </Link>
  );
};

export default CoinListCard;
