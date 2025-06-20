import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Alert from "./components/Alert";
import TheFooter from "./components/TheFooter";
import TheHeader from "./components/TheHeader";

import Home from "./components/pages/Home";
import About from "./components/pages/About";

function App() {
  const [alert, setAlert] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // default theme

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 2500);
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`min-h-screen ${darkMode ? "bg-[#0F172A]" : "bg-white"} transition-colors duration-300 text-${darkMode ? "white" : "black"}`}>
        <BrowserRouter>
          <TheHeader toggleTheme={toggleTheme} isDark={darkMode} />
          <Alert alert={alert} className="absolute top-28 right-3 md:top-10 md:right-10" />
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} isDark={darkMode} />} />
            <Route path="about" element={<About />} />
          </Routes>
          <TheFooter />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
