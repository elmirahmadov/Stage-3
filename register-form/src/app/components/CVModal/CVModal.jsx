import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import styles from "./CVModal.module.css";

const CVModal = ({ isOpen, onClose, cvData }) => {
  if (!isOpen || !cvData) return null;

  const handleDownload = async () => {
    const modalElement = document.getElementById("cv-modal-content");

    if (!modalElement) return;

    try {
      const canvas = await html2canvas(modalElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, 0);
      pdf.save(`${cvData.fullName.replace(/\s+/g, "_")}_CV.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer} id="cv-modal-content">
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>CV Details</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.cvPreview}>
            <div className={styles.cvHeader}>
              <div className={styles.cvInfo}>
                <h2 className={styles.cvName}>{cvData.fullName}</h2>
                <div className={styles.cvContact}>
                  <p>Email: {cvData.email}</p>
                  <p>Phone: {cvData.phone}</p>
                </div>
              </div>
              {cvData.imageURL && (
                <div className={styles.cvImage}>
                  <img src={cvData.imageURL} alt={cvData.fullName} />
                </div>
              )}
            </div>
            <div className={styles.cvBody}>
              <h3 className={styles.sectionTitle}>Experience:</h3>
              <p className={styles.experienceText}>{cvData.experience}</p>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.downloadButton} onClick={handleDownload}>
              Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVModal;
