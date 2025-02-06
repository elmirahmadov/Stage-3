import styles from "./Card.module.css";
import PropTypes from "prop-types";
import defaultİmage from "../../assets/images/default.jpg";

function Card(props) {
  const {
    images,
    productName,
    stock,
    price,
    unit,
    description,
    currency,
    colorHover,
  } = props;

  return (
    <div className={styles.card}>
      <img
        src={images || defaultİmage}
        alt={productName || "No product name"}
      />
      <div className={`${styles.products} ${styles[colorHover]}`}>
        <div>Name : {productName || "Not Available"}</div>
        <div>Price : {price ? `${price} ${currency}` : "No Price"} </div>
        <div>Stock :{stock ? `${stock} ${unit || ""}` : "Out of Stock"}</div>
        <div>Comment : {description || "No description available"}</div>
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  productName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  colorHover: PropTypes.string,
};
