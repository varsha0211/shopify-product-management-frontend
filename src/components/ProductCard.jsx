import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const variant = product.variants.edges[0]?.node;
  const image = product.images?.edges?.[0]?.node?.url;

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden hover:shadow-lg transition max-w-sm">
      {/* IMAGE */}
      {image ? (
        <img
          src={image}
          alt={product.title}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500 text-sm">No Image</p>
        </div>
      )}

      {/* CONTENT */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 line-clamp-1">
          {product.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-bold text-green-600">₹ {variant?.price}</p>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {product.productType}
          </span>
        </div>

        <Link
          to={`/product/${encodeURIComponent(product.id)}`}
          className="block text-center bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
