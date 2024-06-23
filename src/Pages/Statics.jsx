import React from "react";
import Container from "../Container/Container";
import { Button } from "../Component/UI";
import { toast } from "react-toastify";
import { toastFunction } from "../utils/toastFunction";

function Statics() {
  return (
    <Container>
      <div>I am Static</div>
      <Button
        onClick={() =>
          toastFunction({ type: "warn", message: "Something Went Wrong" })
        }
      >
        Notify Him
      </Button>
    </Container>
  );
}

export default Statics;
