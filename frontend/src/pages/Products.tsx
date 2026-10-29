
import { useEffect, useState } from "react";
import {
  getProducts,
  type Product,
} from "../services/productService";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Available Products</h1>

      {products.length === 0 ? (
        <p>No products available yet.</p>
      ) : (
        <div>
          {products.map((product) => (
            <article key={product._id}>
              <h2>{product.title}</h2>
              <p>Price: ₹{product.price}</p>
              <p>Category: {product.category}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
