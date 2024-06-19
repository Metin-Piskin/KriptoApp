import styles from "./Header.module.css";
const Header = ({ children }) => {
  return <div className={styles.HeaderContainer}>{children}</div>;
};

export default Header;
