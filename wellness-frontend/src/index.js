import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ TEMP TOKEN (FOR MILESTONE 3 DEMO)
localStorage.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJpYXQiOjE3NjgzODUxMTgsImV4cCI6MTc2ODQ3MTUxOH0.5MP6F7KvXXeY-KZUqgr_Ek_ffH2McdG2hbIGQ7KKO7Y"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
