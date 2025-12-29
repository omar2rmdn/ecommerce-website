import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import type { Product } from "src/types/ecommerce";

// Destructuring styles for cleaner usage
const {
  card,
  imageWrapper,
  productImg,
  body,
  title: titleStyle,
  priceWrapper,
  price: priceStyle,
  currency,
  actions,
} = styles;

const ProductCard = ({ title, img, price }: Product) => {
  return (
    <div className={card}>
      <div className={imageWrapper}>
        <img src={img} alt={title} className={productImg} loading="lazy" />
      </div>

      <div className={body}>
        <h2 className={titleStyle} title={title}>
          {title}
        </h2>

        <div className={priceWrapper}>
          <span className={priceStyle}>
            {price} <span className={currency}>EGP</span>
          </span>
        </div>

        <div className={actions}>
          <Button
            variant="primary"
            className="w-100" // Bootstrap utility for full width
            style={{ fontWeight: "500" }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
