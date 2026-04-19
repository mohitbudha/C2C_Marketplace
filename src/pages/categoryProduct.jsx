import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get(`/products/category/${category}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Category: {category}</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="border p-4 rounded-lg bg-white shadow hover:shadow-lg transition"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-600">{p.description}</p>
              <p className="font-bold mt-1">Price: ₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}