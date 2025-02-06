import styles from "./Navbar.module.css";

export function Login() {
  return <button className={styles.loginButton}>Login</button>;
}

function Navbar() {
  return (
    <nav>
      <ul className={styles.navbar}>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
