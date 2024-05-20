import { useState, useEffect } from "react";
import { Nav } from "./Component/SideNav/index";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="flex">
      <Nav />
      <Outlet />
    </main>
  );
}

export default App;
