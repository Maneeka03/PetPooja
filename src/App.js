import React from "react";
import Dashboard from "./Components/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpoilagePrediction } from "./Components/spoilage-prediction";
import Header from "./Components/header";

function App() {
  return (
    <main className="min-h-screen bg-background">
      {/* <MainNav /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/spoilage" element={<SpoilagePrediction />} />
      </Routes>
    </main>
  );
}

export default App;
