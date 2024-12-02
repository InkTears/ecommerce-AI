import React from 'react';

function Cart({ cart, onRemoveFromCart, total, onEmptyCart }) {
    return (
        <div className="cart">
            <h1>Cart</h1>
            {cart.length === 0 && (
                <p>Votre panier est vide</p>
            )}
            <ul>
                {cart.map((product) => (
                    <li key={product.cartId}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <button onClick={() => onRemoveFromCart(product.cartId)}>
                            Remove from Cart
                        </button>
                    </li>
                ))}
            </ul>
            <div className="cart-summary">
                <h2>Total: ${total.toFixed(2)}</h2>
                <button onClick={onEmptyCart}>Empty Cart</button>
            </div>
        </div>
    );
}

export default Cart;