"use client";
import { useState } from "react";
import styles from "./CVForm.module.css";

const CVForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    imageURL: "",
    experience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      imageURL: "",
      experience: "",
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>CV Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="url"
            name="imageURL"
            placeholder="Image URL"
            value={formData.imageURL}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <textarea
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CVForm;
