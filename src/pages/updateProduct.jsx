import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import { getImageURL } from "../api/img";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    contact: "",
    description: "",
    price: "",
    address: "",
    category: "",
    image: null // file object for new upload
  });

  const [preview, setPreview] = useState(""); // preview URL

  // Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        const product = res.data;
        setFormData({
          title: product.title,
          contact: product.contact,
          description: product.description,
          price: product.price,
          address: product.address,
          category: product.category,
          image: null, // new upload
        });
        setPreview(product.image); // existing image URL
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        setPreview(URL.createObjectURL(file)); // generate preview
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("contact", formData.contact);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("address", formData.address);
      data.append("category", formData.category);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await API.put(`/products/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Product Updated Successfully ✔");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Update Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Update Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* IMAGE PREVIEW */}
          {preview && (
            <div className="relative w-40 mb-2">
              <img
                src={getImageURL(preview)}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setFormData({ ...formData, image: null });
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="absolute -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
          )}

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="🏍️ Vehicles">🏍️ Vehicles</option>
            <option value="💻 Computers">💻 Computers</option>
            <option value="📞 Mobile">📞 Mobile</option>
            <option value="📱 Electronics">📱 Electronics</option>
            <option value="🏠 Furniture">🏠 Furniture</option>
            <option value="🎮 Gaming">🎮 Gaming</option>
            <option value="👕 Fashion">👕 Fashion</option>
            <option value="📚 Books">📚 Books</option>
            <option value="🐶 Pets">🐶 Pets</option>
            <option value="🏋️ Sports & Fitness">🏋️ Sports & Fitness</option>
            <option value="🎸 Musical Instruments">🎸 Musical Instruments</option>
            <option value="🏡 Real Estate">🏡 Real Estate</option>
            <option value="🔧 Tools & Equipment">🔧 Tools & Equipment</option>
            <option value="🪑 Office Supplies">🪑 Office Supplies</option>
            <option value="🌱 Agriculture & Farming">🌱 Agriculture & Farming</option>
            <option value="🎨 Art & Collectibles">🎨 Art & Collectibles</option>
            <option value="Others">Others</option>
          </select>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;