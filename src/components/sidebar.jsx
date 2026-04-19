import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, toggle }) {
  return (
    <div className={`bg-blue-600 text-white h-full w-64 p-4 fixed md:static top-0 left-0 z-40 transform ${isOpen ? "translate-x-0" : "-translate-x-64"} transition-transform md:translate-x-0`}>
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/dashboard/my-products" className="px-3 py-2 rounded hover:bg-blue-500" onClick={toggle}>My Products</Link>
        <Link to="/dashboard/add-product" className="px-3 py-2 rounded hover:bg-blue-500" onClick={toggle}>Add Product</Link>
        <Link to="/dashboard/profile" className="px-3 py-2 rounded hover:bg-blue-500" onClick={toggle}>Profile</Link>
        <Link to="/" className="px-3 py-2 rounded hover:bg-blue-500 mt-4" onClick={() => { localStorage.removeItem("token"); window.location.reload(); }}>Logout</Link>
      </nav>
    </div>
  );
}