import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// FETCH ALL PRODUCTS
export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

// FETCH SINGLE PRODUCT
export const getSingleProduct = async (productId) => {
  const encodedId = encodeURIComponent(productId);
  const response = await API.get(`/products/${encodedId}`);
  return response.data;
};

// FETCH PRICE HISTORY
export const getPriceHistory = async (productId) => {
  const encodedId = encodeURIComponent(productId);
  const response = await API.get(`/products/price/history/${encodedId}`);
  return response.data.priceHistory;
};

// UPDATE PRODUCT PRICE
export const updatePrice = async (variantId, body) => {
  const encodedId = encodeURIComponent(variantId);
  const response = await API.put(`/products/${encodedId}`, body);
  return response.data;
};
