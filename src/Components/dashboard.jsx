import { SpoilagePrediction } from "./spoilage-prediction";
import { InventoryTracker } from "./inventory-trackor";
import { OperationsOptimizer } from "./operation-optimizer";
import FoodRecommendation from "./FoodRecommendation";
import RestaurentInventory from "./Restaurant-Inventory";

export default function Dashboard({ activeTab }) {
  const vegetableInventory = [
    { name: "Tomatoes", quantity: 8, quality: "Poor" },
    { name: "Carrots", quantity: 5, quality: "Fair" },
    { name: "Spinach", quantity: 4, quality: "Poor" },
    { name: "Cabbage", quantity: 15, quality: "Good" },
    { name: "Onions", quantity: 7, quality: "Fair" },
    { name: "Bell Peppers", quantity: 9, quality: "Poor" },
    { name: "Mushrooms", quantity: 12, quality: "Good" },
    { name: "Broccoli", quantity: 6, quality: "Fair" },
    { name: "Potatoes", quantity: 20, quality: "Good" },
    { name: "Zucchini", quantity: 10, quality: "Fair" },
  ];

  return (
    <div className="flex flex-col">
      {/* Header/Navigation */}
      {/* <header className="border-b border-gray-200 p-4 flex items-center">
        <div className="flex items-center space-x-2">
          <Camera className="h-6 w-6" />
          <span className="font-bold">SmartKitchen AI</span>
        </div>
        <nav className="ml-8 space-x-6">
          <a href="#" className="font-medium">
            Dashboard
          </a>
          <a href="#" className="text-gray-500">
            Reports
          </a>
          <a href="#" className="text-gray-500">
            Settings
          </a>
        </nav>
      </header> */}

      {/* Dashboard Title */}
      {/* <div className="p-6">
        <h1 className="text-3xl font-bold">Smart Kitchen Dashboard</h1>
      </div> */}

      {/* Tabs */}
      {/* <div className="px-6">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "overview" ? "bg-white shadow" : ""
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            
            className={`px-4 py-2 rounded-md ${
              activeTab === "inventory" ? "bg-white shadow" : ""
            }`}
          >
            Inventory Tracking
          </button>
          <button
             onClick={() => {
                setActiveTab("spoilage");
                navigate("/spoilage"); // Navigate to the "spoilage" route
              }}
            className={`px-4 py-2 rounded-md ${
              activeTab === "spoilage" ? "bg-white shadow" : ""
            }`}
          >
            Spoilage Prediction
          </button>
          <button
            onClick={() => setActiveTab("operations")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "operations" ? "bg-white shadow" : ""
            }`}
          >
            Operations Optimizer
          </button>
        </div>
      </div> */}

      {/* Dashboard Content */}
      <div>
        {activeTab === "Overview" && (
          <div className="p-7">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 ">
              <StatCard
                title="Total Inventory Items"
                value="142"
                change="+2.5% from last week"
                positive={true}
              />
              <StatCard
                title="Items Near Expiry"
                value="12"
                change="-4% from last week"
                positive={true}
              />
              <StatCard
                title="Waste Reduction"
                value="24%"
                change="+5.2% improvement"
                positive={true}
              />
              <StatCard
                title="Efficiency Score"
                value="86%"
                change="+2.1% from last month"
                positive={true}
              />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">
                      Inventory Overview
                    </h2>
                  </div>
                  <div className="p-4 h-96">
                    <InventoryChart />
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">
                      Upcoming Expirations
                    </h2>
                    <p className="text-sm text-gray-500">
                      Items that need attention in the next 48 hours
                    </p>
                  </div>
                  <div className="p-4">
                    <ExpirationItem
                      name="Fresh Salmon"
                      quantity="2.5 kg"
                      expires="Today"
                      urgent={true}
                    />
                    <ExpirationItem
                      name="Organic Spinach"
                      quantity="1.2 kg"
                      expires="Today"
                      urgent={true}
                    />
                    <ExpirationItem
                      name="Heavy Cream"
                      quantity="0.8 L"
                      expires="Tomorrow"
                      urgent={false}
                    />
                    <ExpirationItem
                      name="Ground Beef"
                      quantity="3 kg"
                      expires="Tomorrow"
                      urgent={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="text-center p-7 text-gray-500">
            <InventoryTracker />
          </div>
        )}
        {activeTab === "spoilage" && (
          <div className="text-center p-7 text-gray-500">
            <SpoilagePrediction />
          </div>
        )}
        {activeTab === "operations" && (
          <div className="text-center p-7 text-gray-500">
            <OperationsOptimizer />
          </div>
        )}
        {activeTab === "restaurentInventory" && (
          <div className="text-center p-7 text-gray-500">
            <RestaurentInventory />
          </div>
        )}
        {activeTab === "foodRecommendation" && (
          <div className="text-center p-7 text-gray-500">
            <FoodRecommendation vegetables={vegetableInventory} />
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
const StatCard = ({ title, value, change, positive }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm text-gray-500">{change}</p>
    </div>
  );
};

// Expiration Item Component
const ExpirationItem = ({ name, quantity, expires, urgent }) => {
  return (
    <div className="flex items-start mb-4">
      <div
        className={`mt-1.5 w-2 h-2 rounded-full ${
          urgent ? "bg-red-500" : "bg-yellow-500"
        } mr-3`}
      />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">
          {quantity} • Expires: {expires}
        </p>
      </div>
    </div>
  );
};

// Inventory Chart Component
const InventoryChart = () => {
  // Chart data with taller bars
  const chartData = [
    { day: "Mon", values: [23, 18, 12, 29] },
    { day: "Tue", values: [21, 16, 10, 28] },
    { day: "Wed", values: [27, 20, 15, 32] },
    { day: "Thu", values: [26, 19, 13, 30] },
    { day: "Fri", values: [31, 22, 18, 33] },
    { day: "Sat", values: [38, 26, 22, 36] },
    { day: "Sun", values: [30, 20, 16, 31] },
  ];

  // Colors for different bar types
  const colors = ["bg-green-400", "bg-blue-400", "bg-red-400", "bg-yellow-400"];

  return (
    <div className="h-full flex items-end justify-between pt-6">
      {chartData.map((data, index) => (
        <div key={index} className="flex flex-col items-center w-full">
          <div className="w-full flex items-end justify-center space-x-1 mb-2">
            {data.values.map((value, i) => (
              <div
                key={i}
                className={`${colors[i]} w-4`}
                style={{ height: `${value * 6}px` }}
              />
            ))}
          </div>
          <div className="text-xs text-gray-500">{data.day}</div>
        </div>
      ))}
    </div>
  );
};
