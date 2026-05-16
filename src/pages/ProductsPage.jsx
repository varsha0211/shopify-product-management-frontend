import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      console.log("data: ", data);
      setProducts(data.products.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("products ", products);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Shopify Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((item) => (
            <ProductCard key={item.node.id} product={item.node} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
