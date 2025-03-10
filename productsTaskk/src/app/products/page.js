"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
          throw new Error("Ürünler yüklenemedi");
        }

        const data = await response.json();

        // API'den gelen ürünleri formatla
        const formattedProducts = data.products.map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          rating: product.rating,
          brand: product.brand,
          image: product.thumbnail,
          description: product.description,
        }));

        setProducts(formattedProducts);
        setLoading(false);
      } catch (err) {
        setError("Ürünler yüklenirken bir hata oluştu: " + err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Arama terimne göre ürünleri filtreleme
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  if (loading)
    return <div className={styles.loading}>Ürünler yükleniyor...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Ürünlerimiz</h1>

      {/* Arama input'u */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Ürün veya marka ara..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Ürün listesi */}
      <div className={styles.productGrid}>
        {filteredProducts.length === 0 ? (
          <div className={styles.noProducts}>Hiç ürün bulunamadı.</div>
        ) : (
          filteredProducts.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className={styles.productCard}
            >
              <div className={styles.productImageContainer}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productInfo}>
                <h2 className={styles.productName}>{product.name}</h2>
                <div className={styles.productBrand}>{product.brand}</div>
                <div className={styles.productRating}>
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
                <div className={styles.productPrice}>{product.price} ₺</div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
