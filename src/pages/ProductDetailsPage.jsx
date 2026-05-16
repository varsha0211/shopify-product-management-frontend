import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getSingleProduct,
  getPriceHistory,
  updatePrice,
} from "../api/productApi";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [prices, setPrices] = useState({});

  // FETCH PRODUCT + HISTORY
  const fetchData = async () => {
    try {
      const productData = await getSingleProduct(id);
      const historyData = await getPriceHistory(id);
      setProduct(productData.product);
      setHistory(historyData.history || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // HANDLE INPUT
  const handlePriceChange = (variantId, value) => {
    setPrices((prev) => ({
      ...prev,
      [variantId]: value,
    }));
  };

  // UPDATE PRICE
  const handleUpdatePrice = async (variantId, oldPrice) => {
    try {
      setUpdatingId(variantId);
      const newPrice = prices[variantId];
      if (!newPrice) {
        toast.error("Please enter new price");
        return;
      }
      await updatePrice(variantId, {
        productId: product.id,
        title: product.title,
        oldPrice,
        newPrice,
      });
      await fetchData();
      toast.success("Price updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update price");
    } finally {
      setUpdatingId("");
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading Product...</h1>
      </div>
    );
  }

  // PRODUCT IMAGE
  const image = product.images?.edges?.[0]?.node?.url;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* BACK BUTTON */}
        <Link
          to="/"
          className="inline-block mb-5 text-blue-600 text-sm font-semibold hover:underline"
        >
          ← Back to Products
        </Link>

        {/* PRODUCT DETAILS */}
        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {image ? (
                <img
                  src={image}
                  alt={product.title}
                  className="w-full h-[320px] object-cover rounded-lg border"
                />
              ) : (
                <div className="w-full h-[320px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-sm">No Image</p>
                </div>
              )}
            </div>

            {/* PRODUCT INFO */}
            <div>
              <h1 className="text-3xl font-bold mb-3">{product.title}</h1>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                  Vendor: {product.vendor}
                </span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                  Type: {product.productType}
                </span>
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs">
                  {product.status}
                </span>
              </div>

              {/* DESCRIPTION */}
              <div className="mb-5">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700 text-sm leading-6">
                  {product.description}
                </p>
              </div>

              {/* META */}
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-semibold">Created At:</span>{" "}
                  {new Date(product.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Updated At:</span>{" "}
                  {new Date(product.updatedAt).toLocaleString()}
                </p>

                {/* TAGS */}
                <div>
                  <span className="font-semibold">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VARIANTS */}
        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <h2 className="text-2xl font-bold mb-4">Product Variants</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3 text-sm">Variant</th>
                  <th className="text-left p-3 text-sm">SKU</th>
                  <th className="text-left p-3 text-sm">Current Price</th>
                  <th className="text-left p-3 text-sm">Update Price</th>
                </tr>
              </thead>

              <tbody>
                {product.variants.edges.map(({ node }) => (
                  <tr key={node.id} className="border-b">
                    <td className="p-3 text-sm">{node.title}</td>
                    <td className="p-3 text-sm">{node.sku || "N/A"}</td>
                    <td className="p-3 text-sm font-bold text-green-600">
                      ₹ {node.price}
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="New Price"
                          value={prices[node.id] || ""}
                          onChange={(e) =>
                            handlePriceChange(node.id, e.target.value)
                          }
                          className="border rounded-lg px-3 py-2 text-sm outline-none"
                        />
                        <button
                          onClick={() => handleUpdatePrice(node.id, node.price)}
                          disabled={updatingId === node.id}
                          className="bg-black text-white px-4 py-2 text-sm rounded-lg hover:bg-gray-800 disabled:opacity-50"
                        >
                          {updatingId === node.id ? "Updating..." : "Update"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PRICE HISTORY */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-2xl font-bold mb-4">Previous Price History</h2>
          {history.length === 0 ? (
            <p className="text-gray-500 text-sm">No previous prices found</p>
          ) : (
            <div className="space-y-3">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div className="font-semibold text-base">₹ {item.price}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(item.changedAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
