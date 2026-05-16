import { useState } from "react";

const UpdatePriceForm = ({ currentPrice, onUpdate }) => {
  const [newPrice, setNewPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onUpdate(newPrice);
    setNewPrice("");
    setLoading(false);
  };

  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-2xl font-bold mb-4">Update Price</h2>

      <p className="mb-4 text-lg">
        Current Price:
        <span className="font-bold text-green-600 ml-2">₹ {currentPrice}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Enter new price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Price"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePriceForm;
