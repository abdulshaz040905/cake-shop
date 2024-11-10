import React, { useState } from "react";
import "./App.css";

// Sample cake data
const cakesData = [
  { id: 1, name: "Chocolate Cake", image: "https://via.placeholder.com/200x200", price: 25, category: "Chocolate" },
  { id: 2, name: "Vanilla Cake", image: "https://via.placeholder.com/200x200", price: 20, category: "Vanilla" },
  { id: 3, name: "Fruit Cake", image: "https://via.placeholder.com/200x200", price: 30, category: "Fruit" },
  { id: 4, name: "Strawberry Cake", image: "https://via.placeholder.com/200x200", price: 28, category: "Strawberry" },
  { id: 5, name: "Cheese Cake", image: "https://via.placeholder.com/200x200", price: 35, category: "Cheese" }
];

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);

  // Filter cakes by category
  const filteredCakes = cakesData.filter(cake => selectedCategory === "All" || cake.category === selectedCategory);

  // Handle adding items to cart
  const addToCart = (cake) => {
    const updatedCart = [...cart];
    const existingCake = updatedCart.find(item => item.id === cake.id);
    if (existingCake) {
      existingCake.quantity += 1;
    } else {
      updatedCart.push({ ...cake, quantity: 1 });
    }
    setCart(updatedCart);
  };

  // Handle removing items from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Total cost calculation
  const getTotalCost = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="App">
      <header>
        <h1>Cake Shop</h1>
        <nav>
          <button onClick={() => setShowCart(!showCart)}>{`Cart (${cart.length})`}</button>
        </nav>
      </header>

      <main>
        <div className="categories">
          <button onClick={() => handleCategoryChange("All")}>All Cakes</button>
          <button onClick={() => handleCategoryChange("Chocolate")}>Chocolate</button>
          <button onClick={() => handleCategoryChange("Vanilla")}>Vanilla</button>
          <button onClick={() => handleCategoryChange("Fruit")}>Fruit</button>
          <button onClick={() => handleCategoryChange("Strawberry")}>Strawberry</button>
          <button onClick={() => handleCategoryChange("Cheese")}>Cheese</button>
        </div>

        <div className="cakes-list">
          {filteredCakes.map(cake => (
            <div key={cake.id} className="cake-card">
              <img src={cake.image} alt={cake.name} />
              <h2>{cake.name}</h2>
              <p>Price: ${cake.price}</p>
              <button onClick={() => addToCart(cake)}>Add to Cart</button>
            </div>
          ))}
        </div>

        {showCart && (
          <div className="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <ul>
                  {cart.map(item => (
                    <li key={item.id}>
                      <span>{item.name} (x{item.quantity})</span>
                      <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                  ))}
                </ul>
                <p>Total: ${getTotalCost()}</p>
                <button onClick={() => alert("Proceeding to checkout...")}>Checkout</button>
              </>
            )}
          </div>
        )}
      </main>

      <footer>
        <p>About Us</p>
        <p>Contact Us</p>
      </footer>
    </div>
  );
}

export default App;
