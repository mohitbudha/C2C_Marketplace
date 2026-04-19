import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import { getImageURL } from "../api/img";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products"); // backend endpoint
        setProducts(res.data);
        setFilteredProducts(res.data); // initially show all
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by title
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Search Bar */}
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by title..."
        className="w-full md:w-1/3 mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="border p-4 rounded-lg bg-white shadow hover:shadow-lg transition"
            >
              <img
                src={getImageURL(p.image)}
                alt={p.title}
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="font-bold mt-1">रु {p.price}</p>
              <Link
                to={`/${p._id}`}
                className="inline-block mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}