import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, toggleDarkMode } from "./store/slice";
import { logout } from "./store/slice";
import useCurrentUser from "./Hook/useCurrentUser";
import { databaseService } from "./appwrite";
import { addProduct } from "./store/thunkFile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Bounce } from "react-toastify";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isError, isSuccess, isLoading } = useCurrentUser();
  const currentUser = useSelector((state) => state.user.user?.$id);
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
    (async function () {
      const response = await databaseService.getAllOrder(currentUser);
      if (response && response.documents.length > 0) {
        dispatch(addProduct({ fromDataBase: response.documents.reverse() }));
      }
    })();
  }, [currentUser, navigate]);

  return (
    <main className="overflow-hidden">
      {isLoading ? (
        <div>Loading.......</div>
      ) : (
        <>
          <Outlet />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition:Bounce
          />
        </>
      )}
    </main>
  );
}

export default App;
