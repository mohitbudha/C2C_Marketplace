import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { getImageURL } from "../api/img";

export default function Dashboard() {

  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  // get user from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserName(payload.name);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  // fetch my products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");

        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token.split(".")[1]));

        const myProducts = res.data.filter(p => p.user === payload.id);
        setProducts(myProducts);

      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  // delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setProducts(products.filter(p => p._id !== id));
      alert("Product Deleted");
      

    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome, <span className="text-blue-600">{userName}</span>
        </h1>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/add")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Product
          </button>

          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>

        </div>

      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto">

        {products.length === 0 ? (
          <p className="text-gray-500">You haven't added any products yet.</p>
        ) : (

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 relative"
              >

                {/* three dot button */}
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === p._id ? null : p._id)
                  }
                  className="absolute top-2 right-2 text-xl"
                >
                  ⋮
                </button>

                {/* dropdown */}
                {openMenu === p._id && (
                  <div className="absolute right-2 top-8 bg-white shadow-md rounded border w-28 z-10">

                    <button
                      onClick={() => navigate(`/details/${p._id}`)}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => navigate(`/update/${p._id}`)}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="block w-full text-left px-3 py-2 text-red-500 hover:bg-red-100"
                    >
                      Delete
                    </button>

                  </div>
                )}

                <img
                //   src={`http://localhost:5000/api/uploads/${p.image}`}
                  src={getImageURL(p.image)}
                  alt={p.title}
                  className="w-full h-50 object-cover rounded mb-3"
                />

                <h3 className="font-semibold text-lg">{p.title}</h3>

                <p className="text-gray-600 text-sm mb-2">
                  {p.description}
                </p>

                <p className="font-bold text-blue-600">
                  रु {p.price}
                </p>

              </div>
            ))}

          </div>

        )}

      </div>

    </div>
  );
}