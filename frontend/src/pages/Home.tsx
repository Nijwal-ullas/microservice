
import { useEffect, useState } from "react";
import {
  getProducts,
  type Product,
} from "../services/productService";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
       
        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        console.error("Product request failed:", err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  if (error) {
    return <p>Failed to load products: {error}</p>;
  }

  return (
    <main>
      <h1>Microservices Marketplace</h1>
      <h2>Available Products ({products.length})</h2>

      {products.length === 0 ? (
        <p>No products returned by the API.</p>
      ) : (
        products.map((product) => (
          <article key={product._id}>
            <h3>{product.title}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Category: {product.category}</p>
          </article>
        ))
      )}
    </main>
  );
}

export default Home;
