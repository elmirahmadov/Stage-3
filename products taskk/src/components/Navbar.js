"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">ShopEase</Link>
      </div>
      <div
        className={styles.menuButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
        <li>
          <Link href="/">Ana Sayfa</Link>
        </li>
        <li>
          <Link href="/products">Ürünler</Link>
        </li>
        <li>
          <Link href="/about">Hakkımızda</Link>
        </li>
        <li>
          <Link href="/contact">İletişim</Link>
        </li>
      </ul>
      <div className={styles.cartIcon}>
        <Link href="/cart">
          <span className={styles.cartCount}>{totalItems}</span>
          🛒
        </Link>
      </div>
    </nav>
  );
}
