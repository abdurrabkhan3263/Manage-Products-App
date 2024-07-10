import React, { useState } from "react";
import Container from "../Container/Container";
import { ProductList, ProductTotal } from "../Component";
import SearchSection from "../Component/ProductCart/Product Table/SearchSection";
import { Outlet } from "react-router-dom";

function Cart() {
  return (
    <Container
      className={"relative flex flex-col gap-y-3 sm:grid sm:grid-rows-12"}
    >
      <Outlet />
      <div className="col-span-7 rounded-xl bg-slate-200 py-2.5 font-semibold sm:row-start-1 sm:row-end-3 sm:px-4 sm:py-4">
        <SearchSection />
      </div>
      <ProductList />
      <ProductTotal />
    </Container>
  );
}

export default Cart;
