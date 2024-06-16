import React from "react";
import Container from "../Container/Container";
import { ProductList, ProductTotal } from "../Component";
import { Input } from "../Component/UI";
import { Search } from "../../public/Assets";

function Cart() {
  return (
    <Container className={"grid grid-rows-12 gap-y-3"}>
      <div className="col-span-7 row-start-1 row-end-3 rounded-xl bg-lightblue p-4 font-semibold">
        <div className="bg-blue flex w-full justify-between">
          <Input className="w-full flex-grow" />
          <span className="flex-grow-0">
            <Search />
          </span>
        </div>
      </div>
      <ProductList />
      <ProductTotal />
    </Container>
  );
}

export default Cart;
