import { useReducer } from 'react';

import CartContext from './CartContext';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	console.log('state:' + JSON.stringify(state));
	console.log('action:' + action);

	if (action.type === 'ADD') {
		debugger;
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		const existingCartItemIndex = state.items.findIndex(
			item => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItemIndex,
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		console.log(updatedItems);
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === 'REMOVE') {
		const existingCartItemIndex = state.items.findIndex(
			item => item.id === action.id
		);
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter(item => item.id !== action.id);
		} else {
			const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	return defaultCartState;
};

const CartProvider = props => {
	// * the goal of this compnent is to manage the current context to data and provide that context to all copnents that want to access it
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);
	console.log('WTF');
	console.log(cartState);
	console.log('WTF');
	console.log(dispatchCartAction);
	const addItemToCartHandler = item => {
		dispatchCartAction({ type: 'ADD', item: item });
	};
	const removeItemToCartHandler = id => {
		dispatchCartAction({ type: 'REMOVE', id: id });
	};
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemToCartHandler,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};
export default CartProvider;
