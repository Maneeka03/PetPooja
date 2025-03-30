import React, { useEffect } from "react";
import Dashboard from "./Components/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/header";
import InitialPopup from "./Components/initialPopup.jsx";

function App() {




  return (
    <main className="min-h-screen bg-background">
      {/* <MainNav /> */}
      <Header />
      <InitialPopup/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </main>
  );
}

export default App;
