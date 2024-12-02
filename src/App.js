import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './reset.css';
import './App.css';
import PaymentModal from './PaymentModal.js';
import ProductList from './ProductList.js';
import Cart from './Cart.js';

const initialState = {
    products: [],
    cart: [],
    total: 0,
    isModalOpen: false,
    isLoading: true
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'ADD_TO_CART':
            const newProduct = { ...action.payload, cartId: uuidv4() };
            return {
                ...state,
                cart: [...state.cart, newProduct],
                total: state.total + action.payload.price
            };
        case 'REMOVE_FROM_CART':
            const updatedCart = state.cart.filter(product => product.cartId !== action.payload);
            const productToRemove = state.cart.find(product => product.cartId === action.payload);
            return {
                ...state,
                cart: updatedCart,
                total: productToRemove ? state.total - productToRemove.price : state.total
            };
        case 'EMPTY_CART':
            return { ...state, cart: [], total: 0 };
        case 'TOGGLE_MODAL':
            return { ...state, isModalOpen: !state.isModalOpen };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_CART':
            return { ...state, cart: action.payload, total: action.payload.reduce((acc, product) => acc + product.price, 0) };
        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: 'SET_LOADING', payload: true });
        axios.get('http://localhost:5000/products')
            .then(response => {
                dispatch({ type: 'SET_PRODUCTS', payload: response.data });
                dispatch({ type: 'SET_LOADING', payload: false });
            })
            .catch(error => {
                console.error('Error fetching products', error);
                dispatch({ type: 'SET_LOADING', payload: false });
            });
    }, []);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
            }
        } catch (error) {
            console.error('Failed to retrieve cart from localStorage:', error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(state.cart));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }, [state.cart]);

    const addToCart = (product) => {
        if (!product || typeof product.price !== 'number' || product.price <= 0) {
            console.error('Invalid product');
            return;
        }
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const handlePayment = (paymentInfo) => {
        if (state.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        const summary = state.cart.map(product => `${product.name} - $${product.price}`).join('\n');
        alert(`Payment successful!\n\nSummary:\n${summary}\n\nTotal: $${state.total}\n\nName: ${paymentInfo.name}\nAddress: ${paymentInfo.address}\nPayment Method: ${paymentInfo.paymentMethod}`);
        dispatch({ type: 'EMPTY_CART' });
    };

    return (
        <div className="App">
            {state.isLoading ? (
                <div>Loading products...</div>
            ) : (
                <ProductList products={state.products} onAddToCart={addToCart} />
            )}
            <Cart cart={state.cart} onRemoveFromCart={(cartId) => dispatch({ type: 'REMOVE_FROM_CART', payload: cartId })} total={state.total} onEmptyCart={() => dispatch({ type: 'EMPTY_CART' })} />
            <button onClick={() => dispatch({ type: 'TOGGLE_MODAL' })}>Simulate Payment</button>
            <PaymentModal isOpen={state.isModalOpen} onRequestClose={() => dispatch({ type: 'TOGGLE_MODAL' })} onPayment={handlePayment} />
        </div>
    );
}

export default App;