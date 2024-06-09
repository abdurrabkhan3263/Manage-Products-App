import React from "react";
import Container from "../Container/Container";
import { ProductList, ProductTotal } from "../Component";

function Cart() {
  return (
    <Container className={"grid grid-cols-6 grid-rows-6"}>
      <div className="col-span-6 col-end-7 flex items-center justify-center border-b-2 border-black text-4xl font-semibold">
        Your Cart
      </div>
      <ProductList />
      <ProductTotal />
    </Container>
  );
}

export default Cart;
