import { memo, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { addToCart } from "@/store/cart/cart-slice";
import styles from "./styles.module.css";
import type { Product } from "src/types/ecommerce";
import LikeBtn from "./like-btn";
import { useAppDispatch } from "@/store/hooks";
import { toggleLike } from "@/store/wishlist/thunk";

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
  likeBtn,
} = styles;

type ProductPorps = Product & {
  isLiked?: boolean;
};

const ProductCard = memo(
  ({ title, img, price, id, max, quantity, isLiked }: ProductPorps) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    const remain = max - (quantity ?? 0);
    const reachedMax = remain <= 0;

    const addToCartHandler = () => {
      setIsLoading(true);
      dispatch(addToCart(id));

      const debounce = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(debounce);
    };

    const likeHandler = () => {
      if (wishlistLoading) return;
      dispatch(toggleLike(id))
        .unwrap()
        .then(() => setWishlistLoading(false))
        .catch(() => setWishlistLoading(false));
    };

    return (
      <div className={card}>
        <div className={imageWrapper}>
          {wishlistLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className={likeBtn}
            />
          ) : (
            <LikeBtn isLiked={isLiked ?? false} likeHandler={likeHandler} />
          )}

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
            {/* You might want to format 'remain' nicely or hide it */}
            <span style={{ fontSize: "0.85rem", color: "gray" }}>
              {remain} left
            </span>
          </div>

          {/* Helper text if max reached */}
          <div
            style={{
              minHeight: "24px",
              color: "red",
              fontSize: "0.9rem",
              marginTop: "5px",
            }}
          >
            {reachedMax ? "You Reached the Limit" : ""}
          </div>

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
