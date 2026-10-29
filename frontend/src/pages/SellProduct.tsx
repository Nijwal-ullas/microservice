import { useState } from "react";
import { createProduct } from "../services/productService";

export default function SellProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    try {
      await createProduct({
        title,
        price: Number(price),
        category,
      });

      setMessage("Product created successfully!");
      setTitle("");
      setPrice("");
    } catch (error) {
      setMessage("Failed to create product. Please log in and try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sell a Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product title"
          required
        />

        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Electronics">Electronics</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Furniture">Furniture</option>
          <option value="Books">Books</option>
          <option value="Fashion">Fashion</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Create Product</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
