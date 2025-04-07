import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import LogAuth from "./logauth";

function HomePage() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logauth" element={<LogAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
