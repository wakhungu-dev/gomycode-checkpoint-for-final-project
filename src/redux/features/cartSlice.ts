import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Iproduct } from '@/types/core';

interface CartState {
    items: Iproduct[];
}

const initialState: CartState = {
    items: [],
};

/**
 * Represents a Redux slice for managing the cart state.
 *
 * @remarks
 * This slice contains reducers for adding items to the cart, removing items from the cart,
 * incrementing the quantity of an item in the cart, and decrementing the quantity of an item in the cart.
 *
 * @public
 */
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Iproduct & { quantity: number }>) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            const product = state.items.find(item => item._id === action.payload);
            if (product) {
                product.quantity += 1;
            }
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const product = state.items.find(item => item._id === action.payload);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
        },
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
