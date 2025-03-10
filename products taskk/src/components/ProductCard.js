"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { addToCart } from "../app/store/cartSlice";
import styles from "../app/styles/ProductCard.module.css";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));

    // Animasyon efekti için DOM elementi oluştur
    const element = document.createElement("div");
    element.className = styles.addedAnimation;
    element.innerText = "✓";
    document.body.appendChild(element);

    setTimeout(() => {
      element.remove();
    }, 1000);
  };

  return (
    <div
      className={`${styles.card} ${isHovered ? styles.hovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <Image
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          width={200}
          height={200}
          className={styles.productImage}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.productName}>{product.name}</h3>
        <div className={styles.brand}>{product.brand}</div>
        <div className={styles.priceRating}>
          <span className={styles.price}>{product.price} ₺</span>
          <div className={styles.rating}>
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={
                  index < Math.floor(product.rating)
                    ? styles.filledStar
                    : styles.emptyStar
                }
              >
                ★
              </span>
            ))}
            <span className={styles.ratingValue}>({product.rating})</span>
          </div>
        </div>
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          Sepete Ekle
        </button>
      </div>
    </div>
  );
}
