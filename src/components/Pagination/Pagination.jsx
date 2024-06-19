import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";//Icon Kütüphanesi
import styles from "./Pagination.module.css";
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageLimit = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  const endPage = Math.min(totalPages, startPage + pageLimit - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.PaginationContainer}>
      {currentPage > 1 && (
        <button
          className={styles.PaginationArrowButton}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <IoIosArrowBack />
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={styles.PaginationPageNumButton}
          style={{
            backgroundColor: currentPage === page ? "#0070f3" : "#ffffff",
            color: currentPage === page ? "#ffffff" : "#000000",
          }}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          className={styles.PaginationArrowButton}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
};

export default Pagination;
