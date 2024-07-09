import React, { useState } from "react";
import Container from "../Container/Container";
import { ProductList, ProductTotal } from "../Component";
import SearchSection from "../Component/ProductCart/Product Table/SearchSection";
import { Outlet } from "react-router-dom";

function Cart() {
  return (
    <Container className={"relative grid grid-rows-12 gap-y-3"}>
      <Outlet />
      <div className="col-span-7 row-start-1 row-end-3 bg-slate-200 font-semibold sm:rounded-xl sm:px-4 sm:py-4">
        <SearchSection />
      </div>
      <ProductList />
      <ProductTotal />
    </Container>
  );
}

export default Cart;
