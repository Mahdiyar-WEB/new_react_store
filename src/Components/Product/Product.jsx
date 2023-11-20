import styles from "./product.module.css";
import { useNavigate } from "react-router-dom";
import running from "../../public/running-shoes.jpeg";
import mountain from "../../public/mountain-shoes.png";
import jordan from "../../public/jordan-shoes.jpeg";
import vans from "../../public/vans-shoes.jpg";
import adidas from "../../public/adidas-shoes.jpg";
import winter from "../../public/winter-shoes.jpg";

const images = [winter, adidas, vans, running, mountain, jordan];

const Product = ({ product, onAdd, inCart, onClick }) => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("cart");
  };
  return (
    <div className={styles.product}>
      <img onClick={onClick} src={images[product.id - 1]} alt={product.name} />
      <div onClick={onClick} className={styles.head}>
        <p>{product.name}</p>
        <p className={product.discount > 0 ? styles.discount_price : ""}>
          ت {product.price}
        </p>
      </div>
      <div className={styles.footer}>
        <div className={styles.discount_container}>
          {product.discount > 0 && (
            <small className={styles.discount}>{product.discount}%</small>
          )}
          {product.discount > 0 && <p>ت {product.offPrice}</p>}
        </div>
        {inCart ? (
          <button
            className={`${styles.buyBtn}  ${
              product.discount === 0 ? styles.end_btn : ""
            }`}
            onClick={() => redirect()}
          >
            ادامه سفارش
          </button>
        ) : (
          <button
            className={`${styles.buyBtn}  ${
              product.discount === 0 ? styles.end_btn : ""
            }`}
            onClick={onAdd}
          >
            اضافه کردن به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
