import React from "react";
import styles from "./CVTable.module.css";

const CVTable = ({ data, onShow, onDelete }) => {
  if (!data || data.length === 0) {
    return <div className={styles.emptyTable}>No CVs added yet.</div>;
  }

  const needsEllipsis = (text) => {
    return text && text.length > 25;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.cvTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Image</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td
                className={
                  needsEllipsis(item.fullName) ? styles.hasEllipsis : ""
                }
                data-full-text={
                  needsEllipsis(item.fullName) ? item.fullName : ""
                }
              >
                {item.fullName}
              </td>
              <td
                className={needsEllipsis(item.email) ? styles.hasEllipsis : ""}
                data-full-text={needsEllipsis(item.email) ? item.email : ""}
              >
                {item.email}
              </td>
              <td
                className={needsEllipsis(item.phone) ? styles.hasEllipsis : ""}
                data-full-text={needsEllipsis(item.phone) ? item.phone : ""}
              >
                {item.phone}
              </td>
              <td>
                {item.imageURL && (
                  <div className={styles.imageContainer}>
                    <img
                      src={item.imageURL}
                      alt={item.fullName && item.fullName.charAt(0)}
                      className={styles.thumbnail}
                    />
                  </div>
                )}
              </td>
              <td>
                <button
                  className={styles.showButton}
                  onClick={() => onShow(item)}
                >
                  Show CV
                </button>
              </td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => onDelete(index)}
                >
                  X Detele CV
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CVTable;
