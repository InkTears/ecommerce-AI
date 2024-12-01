import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './reset.css'; // Import the CSS reset file
import './App.css'; // Import the main CSS file

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const addToCart = (product) => {
        const productWithId = { ...product, cartId: uuidv4() };
        setCart([...cart, productWithId]);
        setTotal(total + product.price);
    };

    const removeFromCart = (cartId) => {
        const productToRemove = cart.find(product => product.cartId === cartId);
        setCart(cart.filter(product => product.cartId !== cartId));
        setTotal(total - productToRemove.price);
    };

    const emptyCart = () => {
        setCart([]);
        setTotal(0);
    };

    const simulatePayment = () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        const summary = cart.map(product => `${product.name} - $${product.price}`).join('\n');
        alert(`Payment successful!\n\nSummary:\n${summary}\n\nTotal: $${total}`);
        emptyCart();
    };

    return (
        <div className="App">
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <h1>Cart</h1>
            <ul>
                {cart.map((product) => (
                    <li key={product.cartId}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => removeFromCart(product.cartId)}>Remove from Cart</button>
                    </li>
                ))}
            </ul>
            <h2>Total: ${total}</h2>
            <button onClick={emptyCart}>Empty Cart</button>
            <button onClick={simulatePayment}>Simulate Payment</button>
        </div>
    );
}

export default App;