import { useContext } from 'react';

import Modal from '../UI/Modal';
import OrderHistoryCartItem from './OrderHistoryCartItem';
import classes from '../OrderHistory/OrderHistory.module.css';
import CartContext from '../store/CartContext';

// ! this is the equivalent of Cart.js

const OrderHistory = props => {
	const cartCtx = useContext(CartContext);
	console.log('1.cartCtx:' + cartCtx.item);
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = id => {
		cartCtx.removeItem(id);
	};
	const cartItemAddHandler = item => {
		console.log('SHITFACE', item);
		cartCtx.addItem({ ...item, amount: 1 });
	};
	// ! look in cartcontext's item.  understand what is being pulled in the item
	const orders = console.log('FUCKING WHORE:', cartCtx.items) || (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map(item => (
				<OrderHistoryCartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	return (
		<Modal onClose={props.onClose}>
			{orders}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onClose}>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default OrderHistory;
