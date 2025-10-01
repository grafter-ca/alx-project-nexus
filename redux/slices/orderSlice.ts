// redux/slice/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  product: string;   // product id
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  user: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "paid" | "cancelled";
  paymentMethod: "Mobile money" | "Chapa" | "Credit Card" | "Cash on Delivery";
  createdAt: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: Order["status"] }>
    ) => {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orders[index].status = action.payload.status;
      }
    },
  },
});

export const { setOrders, addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
