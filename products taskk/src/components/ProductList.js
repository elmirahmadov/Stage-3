"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import styles from "../app/styles/ProductList.module.css";

export default function ProductList() {
  const { products, loading, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    brand: "",
  });
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      let result = [...products];

      // Filtreleme
      if (filters.search) {
        result = result.filter(
          (product) =>
            product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            product.brand.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      if (filters.minPrice) {
        result = result.filter(
          (product) => product.price >= Number(filters.minPrice)
        );
      }

      if (filters.maxPrice) {
        result = result.filter(
          (product) => product.price <= Number(filters.maxPrice)
        );
      }

      if (filters.brand) {
        result = result.filter(
          (product) =>
            product.brand.toLowerCase() === filters.brand.toLowerCase()
        );
      }

      // Sıralama
      switch (sortBy) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "rating-desc":
          result.sort((a, b) => b.rating - a.rating);
          break;
        case "name-asc":
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }

      setFilteredProducts(result);
    }
  }, [products, filters, sortBy]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (loading)
    return <div className={styles.loading}>Ürünler yükleniyor...</div>;
  if (error) return <div className={styles.error}>Hata: {error}</div>;

  return (
    <div className={styles.productListContainer}>
      <div className={styles.filterControls}>
        <button
          className={styles.toggleFilters}
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Filtreleri Gizle" : "Filtreleri Göster"}
        </button>

        <div
          className={`${styles.filters} ${
            showFilters ? styles.showFilters : ""
          }`}
        >
          <div className={styles.filterGroup}>
            <label htmlFor="search">Ara:</label>
            <input
              type="text"
              id="search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Ürün adı veya marka"
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="minPrice">Min Fiyat:</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="0"
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="maxPrice">Max Fiyat:</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="1000"
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="brand">Marka:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              placeholder="Marka adı"
            />
          </div>
        </div>

        <div className={styles.sortGroup}>
          <label htmlFor="sortBy">Sırala:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Seçiniz</option>
            <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="rating-desc">Puan: Yüksekten Düşüğe</option>
            <option value="name-asc">İsim: A-Z</option>
          </select>
        </div>
      </div>

      <div className={styles.productCount}>
        {filteredProducts.length} ürün bulundu
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className={styles.noProducts}>Ürün bulunamadı</div>
        )}
      </div>
    </div>
  );
}
