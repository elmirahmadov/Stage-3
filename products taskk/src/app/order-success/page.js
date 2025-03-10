"use client";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./OrderSuccess.module.css";

export default function OrderSuccessPage() {
  // Sipariş oluşturulduğunda animasyonları başlat
  useEffect(() => {
    const timer = setTimeout(() => {
      const successIcon = document.querySelector(`.${styles.successIcon}`);
      if (successIcon) {
        successIcon.classList.add(styles.animate);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Sipariş numarası oluştur
  const orderNumber = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");

  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <div className={styles.successIconContainer}>
          <div className={styles.successIcon}>✓</div>
        </div>

        <h1 className={styles.title}>Siparişiniz Alındı!</h1>

        <p className={styles.message}>
          Teşekkür ederiz! Siparişiniz başarıyla oluşturuldu ve işleme alındı.
        </p>

        <div className={styles.orderInfo}>
          <div className={styles.orderInfoItem}>
            <span className={styles.orderInfoLabel}>Sipariş Numarası:</span>
            <span className={styles.orderInfoValue}>{orderNumber}</span>
          </div>

          <div className={styles.orderInfoItem}>
            <span className={styles.orderInfoLabel}>Sipariş Tarihi:</span>
            <span className={styles.orderInfoValue}>
              {new Date().toLocaleDateString("tr-TR")}
            </span>
          </div>
        </div>

        <p className={styles.instructions}>
          Siparişinizin bir kopyası e-posta adresinize gönderildi. Siparişinizin
          durumunu hesabınızdan takip edebilirsiniz.
        </p>

        <div className={styles.actions}>
          <Link href="/account/orders" className={styles.orderDetailsButton}>
            Sipariş Detayları
          </Link>

          <Link href="/" className={styles.continueShoppingButton}>
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    </div>
  );
}
