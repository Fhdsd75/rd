import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Body";
import Footer from "./Footer";
import LogAuth from "./logauth";

function HomePage() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

function AuthPage() {
  return (
    <>
      <Header />
      <LogAuth />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logauth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
