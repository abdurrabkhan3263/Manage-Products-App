import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, toggleDarkMode } from "./store/slice";
import { logout } from "./store/slice";
import useCurrentUser from "./Hook/useCurrentUser";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isError, isSuccess, isLoading } = useCurrentUser();
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      dispatch(login(data));
    } else if (isError) {
      navigate("/login");
      dispatch(logout());
    }
  }, [data, isError, isSuccess]);
  return <main>{isLoading ? <div>Loading.......</div> : <Outlet />}</main>;
}

export default App;
