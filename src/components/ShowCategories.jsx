import { request } from '@/api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ShowCategories = () => {
  const token = useSelector((s) => s.token.value);
  const [categories, setCategories] = useState(null);
  const [editData, setEditData] = useState(null); // Tahrirlash uchun ma'lumot
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    request.get('/product-category/get').then((res) => setCategories(res.data));
  }, [deleteStatus]);

  const handleDelete = (id) => {
    request
      .delete(`/product-category/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => alert('Category deleted successfully'))
      .catch(() => alert('Cannot delete this category'))
      .finally(() => setDeleteStatus(!deleteStatus));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedCategory = Object.fromEntries(new FormData(e.target));

    request
      .put(`/product-category/update/${editData.id}`, updatedCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert('Category updated successfully');
        setEditData(null);
        setDeleteStatus(!deleteStatus); // Ma'lumotlarni yangilash
      })
      .catch(() => alert('Failed to update category'));
  };

  const categoryItems = categories?.map((category) => (
    <div
      key={category.id}
      className="w-80 p-5 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-all flex flex-col gap-4 items-center"
    >
      <h3 className="text-lg font-semibold text-blue-700">{category.name}</h3>
      <p className="text-sm text-gray-600 text-center truncate w-full" title={category.description}>
        {category.description}
      </p>
      <div className="flex gap-4 w-full justify-center">
        <button
          onClick={() => handleDelete(category.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
        >
          Delete
        </button>
        <button
          onClick={() => setEditData(category)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Edit
        </button>
      </div>
    </div>
  ));

  return (
    <div className="w-full p-6 flex flex-col gap-8">
      <h2 className="text-4xl font-bold text-gray-800 text-center">Categories</h2>
      <div className="flex gap-6 flex-wrap justify-center container mx-auto">
        {categoryItems?.length > 0 ? (
          categoryItems
        ) : (
          <p className="text-gray-600 text-lg">No categories available.</p>
        )}
      </div>

      {/* Edit Modal */}
      {editData && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[40%]">
            <h3 className="text-2xl font-bold mb-4 text-center">Edit Category</h3>
            <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="name"
                defaultValue={editData.name}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <textarea
                name="description"
                defaultValue={editData.description}
                className="p-3 border border-gray-300 rounded-lg"
              ></textarea>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setEditData(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCategories;