"use client";

import React from "react";
import Image from "next/image";
import styles from "./About.module.css";
import company from "/public/about-company.jpg";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Mehmet Kaya",
      role: "Ürün Geliştirme Direktörü",
      image: "/image1.jpg",
      bio: "Uluslararası kozmetik trendlerini yakından takip eden uzman.",
    },
    {
      name: "Elmir Əhmədov",
      role: "Kurucu & CEO",
      image: "/elmir.jpg",
      bio: "Kozmetik sektöründe 15 yılı aşkın deneyime sahip girişimci.",
    },

    {
      name: "Elif Şahin",
      role: "Pazarlama Müdürü",
      image: "/image2.jpg",
      bio: "Dijital pazarlama ve marka stratejileri konusunda uzman.",
    },
  ];

  const companyMilestones = [
    {
      year: 2015,
      title: "Şirketin Kuruluşu",
      description: "İlk kozmetik ürünlerimizin üretimine başladık.",
    },
    {
      year: 2018,
      title: "Online Satış Platformu",
      description: "E-ticaret sitemizi hizmete açtık.",
    },
    {
      year: 2021,
      title: "Uluslararası Genişleme",
      description: "Avrupa pazarına açıldık.",
    },
    {
      year: 2023,
      title: "Sürdürülebilirlik Ödülü",
      description: "Çevre dostu üretim uygulamalarımızla ödül aldık.",
    },
  ];

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Güzelliğin İnovatif Yüzü</h1>
          <p>
            Doğal, kaliteli ve etik kozmetik ürünleriyle müşterilerimizin
            hayatına değer katıyoruz.
          </p>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <h2>Biz Kimiz?</h2>
          <p>
            2015 yılından beri, kaliteli ve etik kozmetik ürünler üretiyoruz.
            Amacımız, doğal içerikli ve sürdürülebilir kozmetik ürünleriyle
            müşterilerimizin güzelliğine katkıda bulunmak.
          </p>
        </div>
        <div className={styles.aboutImage}>
          <Image src={company} alt="Şirket Ofisimiz" width={500} height={350} />
        </div>
      </section>

      <section className={styles.teamSection}>
        <h2>Ekibimiz</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamMember}>
              <div className={styles.teamMemberImage}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={250}
                  height={250}
                />
              </div>
              <h3>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <p className={styles.memberBio}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.milestonesSection}>
        <h2>Yolculuğumuz</h2>
        <div className={styles.milestoneTimeline}>
          {companyMilestones.map((milestone, index) => (
            <div key={index} className={styles.milestone}>
              <div className={styles.milestoneYear}>{milestone.year}</div>
              <div className={styles.milestoneContent}>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.valuesSection}>
        <h2>Değerlerimiz</h2>
        <div className={styles.valueGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🌱</div>
            <h3>Sürdürülebilirlik</h3>
            <p>Çevre dostu üretim ve doğal hammaddeler</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>❤️</div>
            <h3>Etik Üretim</h3>
            <p>Hayvan deneyi yapmayan, adil çalışma koşulları</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🔬</div>
            <h3>İnovasyon</h3>
            <p>Sürekli araştırma ve ürün geliştirme</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🤝</div>
            <h3>Müşteri Odaklılık</h3>
            <p>Müşteri memnuniyetini her şeyin üstünde tutmak</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
