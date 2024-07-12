import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, toggleDarkMode } from "./store/slice";
import { logout } from "./store/slice";
import useCurrentUser from "./Hook/useCurrentUser";
import { databaseService } from "./appwrite";
import { addProduct } from "./store/thunkFile";
import "react-toastify/dist/ReactToastify.css";
import { MainLoader } from "./Assets";
import { internet__off } from "../public/Assets";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  const [isOnline, setIsOffline] = useState(navigator.onLine);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isError, isSuccess, isLoading } = useCurrentUser();
  const currentUser = useSelector((state) => state.user.user?.$id);

  useEffect(() => {
    if (isSuccess && data) {
      navigate("/");
      dispatch(login(data));
    } else if (isError) {
      navigate("/login");
      dispatch(logout());
    }
  }, [data, dispatch, isError, isSuccess, navigate]);
  useEffect(() => {
    if (data) {
      (async function () {
        const response = await databaseService.getAllOrder(currentUser);
        if (response && response.documents.length > 0) {
          dispatch(addProduct({ fromDataBase: response.documents.reverse() }));
        }
      })();
    }
  }, [currentUser, navigate, data]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(true);
    };
    const handleOffline = () => {
      setIsOffline(false);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <img
          src={internet__off}
          alt="Please connect to the internet"
          className="w-[50%]"
        />
      </div>
    );
  }
  return (
    <main className="overflow-hidden">
      {isLoading ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <MainLoader />
        </div>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </main>
  );
}

export default App;
