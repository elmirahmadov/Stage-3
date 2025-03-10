"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import CartItem from "../../components/CardItem";
import styles from "./Cart.module.css";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 14.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Sepetim</h1>

        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>🛒</div>
          <h2>Sepetiniz boş</h2>
          <p>Sepetinize henüz ürün eklemediniz. Hemen alışverişe başlayın!</p>
          <Link href="/" className={styles.continueShoppingButton}>
            Alışverişe Başla
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sepetim ({totalItems} Ürün)</h1>

      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          <div className={styles.cartItemsHeader}>
            <div className={styles.productColumn}>Ürün</div>
            <div className={styles.priceColumn}>Fiyat</div>
            <div className={styles.quantityColumn}>Adet</div>
            <div className={styles.totalColumn}>Toplam</div>
            <div className={styles.actionColumn}></div>
          </div>

          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} showDetails={true} />
          ))}

          <div className={styles.cartActions}>
            <Link href="/" className={styles.continueShoppingButton}>
              Alışverişe Devam Et
            </Link>
          </div>
        </div>

        <div className={styles.cartSummary}>
          <h2 className={styles.summaryTitle}>Sipariş Özeti</h2>

          <div className={styles.summaryDetails}>
            <div className={styles.summaryItem}>
              <span>Ara Toplam</span>
              <span>{subtotal.toFixed(2)} ₺</span>
            </div>

            <div className={styles.summaryItem}>
              <span>Kargo</span>
              <span>
                {shipping === 0 ? "Ücretsiz" : `${shipping.toFixed(2)} ₺`}
              </span>
            </div>

            {shipping > 0 && (
              <div className={styles.freeShippingInfo}>
                200 TL üzeri alışverişlerde kargo ücretsiz!
              </div>
            )}

            <div className={styles.summaryTotal}>
              <span>Toplam</span>
              <span>{total.toFixed(2)} ₺</span>
            </div>

            <div className={styles.discountCode}>
              <input
                type="text"
                placeholder="İndirim Kodu"
                className={styles.discountInput}
              />
              <button className={styles.discountButton}>Uygula</button>
            </div>

            <Link href="/checkout" className={styles.checkoutButton}>
              Ödeme Adımına Geç
            </Link>

            <div className={styles.securePayment}>
              <div className={styles.secureIcon}>🔒</div>
              <span>Güvenli Ödeme</span>
            </div>

            <div className={styles.paymentMethods}>
              <div className={styles.paymentMethodTitle}>
                Ödeme Seçenekleri:
              </div>
              <div className={styles.paymentMethodIcons}>
                <span className={styles.paymentIcon}>💳</span>
                <span className={styles.paymentIcon}>🏦</span>
                <span className={styles.paymentIcon}>📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
