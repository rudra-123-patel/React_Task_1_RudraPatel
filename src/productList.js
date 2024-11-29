import React from 'react';

const ProductList = ({ category, products, addItem }) => {
  const filteredProducts = products.filter((product) => product.category === category);

  return (
    <div className="product-list">
      <h3>{category} Products</h3>
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-item">
          <span>{product.name}</span>
          <span>${product.price.toFixed(2)}</span>
          <button onClick={() => addItem(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
