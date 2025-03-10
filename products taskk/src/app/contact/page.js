"use client";

import React from "react";
import styles from "./Contact.module.css";

const IletisimPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contactWrapper}>
        <section className={styles.contactHeader}>
          <h1>İletişim Bilgileri</h1>
          <p>
            Size ulaşmak için aşağıdaki iletişim kanallarını kullanabilirsiniz.
          </p>
        </section>

        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>📍</div>
            <h2>Ofis Adresi</h2>
            <p>
              İstanbul Ofisi
              <br />
              Barbaros Bulvarı No:123
              <br />
              Beşiktaş / İstanbul
            </p>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>☎️</div>
            <h2>Telefon</h2>
            <p>
              Müşteri Hizmetleri: +90 (212) 123 45 67
              <br />
              Destek Hattı: +90 (212) 987 65 43
            </p>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>✉️</div>
            <h2>E-posta</h2>
            <p>
              Genel: info@sirketsitesi.com
              <br />
              Destek: destek@sirketsitesi.com
              <br />
              Satış: satis@sirketsitesi.com
            </p>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>⏰</div>
            <h2>Çalışma Saatleri</h2>
            <p>
              Pazartesi - Cuma: 09:00 - 18:00
              <br />
              Cumartesi: 10:00 - 14:00
              <br />
              Pazar: Kapalı
            </p>
          </div>
        </div>

        <section className={styles.socialMedia}>
          <h2>Sosyal Medya Hesaplarımız</h2>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              Instagram
            </a>
            <a href="#" className={styles.socialLink}>
              LinkedIn
            </a>
            <a href="#" className={styles.socialLink}>
              Facebook
            </a>
            <a href="#" className={styles.socialLink}>
              Twitter
            </a>
          </div>
        </section>

        <section className={styles.mapSection}>
          <h2>Bizi Bulun</h2>
          <div className={styles.mapPlaceholder}>
            <p>Harita Görünümü</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IletisimPage;
