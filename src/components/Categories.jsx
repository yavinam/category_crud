import { request } from "@/api";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const token = useSelector((s) => s.token.value);
  const navigate = useNavigate();

  const handleCreateCategory = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const category = Object.fromEntries(formData);

    request
      .post("/product-category/create", category, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        e.target.reset();
        alert("New category successfully added!");
      })
      .catch((err) => {
        alert("Error adding category: " + err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg relative">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Manage Categories
          </h2>
          <p className="text-gray-600">
            Create and organize your product categories effortlessly.
          </p>
        </div>

        {/* Form Section */}
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleCreateCategory}>
          <input
            className="border-2 border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            type="text"
            name="name"
            placeholder="Category Name"
          />
          <textarea
            className="border-2 border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            name="description"
            placeholder="Category Description"
          ></textarea>
          <button
            className="w-full p-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition duration-300"
            type="submit"
          >
            Create Category
          </button>
        </form>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/showcategories")}
            className="flex-1 p-3 rounded-lg font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 shadow-md hover:shadow-lg transition duration-300"
          >
            View All Categories
          </button>
          <button
            onClick={() => alert("This feature is coming soon!")}
            className="flex-1 p-3 rounded-lg font-medium text-white bg-blue-400 hover:bg-blue-500 shadow-md hover:shadow-lg transition duration-300"
          >
            Export Categories
          </button>
        </div>

        {/* Floating Help Button */}
        <button
          onClick={() => alert("Need help? Contact support!")}
          className="absolute bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300"
          title="Help"
        >
          ?
        </button>
      </div>
    </div>
  );
};

export default Categories;
