import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Camera } from "lucide-react";
import Dashboard from "./dashboard";
import InitialPopup from "./initialPopup"

export default function Header() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPopup, setShowPopup] = useState(false);
  
  // Show popup automatically when user first visits the page
  useEffect(() => {
    // Show popup only on initial page load
    setShowPopup(true);
  }, []);
  
  // Function to open popup when button is clicked
  const handleOpenPopup = () => {
    setShowPopup(true);
  };
  
  // Function to close popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  

  const tabList = ["overview", "inventory", "spoilage", "operations", "foodRecommendation", "restaurentInventory"];

  return (
    <div className="flex flex-col">
      <header className="border-b border-gray-200 p-4 flex items-center">
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
          <div className="text-gray-500 float-right">
          <button 
            onClick={handleOpenPopup}
           >
            Alerts
          </button>
          
      </div>
      
      {/* Render the Inventory Alert Popup with props */}
      <InitialPopup 
        isOpen={showPopup} 
        onClose={handleClosePopup} 
      />
        </nav>
      </header>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Smart Kitchen Dashboard</h1>
      </div>


      <div className="px-6">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          {tabList.map((data, index) => {
            return (
              <button
                key={index}
                onClick={() => setActiveTab(data)}
                className={`px-4 py-2 rounded-md ${activeTab === data ? "bg-white shadow" : ""
                  }`}
              >
                {data}
              </button>
            );
          })}



        </div>
      </div>
      <Dashboard activeTab={activeTab} />
    </div>
  );
}
