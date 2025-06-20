import React from "react";
import { NavLink } from "react-router-dom";

export default function TheHeader({ toggleTheme, isDark }) {
  const activeClassName = "border-b-2 border-blue-500 font-semibold";

  return (
    <header>
      <nav className="container">
        <div className="p-5 relative flex flex-col md:flex-row justify-between items-center">
          <NavLink
            className="text-2xl font-bold text-center lg:text-3xl hover:text-blue-500"
            to="/"
          >
            TEXT ANALYZER
          </NavLink>

          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? activeClassName
                  : "border-b-2 border-transparent hover:text-blue-500 font-semibold"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="about"
              className={({ isActive }) =>
                isActive
                  ? activeClassName
                  : "border-b-2 border-transparent hover:text-blue-500 font-semibold"
              }
            >
              About
            </NavLink>

            <button
              onClick={toggleTheme}
              className="ml-4 px-3 py-1 border rounded-full text-sm bg-gray-200 dark:bg-gray-700"
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
