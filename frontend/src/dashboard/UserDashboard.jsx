import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function UserDashboard() {
  return (
    <div className="flex font-roboto">
      <aside className="w-64 border-r shadow-lg min-h-screen p-4 px-9 text-gray-900 overflow-y-auto">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <nav className="space-y-2">
          <Link
            to="/user/products"
            className="block px-3 py-3 hover:bg-gray-100 rounded"
          >
            Product
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
