"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login"); // 'login' veya 'register'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hata mesajını temizle
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateLoginForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "E-posta adresi gereklidir";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin";
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "İsim gereklidir";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Soyisim gereklidir";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta adresi gereklidir";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin";
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Burada gerçek bir API çağrısı yapılacak
      // Şimdilik başarılı bir giriş simüle ediyoruz
      setTimeout(() => {
        alert("Başarıyla giriş yaptınız!");
        router.push("/");
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setErrors({
        general: "Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.",
      });
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!validateRegisterForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Burada gerçek bir API çağrısı yapılacak
      // Şimdilik başarılı bir kayıt simüle ediyoruz
      setTimeout(() => {
        alert("Başarıyla kayıt oldunuz! Giriş yapabilirsiniz.");
        setActiveTab("login");
        setFormData({
          ...formData,
          password: "",
          confirmPassword: "",
        });
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setErrors({
        general: "Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "login" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Giriş Yap
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "register" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("register")}
          >
            Kayıt Ol
          </button>
        </div>

        <div className={styles.formContainer}>
          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className={styles.form}>
              <h1 className={styles.title}>Giriş Yap</h1>

              {errors.general && (
                <div className={styles.errorAlert}>{errors.general}</div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="email">E-posta</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles.errorInput : ""}
                  disabled={isLoading}
                />
                {errors.email && (
                  <div className={styles.errorMessage}>{errors.email}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Şifre</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? styles.errorInput : ""}
                  disabled={isLoading}
                />
                {errors.password && (
                  <div className={styles.errorMessage}>{errors.password}</div>
                )}
              </div>

              <div className={styles.forgotPassword}>
                <Link href="/forgot-password">Şifremi Unuttum</Link>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </button>

              <div className={styles.divider}>
                <span>veya</span>
              </div>

              <div className={styles.socialButtons}>
                <button
                  type="button"
                  className={`${styles.socialButton} ${styles.googleButton}`}
                >
                  Google ile Giriş Yap
                </button>
                <button
                  type="button"
                  className={`${styles.socialButton} ${styles.facebookButton}`}
                >
                  Facebook ile Giriş Yap
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className={styles.form}>
              <h1 className={styles.title}>Kayıt Ol</h1>

              {errors.general && (
                <div className={styles.errorAlert}>{errors.general}</div>
              )}

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
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                  {errors.lastName && (
                    <div className={styles.errorMessage}>{errors.lastName}</div>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="registerEmail">E-posta</label>
                <input
                  type="email"
                  id="registerEmail"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles.errorInput : ""}
                  disabled={isLoading}
                />
                {errors.email && (
                  <div className={styles.errorMessage}>{errors.email}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="registerPassword">Şifre</label>
                <input
                  type="password"
                  id="registerPassword"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? styles.errorInput : ""}
                  disabled={isLoading}
                />
                {errors.password && (
                  <div className={styles.errorMessage}>{errors.password}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Şifre Tekrar</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? styles.errorInput : ""}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <div className={styles.errorMessage}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <div className={styles.terms}>
                <input
                  type="checkbox"
                  id="termsCheck"
                  className={styles.checkbox}
                  disabled={isLoading}
                />
                <label htmlFor="termsCheck">
                  <Link href="/terms" target="_blank">
                    Kullanım Şartları
                  </Link>{" "}
                  ve{" "}
                  <Link href="/privacy" target="_blank">
                    Gizlilik Politikası
                  </Link>
                  'nı okudum ve kabul ediyorum.
                </label>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
