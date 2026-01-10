import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const token = localStorage.getItem("token");
  return user ? children : <Navigate to="/" />;
}