"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/productSlice";
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";
import styles from "./page.module.css";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hoş Geldiniz</h1>
        <p className={styles.subtitle}>
          En kaliteli ürünler en uygun fiyatlarla
        </p>
        <ProductList />
      </div>
      <Cart />
    </div>
  );
}
