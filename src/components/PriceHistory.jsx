const PriceHistory = ({ history }) => {
  console.log("history: ", history);
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-2xl font-bold mb-4">Previous Prices</h2>

      {history?.length === 0 ? (
        <p className="text-gray-500">No price history found</p>
      ) : (
        <div className="space-y-3">
          {history?.map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <span className="font-medium">₹ {item.price}</span>

              <span className="text-sm text-gray-500">
                {new Date(item.changedAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriceHistory;
