import styles from "./CVModal.module.css";

const CVModal = ({ isOpen, onClose, cvData }) => {
  if (!isOpen || !cvData) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
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
            <button className={styles.downloadButton}>Download CV</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVModal;
