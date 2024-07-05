import React from "react";
import Container from "../Container/Container";
import { Button } from "../Component/UI";
import { toast } from "react-toastify";
import { toastFunction } from "../utils/toastFunction";
import { dashBoardData } from "../appwrite";

function Statics() {
  return (
    <Container>
      <div>I am Static</div>
      <Button
        onClick={() => {
          toastFunction({ type: "warn", message: "Something Went Wrong" });
          dashBoardData.getTopBuyingCustomer();
        }}
      >
        Notify Him
      </Button>
    </Container>
  );
}

export default Statics;
