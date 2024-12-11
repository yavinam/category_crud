import { request } from '@/api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ProductCreate = () => {
  const token = useSelector((s) => s.token.value);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    request.get('/product-category/get').then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    product.price = +product.price;
    product.categoryId = +product.categoryId;
    product.stock = +product.stock;
    product.average_rating = 0;

    request.post('/product/create', product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    e.target.reset();
    alert('Product successfully created!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Create a New Product</h1>
          <p className="text-gray-600">Add new products to your inventory with ease.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              className="border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="description" className="text-gray-700 font-medium">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              className="border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label htmlFor="price" className="text-gray-700 font-medium">
              Price
            </label>
            <input
              type="number"
              name="price"
              className="border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Image */}
          <div className="flex flex-col">
            <label htmlFor="image" className="text-gray-700 font-medium">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              className="border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label htmlFor="categoryId" className="text-gray-700 font-medium">
              Category
            </label>
            <select
              name="categoryId"
              className="border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label htmlFor="stock" className="text-gray-700 font-medium">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              className="border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter stock quantity"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreate;