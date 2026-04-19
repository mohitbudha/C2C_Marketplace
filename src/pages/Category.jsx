import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../api/api";
import { getImageURL } from "../api/img";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Category list
  const categories = [
    { label: "Electronics", emoji: "📱" },
    { label: "Mobile Phones", emoji: "📞" },
    { label: "Computers & Laptops", emoji: "💻" },
    { label: "Gaming", emoji: "🎮" },
    { label: "TV & Home Entertainment", emoji: "📺" },
    { label: "Vehicles", emoji: "🏍️" },
    { label: "Home & Furniture", emoji: "🏠" },
    { label: "Fashion & Clothing", emoji: "👕" },
    { label: "Shoes & Accessories", emoji: "👟" },
    { label: "Bags & Luggage", emoji: "🎒" },
    { label: "Kids & Toys", emoji: "🧸" },
    { label: "Books & Study Materials", emoji: "📚" },
    { label: "Sports & Fitness", emoji: "🏋️" },
    { label: "Musical Instruments", emoji: "🎸" },
    { label: "Pets & Pet Supplies", emoji: "🐶" },
    { label: "Real Estate", emoji: "🏡" },
    { label: "Tools & Equipment", emoji: "🔧" },
    { label: "Office Supplies", emoji: "🪑" },
    { label: "Agriculture & Farming", emoji: "🌱" },
    { label: "Art & Collectibles", emoji: "🎨" },
  ];

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = category
          ? await API.get(`/products/category/${category}`)
          : await API.get("/products"); // if no category, get all
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {category ? `Category: ${category}` : "All Products"}
      </h2>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => navigate("/category")}
          className={`px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition ${
            !category ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>

        {categories.map((c) => (
          <button
            key={c.label}
            onClick={() => navigate(`/category/${c.label}`)}
            className={`px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition ${
              category === c.label ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
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
                src={getImageURL(p.image)}
                alt={p.title}
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-600">{p.description}</p>
              <p className="font-bold mt-1">Price: ₹{p.price}</p>
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