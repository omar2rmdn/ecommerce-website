import type { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

const getTotalQuantity = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const total = Object.values(items).reduce((a, c) => a + c, 0);
    return total;
  }
);

const itemQuantityAvailability = createSelector(
  (itemQuantity) => itemQuantity,
  (_, itemMax) => itemMax,
  (itemQuantity, itemMax) => {
    const currentItemQuantityInCart = itemQuantity || 0;
    const currentRemainingQuantity = itemMax - currentItemQuantityInCart;
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;
    return { currentRemainingQuantity, quantityReachedToMax };
  }
);

export { getTotalQuantity, itemQuantityAvailability };
