import React from "react";

const Products = ({ data }) => {
  const productItems = data?.map((product) => (
    <div
      key={product.id}
      className="w-80 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
    >
      <img
        src={product.image}
        className="w-full h-64 object-cover rounded-t-lg"
        alt={product.name}
      />
      <div className="p-3">
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <p className="text-lg font-medium text-gray-600">{product.price} USD</p>
        <button className="mt-3 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  ));

  return (
    <div className="flex gap-4 flex-wrap container mx-auto mt-6">
      {productItems}
    </div>
  );
};

export default Products;
