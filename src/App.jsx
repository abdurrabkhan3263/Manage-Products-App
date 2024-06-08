import { useState, useEffect, useReducer, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, toggleDarkMode } from "./store/slice";
import { logout } from "./store/slice";
import useCurrentUser from "./Hook/useCurrentUser";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isError, isSuccess, isLoading } = useCurrentUser();

  const cartData = useSelector((state) => state.cart);
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      dispatch(login(data));
    } else if (isError) {
      navigate("/login");
      dispatch(logout());
    }
  }, [data, dispatch, isError, isSuccess, navigate]);
  useEffect(() => {
    console.log(cartData);
  }, [cartData]);

  return (
    <main className="overflow-hidden">
      {isLoading ? (
        <div>Loading.......</div>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </main>
  );
}

export default App;
