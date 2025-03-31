import React, { useState, useEffect } from "react";
import { X, AlertTriangle, ShoppingCart } from "lucide-react";

const InventoryAlertPopup = ({ isOpen, onClose }) => {
  // State for controlling popup visibility and storing inventory data
  const [showPopup, setShowPopup] = useState(isOpen);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Constants
  const STOCK_LOW = 10;

  // Fetch inventory data from API
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://10.21.23.212:8888/get_inventory_item"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch inventory data");
        }
        const data = await response.json();
        setInventoryData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load inventory data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []);

  // Filter bad and rotten items
  const badItems = inventoryData.filter((item) => item.quality === "Bad");
  const rottenItems = inventoryData.filter((item) => item.quality === "Rotten");

  // Calculate totals for badge display
  const totalBadItems = badItems.length;
  const totalRottenItems = rottenItems.length;

  // Update the showPopup state when isOpen prop changes
  useEffect(() => {
    setShowPopup(isOpen);
  }, [isOpen]);

  // Only show popup if there are issues to report
  const hasIssues = totalBadItems > 0 || totalRottenItems > 0;

  // Function to close the popup
  const handleClose = () => {
    setShowPopup(false);
    if (onClose) onClose();
  };

  // Calculate percent of life remaining for progress bar
  const getLifePercentage = (remaining, max) => {
    return (remaining / max) * 100;
  };

  // Get appropriate color class based on percentage
  const getLifeColorClass = (percentage) => {
    if (percentage <= 25) return "bg-red-500";
    if (percentage <= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (!showPopup || (!hasIssues && !loading)) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Inventory Quality Alert
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Some items in your inventory require immediate attention:
                  </p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="mt-4 p-4 bg-red-50 rounded-md text-red-600 text-sm">
                {error}
              </div>
            ) : (
              <div className="mt-4 max-h-96 overflow-y-auto">
                {totalBadItems > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-yellow-600 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Bad Quality Items ({totalBadItems})
                    </h4>
                    <ul className="mt-2 space-y-3">
                      {badItems.map((item) => (
                        <li
                          key={`bad-${item.ingredient}`}
                          className="text-sm bg-yellow-50 rounded-md p-3"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">
                              {item.ingredient}
                            </span>
                            <span className="font-medium text-yellow-600">
                              {item.quality}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>{item.category}</span>
                            <span>Updated: {item.time_since_last_update}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs w-24">
                              Life remaining:
                            </span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                              <div
                                className={`${getLifeColorClass(
                                  getLifePercentage(
                                    item.remaining_life,
                                    item.max_life
                                  )
                                )} h-2 rounded-full`}
                                style={{
                                  width: `${getLifePercentage(
                                    item.remaining_life,
                                    item.max_life
                                  )}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs ml-2 w-16 text-right">
                              {item.remaining_life}/{item.max_life} days
                            </span>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-xs">
                              Quantity: {item.quantity} units
                            </span>
                            <span className="text-xs">
                              Price: ${item.price}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {totalRottenItems > 0 && (
                  <div>
                    <h4 className="font-medium text-red-600 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Rotten Items ({totalRottenItems})
                    </h4>
                    <ul className="mt-2 space-y-3">
                      {rottenItems.map((item) => (
                        <li
                          key={`rotten-${item.ingredient}`}
                          className="text-sm bg-red-50 rounded-md p-3"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">
                              {item.ingredient}
                            </span>
                            <span className="font-medium text-red-600">
                              {item.quality}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>{item.category}</span>
                            <span>Updated: {item.time_since_last_update}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs w-24">
                              Life remaining:
                            </span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                              <div
                                className="bg-red-500 h-2 rounded-full"
                                style={{
                                  width: `${getLifePercentage(
                                    item.remaining_life,
                                    item.max_life
                                  )}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs ml-2 w-16 text-right">
                              {item.remaining_life}/{item.max_life} days
                            </span>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-xs">
                              Quantity: {item.quantity} units
                            </span>
                            <span className="text-xs">
                              Price: ${item.price}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!hasIssues && (
                  <div className="p-4 text-center text-green-600">
                    No quality issues found in inventory.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleClose}
            >
              Close
            </button>
          </div>

          {/* Close button at top right */}
          <button
            className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryAlertPopup;
