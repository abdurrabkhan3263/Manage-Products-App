import { useState, useEffect } from "react";
import { Nav } from "./Component/SideNav/index";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./store/slice";
import { authService } from "./appwrite";
import { useQuery } from "@tanstack/react-query";
import { logout } from "./store/slice";
import Login from "./Pages/Login";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log(userData);
        } else {
          navigate("/addaccount");
          dispatch(logout());
        }
      })
      .catch(() => {
        navigate("/addaccount");
        dispatch(logout());
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <main className="flex">
      {isLoading ? (
        <div>Loading......</div>
      ) : userData.status ? (
        <>
          <Nav />
          <Outlet />
        </>
      ) : (
        <Login />
      )}
    </main>
  );
}

export default App;
