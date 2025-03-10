"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "../../store/cartSlice";
import styles from "./ProductDetail.module.css";

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Dış API'den ürün detayını çekme
        const response = await fetch(
          `https://dummyjson.com/products/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Ürün bulunamadı");
        }

        const data = await response.json();

        // API'den gelen veriyi uygun formata dönüştürme
        const formattedProduct = {
          id: data.id,
          name: data.title,
          price: data.price,
          rating: data.rating,
          brand: data.brand,
          image: data.images[0], // İlk görüntüyü kullan
          description: data.description,
          features: data.tags || [], // Eğer tags yoksa boş dizi
          stock: data.stock || 10, // Stok bilgisi yoksa varsayılan değer
          categories: data.category ? [data.category] : [], // Kategori bilgisi
        };

        setProduct(formattedProduct);
        setLoading(false);
      } catch (err) {
        setError("Ürün detayları yüklenirken bir hata oluştu: " + err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
      alert("Ürün sepete eklendi!");
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) return <div className={styles.loading}>Ürün yükleniyor...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div className={styles.error}>Ürün bulunamadı.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link href="/">Ana Sayfa</Link> {">"}
        <Link href="/products">Ürünler</Link> {">"}
        <span>{product.name}</span>
      </div>

      <div className={styles.productDetail}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className={styles.productImage}
          />
        </div>

        <div className={styles.details}>
          <h1 className={styles.productName}>{product.name}</h1>
          <div className={styles.brand}>{product.brand}</div>

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

          <div className={styles.price}>{product.price} ₺</div>

          <div className={styles.stockInfo}>
            <span className={styles.stockLabel}>Stok Durumu:</span>
            <span
              className={product.stock > 0 ? styles.inStock : styles.outOfStock}
            >
              {product.stock > 0
                ? `${product.stock} adet stokta`
                : "Stokta yok"}
            </span>
          </div>

          <div className={styles.description}>{product.description}</div>

          {product.features && product.features.length > 0 && (
            <div className={styles.features}>
              <h3>Özellikler</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.categories && product.categories.length > 0 && (
            <div className={styles.categories}>
              <h3>Kategoriler</h3>
              <div className={styles.categoryTags}>
                {product.categories.map((category, index) => (
                  <span key={index} className={styles.categoryTag}>
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <div className={styles.quantityControls}>
              <button
                className={styles.quantityButton}
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className={styles.quantity}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>

            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
