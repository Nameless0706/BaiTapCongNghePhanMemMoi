export const Card = ({ product }) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg m-2">
      <img
        className="w-full h-64 object-cover"
        src="https://m.media-amazon.com/images/I/61Qe0euJJZL.jpg"
        alt={product.name}
      />
      <div className="px-6 py-4">
        <div className="font-semibold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
        <p className="text-gray-900 font-bold mt-2">${product.price}</p>
        <p className="text-sm text-gray-500">Views: {product.view}</p>
        {product.category && (
          <p className="text-sm text-gray-600">
            Category: {product.category.name || product.category}
          </p>
        )}
      </div>
    </div>
  );
};
