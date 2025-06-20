import React from "react";

export default function Alert(props) {
  return (
    props.alert && ( 
      <div
        className={`flex w-56 md:w-80 overflow-hidden bg-white rounded-lg shadow-md ${props.className}`}
      >
        <div className="flex items-center justify-center w-10 md:w-12 bg-emerald-500">
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
          </svg>
        </div>

        <div className="pb-1.5 px-4 md:py-2 -mx-3">
          <div className="mx-3">
            <span className="font-semibold text-emerald-500 text-sm md:text-base">
              {props.alert.type}
            </span>
            <p className="text-xs md:text-sm text-gray-600">{props.alert.msg}</p>
          </div>
        </div>
      </div>
    )
  );
}
