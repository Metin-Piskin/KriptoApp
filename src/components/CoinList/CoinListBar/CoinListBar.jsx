import styles from "./CoinListBar.module.css";
import { IoStarOutline } from "react-icons/io5";//Icon Kütüphanesi

const CoinListBar = ({ onSort }) => {
  return (
    <div className={styles.CoinListBarContainer}>
      <button className={styles.CoinListStarBarButtons}>
        <IoStarOutline size={28} />
      </button>
      <button className={styles.CoinListBarButtons}>Image</button>
      <button
        className={styles.CoinListBarButtons}
        style={{ color: "#0070f3", fontWeight: "bold" }}
        onClick={() => onSort("name")}
      >
        Name
      </button>
      <button
        style={{ color: "#0070f3", fontWeight: "bold" }}
        className={styles.CoinListBarButtons}
        onClick={() => onSort("current_price")}
      >
        Current Price
      </button>
      <button
        style={{ color: "#0070f3", fontWeight: "bold" }}
        className={styles.CoinListBarButtons}
        onClick={() => onSort("price_change_24h")}
      >
        Price Change 24h
      </button>
      <button
        style={{ color: "#0070f3", fontWeight: "bold" }}
        className={styles.CoinListBarButtons}
        onClick={() => onSort("total_volume")}
      >
        Total Volume
      </button>
    </div>
  );
};

export default CoinListBar;
