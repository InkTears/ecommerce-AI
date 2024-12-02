import React from 'react';

function ProductList({ products, onAddToCart }) {
    return (
        <div className="product-list">
            <h1>Products</h1>
            {products.length === 0 && (
                <p>Aucun produit disponible actuellement</p>
            )}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;