"use client";

import React from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../app/store/cartSlice";
import styles from "../app/styles/CartItem.module.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // İmaj URL kontrolü
  const imageUrl = () => {
    if (!item) return "/placeholder.jpg";
    return item.image || item.thumbnail || "/placeholder.jpg";
  };

  // item değişkeni undefined ise boş div döndür
  if (!item) {
    return <div className={styles.cartItem}>Ürün bulunamadı</div>;
  }

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl()}
          alt={item.name || "Ürün"}
          width={60}
          height={60}
          className={styles.productImage}
          unoptimized={true}
        />
      </div>
      <div className={styles.details}>
        <h4 className={styles.productName}>{item.name || "İsimsiz Ürün"}</h4>
        <div className={styles.brand}>
          {item.brand || "Marka Belirtilmemiş"}
        </div>
        <div className={styles.price}>{(item.price || 0).toFixed(2)} ₺</div>
      </div>
      <div className={styles.quantityControls}>
        <button
          className={styles.quantityButton}
          onClick={() => dispatch(decrementQuantity(item.id))}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button
          className={styles.quantityButton}
          onClick={() => dispatch(incrementQuantity(item.id))}
        >
          +
        </button>
      </div>
      <div className={styles.totalPrice}>
        {((item.price || 0) * (item.quantity || 1)).toFixed(2)} ₺
      </div>
      <button
        className={styles.removeButton}
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        ×
      </button>
    </div>
  );
};

export default CartItem;
