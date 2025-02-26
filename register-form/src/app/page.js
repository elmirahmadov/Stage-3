"use client";
import { useState } from "react";
import Head from "next/head";
import styles from "./page.module.css";
import CVForm from "./components/CVForm/CVForm";
import CVModal from "./components/CVModal/CVModal";
import CVTable from "./components/CVTable/CVTable";

export default function Home() {
  const [cvData, setCvData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);

  const handleFormSubmit = (formData) => {
    setCvData([...cvData, formData]);
  };

  const handleShowCV = (cv) => {
    setSelectedCV(cv);
    setModalOpen(true);
  };

  const handleDeleteCV = (index) => {
    const updatedData = cvData.filter((_, i) => i !== index);
    setCvData(updatedData);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCV(null);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CV Manager</title>
        <meta name="description" content="CV management application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>CV Manager</h1>

        <div className={styles.grid}>
          <div className={styles.formSection}>
            <CVForm onSubmit={handleFormSubmit} />
          </div>

          <div className={styles.tableSection}>
            <CVTable
              data={cvData}
              onShow={handleShowCV}
              onDelete={handleDeleteCV}
            />
          </div>
        </div>
      </main>

      <CVModal isOpen={modalOpen} onClose={closeModal} cvData={selectedCV} />
    </div>
  );
}
