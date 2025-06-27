import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        { id: 1, name: 'Item A', quantity: 10, price: 100 },
        { id: 2, name: 'Item B', quantity: 5, price: 50 },
        // add your initial items
    ]
};

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        reduceQuantity: (state, action) => {
            const { itemId, amount } = action.payload;
            const item = state.items.find(i => i.id === itemId);
            if (item && item.quantity >= amount) {
                item.quantity -= amount;
            }
        },
    }
});

export const { reduceQuantity } = itemsSlice.actions;
export default itemsSlice.reducer;
