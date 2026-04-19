import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import API from "../api/api";

export default function AddProduct() {

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    contact: "",
    description: "",
    price: "",
    image: null,
    address: "",
    category: ""
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {

    if (e.target.name === "image") {

      const file = e.target.files[0];

      setFormData({
        ...formData,
        image: file
      });

      setPreview(URL.createObjectURL(file)); // preview generate

    } else {

      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });

    }

  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    await API.post("/products/add", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    alert("Product Added Successfully ✔");
    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    alert("Failed to add product");
  }
};

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md space-y-4"
      >

        <h2 className="text-2xl font-bold text-center">
          Add Product
        </h2>
                 {/* IMAGE PREVIEW */}
{preview && (
  <div className="relative w-40">

    <img
      src={preview}
      alt="Preview"
      className="w-40 h-45 object-cover rounded-lg border"
    />

    {/* REMOVE BUTTON */}
    <button
      type="button"
      onClick={() => {
        setPreview(null);
        setFormData({
          ...formData,
          image: null
        });
        if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
          required
        />


        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Location / Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
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
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />


        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
           
       
      </form>
     
    </div>
  );
}