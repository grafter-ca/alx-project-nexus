// /redux/slices/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCard } from '@/interfaces';

interface ProductState {
    products: ProductCard[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action: PayloadAction<ProductCard[]>) {
            state.loading = false;
            state.products = action.payload;
        },
        fetchProductsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addProduct(state, action: PayloadAction<ProductCard>) {
            state.products.push(action.payload);
        },
        updateProduct(state, action: PayloadAction<ProductCard>) {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index >= 0) state.products[index] = action.payload;
        },
        deleteProduct(state, action: PayloadAction<string>) {
            state.products = state.products.filter(p => p.id !== action.payload);
        },
    },
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    addProduct,
    updateProduct,
    deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;
