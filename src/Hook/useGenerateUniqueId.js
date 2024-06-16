import React, { useEffect, useState } from "react";
import { ID } from "appwrite";

function useGenerateUniqueId() {
  let newId = "";
  let id = ID.unique();
  newId = `${id}`;
  return newId;
}

export default useGenerateUniqueId;
