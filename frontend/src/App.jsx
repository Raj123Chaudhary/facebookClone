import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../components/Navbar";
import Feed from "../pages/Feed";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import OpenRoute from "../components/OpenRoute";
import PrivateRoute from "../components/PrivateRoute";

function App() {
  console.log("raj");
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
