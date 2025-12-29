import type { Category } from "src/types/ecommerce";
import styles from "./styles.module.css";
import { Link } from "react-router";
const { category, categoryImg, categoryTitle } = styles;

const CategoryCard = ({ img, title, prefix }: Category) => {
  return (
    <Link to={`/products/${prefix}`} className={category}>
      <div className={categoryImg}>
        <img src={img} alt={title} />
      </div>
      <h4 className={categoryTitle}>{title}</h4>
    </Link>
  );
};

export default CategoryCard;
