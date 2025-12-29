import { memo, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import type { Product } from "src/types/ecommerce";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cart/cart-slice";

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

const ProductCard = memo(
  ({ title, img, price, id, max, quantity }: Product) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const remain = max - (quantity ?? 0);
    const reachedMax = remain <= 0;

    function addToCartHandler() {
      setIsLoading(true);
      dispatch(addToCart(id));

      const debounce = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(debounce);
    }

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
              {price.toFixed(2)} <span className={currency}>EGP</span>
            </span>
            {remain}
          </div>
          {reachedMax && <p>You Reached the Limit</p>}

          <div className={actions}>
            <Button
              variant="primary"
              className="w-100"
              style={{ fontWeight: "500" }}
              onClick={addToCartHandler}
              disabled={isLoading || reachedMax}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Loading...
                </>
              ) : (
                "Add to cart"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCard;
