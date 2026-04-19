import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";
import { getImageURL } from "../api/img";

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading product...
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

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link
        to="/dashboard"
        className="inline-block mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
      >
        &larr; Back 
      </Link>

      <div className="flex flex-col md:flex-row gap-6 bg-white shadow rounded-lg p-6">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={getImageURL(product.image)}
            alt={product.title}
            className="w-full h-auto max-h-96 object-cover rounded"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            
            <p className="text-2xl font-semibold mb-4">रु {product.price}</p>
            <p className="text-gray-700 mb-4">📞 {product.contact}</p>
            <p className="text-gray-700 mb-4">📍 {product.address}</p>
            <p className="text-gray-700 mb-4">{product.category}</p>
            <p className="text-gray-700 mb-4">📋 {product.description}</p>
            <p className="text-gray-500 mb-2">
              👤 {product.user?.name || "Unknown"}(you)
            </p>
            <p className="text-gray-400 text-sm">
              Added on: {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* <button className="mt-6 md:mt-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Contact Seller
          </button> */}
        </div>
      </div>
    </div>
  );
}