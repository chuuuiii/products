import { Outlet, Link, NavLink } from "react-router-dom";

export default function ProductCategory() {
  const categories = [
    "All products",
    "Shoes",
    "Gadget",
    "Appliances",
    "Apparel",
    "Vehicle",
  ];

  return (
    <div className="flex font-poppins">
      <aside className="w-64 min-h-screen p-4 border-r shadow-lg px-9 text-gray-900 overflow-y-auto">
        {/* <div className="flex items-center mb-6">
          <h1 className="text-2xl font-semibold">CATEGORIES</h1>
        </div> */}
        <nav className="space-y-2">
          {categories.map((category, index) => (
            <NavLink
              key={index}
              to={category === "All products" ? "/" : `/category/${category}`}
              className={({ isActive }) =>
                `block px-3 py-3 rounded ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-100"
                }`
              }
            >
              {category}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex p-4">
        <Outlet />
      </main>
    </div>
  );
}
