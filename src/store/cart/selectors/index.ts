import type { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

const getTotalQuantity = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const total = Object.values(items).reduce((a, c) => a + c, 0);
    return total;
  }
);

export { getTotalQuantity };
