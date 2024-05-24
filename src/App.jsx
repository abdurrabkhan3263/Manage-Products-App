import { useState, useEffect } from "react";
import { Nav } from "./Component/SideNav/index";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./store/slice";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  // const dispatch = useDispatch();

  return (
    <main className="flex">
      <Nav />
      <Outlet />
    </main>
  );
}

export default App;
