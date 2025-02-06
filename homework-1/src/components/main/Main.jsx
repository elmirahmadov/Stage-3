import Card from "../card/Card";
import styles from "./Main.module.css";
import yumurtaİmage from "../../assets/images/yumurta.jpg";
import bananİmage from "../../assets/images/banan.webp";
import almaİmage from "../../assets/images/alma.jpg";
import nutellaİmage from "../../assets/images/nutella.jpg";

function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <Card
          images={yumurtaİmage}
          productName="Yumurta"
          price="0.50"
          stock="110"
          unit="ədəd"
          currency="₼"
          description="Kənd yumurtası"
        />
        <Card
          images={bananİmage}
          productName="Banan"
          price="1.20"
          stock="97"
          unit="kg"
          currency="₼"
          description="Təzə banan"
        />
        <Card
          images={almaİmage}
          productName="Alma"
          price="0.70"
          stock="200"
          unit="kg"
          currency="$"
          description="Qırmızı alma"
        />
        <Card
          images={nutellaİmage}
          productName="Nutella"
          price="3.50"
          stock="25"
          unit="ədəd"
          currency="₺"
          description="Şokalad və Vanilyalı"
        />
        <Card
          images=""
          productName=""
          price=""
          stock=""
          unit=""
          currency=""
          description=""
        />
      </div>
      <div className={styles.list}></div>
    </div>
  );
}

export default Main;
