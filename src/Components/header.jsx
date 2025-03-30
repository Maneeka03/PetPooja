import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Camera } from "lucide-react";
import Dashboard from "./dashboard";

export default function Header() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

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
        </nav>
      </header>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Smart Kitchen Dashboard</h1>
      </div>

      <div className="px-6">
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
              setActiveTab("spoilage"); // Navigate to the "spoilage" route
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
      </div>
      <Dashboard activeTab={activeTab} />
    </div>
  );
}
