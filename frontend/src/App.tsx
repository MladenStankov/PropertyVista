import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EmailVerify from "./pages/EmailVerify";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify-email/:token" element={<EmailVerify />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
