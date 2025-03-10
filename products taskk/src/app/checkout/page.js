"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { clearCart } from "../store/cartSlice";
import styles from "./Checkout.module.css";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: Kargo Bilgileri, 2: Ödeme Bilgileri, 3: Onay

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Basit validasyon
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateShippingForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "İsim zorunludur";
    if (!formData.lastName.trim()) newErrors.lastName = "Soyisim zorunludur";
    if (!formData.email.trim()) newErrors.email = "E-posta zorunludur";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    if (!formData.phone.trim()) newErrors.phone = "Telefon zorunludur";
    if (!formData.address.trim()) newErrors.address = "Adres zorunludur";
    if (!formData.city.trim()) newErrors.city = "Şehir zorunludur";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Posta kodu zorunludur";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    const newErrors = {};

    if (!formData.cardName.trim())
      newErrors.cardName = "Kart üzerindeki isim zorunludur";
    if (!formData.cardNumber.trim())
      newErrors.cardNumber = "Kart numarası zorunludur";
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, "")))
      newErrors.cardNumber = "Geçerli bir kart numarası giriniz";
    if (!formData.expiryDate.trim())
      newErrors.expiryDate = "Son kullanma tarihi zorunludur";
    else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate))
      newErrors.expiryDate = "GG/YY formatında giriniz";
    if (!formData.cvv.trim()) newErrors.cvv = "CVV zorunludur";
    else if (!/^\d{3,4}$/.test(formData.cvv))
      newErrors.cvv = "Geçerli bir CVV giriniz";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateShippingForm()) {
        setStep(2);
        window.scrollTo(0, 0);
      }
    } else if (step === 2) {
      if (validatePaymentForm()) {
        setStep(3);
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Burada normalde ödeme işlemi API'si çağrılacak
    alert("Siparişiniz başarıyla tamamlandı!");

    // Sepeti temizle
    dispatch(clearCart());

    // Ana sayfaya yönlendir
    router.push("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Sepetiniz boş</h2>
        <p>Ödeme yapabilmek için sepetinize ürün eklemelisiniz.</p>
        <Link href="/" className={styles.continueShoppingButton}>
          Alışverişe Devam Et
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ödeme</h1>

      <div className={styles.checkoutContainer}>
        <div className={styles.steps}>
          <div
            className={`${styles.step} ${step >= 1 ? styles.activeStep : ""}`}
          >
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepTitle}>Kargo Bilgileri</div>
          </div>
          <div className={styles.stepLine}></div>
          <div
            className={`${styles.step} ${step >= 2 ? styles.activeStep : ""}`}
          >
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepTitle}>Ödeme Bilgileri</div>
          </div>
          <div className={styles.stepLine}></div>
          <div
            className={`${styles.step} ${step >= 3 ? styles.activeStep : ""}`}
          >
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepTitle}>Onay</div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className={styles.formStep}>
                  <h2>Kargo Bilgileri</h2>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName">İsim</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? styles.errorInput : ""}
                      />
                      {errors.firstName && (
                        <div className={styles.errorMessage}>
                          {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="lastName">Soyisim</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? styles.errorInput : ""}
                      />
                      {errors.lastName && (
                        <div className={styles.errorMessage}>
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">E-posta</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? styles.errorInput : ""}
                      />
                      {errors.email && (
                        <div className={styles.errorMessage}>
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Telefon</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? styles.errorInput : ""}
                      />
                      {errors.phone && (
                        <div className={styles.errorMessage}>
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="address">Adres</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? styles.errorInput : ""}
                    />
                    {errors.address && (
                      <div className={styles.errorMessage}>
                        {errors.address}
                      </div>
                    )}
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="city">Şehir</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? styles.errorInput : ""}
                      />
                      {errors.city && (
                        <div className={styles.errorMessage}>{errors.city}</div>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="postalCode">Posta Kodu</label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={errors.postalCode ? styles.errorInput : ""}
                      />
                      {errors.postalCode && (
                        <div className={styles.errorMessage}>
                          {errors.postalCode}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <Link href="/cart" className={styles.backButton}>
                      Sepete Dön
                    </Link>
                    <button
                      type="button"
                      className={styles.nextButton}
                      onClick={handleNextStep}
                    >
                      Devam Et
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className={styles.formStep}>
                  <h2>Ödeme Bilgileri</h2>

                  <div className={styles.formGroup}>
                    <label htmlFor="cardName">Kart Üzerindeki İsim</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={errors.cardName ? styles.errorInput : ""}
                    />
                    {errors.cardName && (
                      <div className={styles.errorMessage}>
                        {errors.cardName}
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="cardNumber">Kart Numarası</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className={errors.cardNumber ? styles.errorInput : ""}
                    />
                    {errors.cardNumber && (
                      <div className={styles.errorMessage}>
                        {errors.cardNumber}
                      </div>
                    )}
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="expiryDate">Son Kullanma Tarihi</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="AA/YY"
                        className={errors.expiryDate ? styles.errorInput : ""}
                      />
                      {errors.expiryDate && (
                        <div className={styles.errorMessage}>
                          {errors.expiryDate}
                        </div>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className={errors.cvv ? styles.errorInput : ""}
                      />
                      {errors.cvv && (
                        <div className={styles.errorMessage}>{errors.cvv}</div>
                      )}
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button
                      type="button"
                      className={styles.backButton}
                      onClick={handlePrevStep}
                    >
                      Geri
                    </button>
                    <button
                      type="button"
                      className={styles.nextButton}
                      onClick={handleNextStep}
                    >
                      Devam Et
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className={styles.formStep}>
                  <h2>Sipariş Özeti</h2>

                  <div className={styles.orderSummary}>
                    <div className={styles.summarySection}>
                      <h3>Kargo Bilgileri</h3>
                      <p>
                        <strong>
                          {formData.firstName} {formData.lastName}
                        </strong>
                        <br />
                        {formData.address}
                        <br />
                        {formData.postalCode}, {formData.city}
                        <br />
                        E-posta: {formData.email}
                        <br />
                        Telefon: {formData.phone}
                      </p>
                    </div>

                    <div className={styles.summarySection}>
                      <h3>Ödeme Bilgileri</h3>
                      <p>
                        <strong>{formData.cardName}</strong>
                        <br />
                        Kart Numarası: **** **** ****{" "}
                        {formData.cardNumber.slice(-4)}
                        <br />
                        Son Kullanma Tarihi: {formData.expiryDate}
                      </p>
                    </div>

                    <div className={styles.summarySection}>
                      <h3>Ürünler</h3>
                      <div className={styles.orderItems}>
                        {cartItems.map((item) => (
                          <div key={item.id} className={styles.orderItem}>
                            <div className={styles.orderItemImage}>
                              <Image
                                src={item.image || "/placeholder.jpg"}
                                alt={item.name}
                                width={60}
                                height={60}
                              />
                            </div>
                            <div className={styles.orderItemDetails}>
                              <div className={styles.orderItemName}>
                                {item.name}
                              </div>
                              <div className={styles.orderItemBrand}>
                                {item.brand}
                              </div>
                              <div className={styles.orderItemQuantity}>
                                Adet: {item.quantity}
                              </div>
                            </div>
                            <div className={styles.orderItemPrice}>
                              {(item.price * item.quantity).toFixed(2)} ₺
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button
                      type="button"
                      className={styles.backButton}
                      onClick={handlePrevStep}
                    >
                      Geri
                    </button>
                    <button type="submit" className={styles.confirmButton}>
                      Siparişi Onayla
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className={styles.orderSummaryContainer}>
            <div className={styles.orderSummaryCard}>
              <h2 className={styles.orderSummaryTitle}>Sipariş Özeti</h2>

              <div className={styles.orderSummaryItems}>
                <div className={styles.orderSummaryItem}>
                  <span>Ürünler ({totalItems})</span>
                  <span>{subtotal.toFixed(2)} ₺</span>
                </div>
                <div className={styles.orderSummaryItem}>
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
                <div className={styles.orderSummaryTotal}>
                  <span>Toplam</span>
                  <span>{total.toFixed(2)} ₺</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
