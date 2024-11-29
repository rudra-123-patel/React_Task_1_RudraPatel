import React, { useState } from "react";
import ProductList from "./productList";
import "./App.css";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Electronics");
  const [isCheckout, setIsCheckout] = useState(false);

//data
  const products = [
    { id: 1, name: "Laptop", price: 500, category: "Electronics" },
    { id: 2, name: "Smartphone", price: 200, category: "Electronics" },
    { id: 3, name: "Camera", price: 350, category: "Electronics" },
    { id: 4, name: "Football", price: 20, category: "Sports" },
    { id: 5, name: "Basketball", price: 25, category: "Sports" },
    { id: 6, name: "Tennis Racket", price: 50, category: "Sports" },
    { id: 7, name: "Apple", price: 1.2, category: "Food" },
    { id: 8, name: "Banana", price: 0.5, category: "Food" },
    { id: 9, name: "Orange", price: 0.8, category: "Food" },
    { id: 10, name: "Grapes", price: 2.0, category: "Food" },
  ];

//add
  const addItem = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  //update
  const updateQuantity = (itemId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      )
    );
  };

  //remove
  const removeItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

//checkout
  const handleCheckout = () => {
    setIsCheckout(true);
  };

//total
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (isCheckout) {
    return (
      <div className="confirmation-page">
        <h2>Order Summary</h2>
        <ul className="checkout-items">
          {cartItems.map((item) => (
            <li key={item.id} className="checkout-item">
              <span className="checkout-name">{item.name}</span>
              <span className="checkout-quantity">x {item.quantity}</span>
              <span className="checkout-price">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        <button className="back-button" onClick={() => setIsCheckout(false)}>
          Back to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <h2 className="cart-title">Shopping Cart</h2>

      <div className="category-buttons">
        <button onClick={() => setCurrentCategory("Electronics")}>
          Electronics
        </button>
        <button onClick={() => setCurrentCategory("Sports")}>Sports</button>
        <button onClick={() => setCurrentCategory("Food")}>Food</button>
      </div>

      {}
      <ProductList
        category={currentCategory}
        products={products}
        addItem={addItem}
      />

      {}
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-price">
                ${item.price.toFixed(2)} x {item.quantity}
              </span>
            </div>
            <div className="item-controls">
              <button
                className="quantity-button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                Add
              </button>
              <button
                className="quantity-button"
                onClick={() =>
                  item.quantity > 1
                    ? updateQuantity(item.id, item.quantity - 1)
                    : removeItem(item.id)
                }
              >
                Remove
              </button>
              <button
                className="remove-button"
                onClick={() => removeItem(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total and Checkout */}
      <div className="cart-total-wrapper">
        <div className="cart-total">
          <h3>
            Total: ${calculateTotal().toFixed(2)}
          </h3>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
