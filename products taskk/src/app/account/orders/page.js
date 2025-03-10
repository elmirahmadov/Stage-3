"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Orders.module.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gerçek uygulamada, burada API'den siparişleri çekersiniz
    // Şimdilik örnek siparişler oluşturalım
    setTimeout(() => {
      const mockOrders = [
        {
          id: "123456",
          date: "10 Mart 2025",
          total: 349.97,
          status: "Tamamlandı",
          items: [
            { id: 1, name: "Calvin Klein CK One", quantity: 1, price: 49.99 },
            {
              id: 3,
              name: "Chanel Coco Noir Eau De Parfum",
              quantity: 1,
              price: 129.99,
            },
            { id: 4, name: "J'adore", quantity: 1, price: 89.99 },
            {
              id: 5,
              name: "Eyeshadow Palette with Mirror",
              quantity: 4,
              price: 19.99,
            },
          ],
        },
        {
          id: "123457",
          date: "5 Mart 2025",
          total: 129.97,
          status: "Kargoda",
          items: [
            {
              id: 5,
              name: "Eyeshadow Palette with Mirror",
              quantity: 1,
              price: 19.99,
            },
            { id: 6, name: "Powder Canister", quantity: 2, price: 14.99 },
            { id: 1, name: "Oje Kırmızı", quantity: 2, price: 8.99 },
            { id: 2, name: "Calvin Klein CK One", quantity: 1, price: 49.99 },
          ],
        },
        {
          id: "123458",
          date: "28 Şubat 2025",
          total: 534.95,
          status: "Tamamlandı",
          items: [
            {
              id: 3,
              name: "Chanel Coco Noir Eau De Parfum",
              quantity: 2,
              price: 129.99,
            },
            { id: 4, name: "J'adore", quantity: 3, price: 89.99 },
          ],
        },
      ];

      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Siparişlerim</h1>
        <div className={styles.loading}>Siparişleriniz yükleniyor...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Siparişlerim</h1>
        <div className={styles.emptyOrders}>
          <div className={styles.emptyOrdersIcon}>📦</div>
          <h2>Henüz sipariş vermediniz</h2>
          <p>Şu anda görüntülenecek bir siparişiniz bulunmuyor.</p>
          <Link href="/" className={styles.shopNowButton}>
            Alışverişe Başla
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Siparişlerim</h1>

      <div className={styles.orderList}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div className={styles.orderInfo}>
                <div className={styles.orderNumber}>Sipariş #{order.id}</div>
                <div className={styles.orderDate}>{order.date}</div>
              </div>
              <div
                className={styles.orderStatus}
                data-status={order.status.toLowerCase()}
              >
                {order.status}
              </div>
            </div>

            <div className={styles.orderItems}>
              {order.items.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <div className={styles.itemName}>
                    {item.name}{" "}
                    <span className={styles.itemQuantity}>
                      x{item.quantity}
                    </span>
                  </div>
                  <div className={styles.itemPrice}>
                    {(item.price * item.quantity).toFixed(2)} ₺
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.orderFooter}>
              <div className={styles.orderTotal}>
                <span>Toplam:</span>
                <span>{order.total.toFixed(2)} ₺</span>
              </div>

              <Link
                href={`/account/orders/${order.id}`}
                className={styles.viewDetailsButton}
              >
                Detayları Görüntüle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
