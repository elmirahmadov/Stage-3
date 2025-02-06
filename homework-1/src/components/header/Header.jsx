import Navbar, { Login } from "../navbar/Navbar";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      Header
      <Navbar />
      <Login />
    </div>
  );
}

export default Header;
