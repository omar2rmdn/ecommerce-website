import { getTotalQuantity } from "@/store/cart/selectors";
import { useAppSelector } from "@/store/hooks";
import { memo } from "react";
import { Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

const CartBadge = memo(() => {
  const totalQuantity = useAppSelector(getTotalQuantity);

  return (
    <div className="position-relative d-flex">
      <FaShoppingCart size={24} color="#333" />
      <Badge
        bg="danger"
        pill
        className="position-absolute top-0 start-100 translate-middle"
        style={{ fontSize: "0.65rem" }}
      >
        {totalQuantity}
      </Badge>
    </div>
  );
});

export default CartBadge;
