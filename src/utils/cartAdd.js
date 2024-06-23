import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { databaseService } from "../appwrite";
import { toastFunction } from "./toastFunction";

const useQuery = useQueryClient();
const addCartIntoDatabase = useMutation({
  mutationKey: ["addCart"],
  mutationFn: async (id, data) => {
    return await databaseService.createOrder(id, data);
  },
  onSuccess: (successData) => {
    useQuery.invalidateQueries({ queryKey: ["addOrder"] });
  },
  onError: (error) => {
    toastFunction({
      type: "error",
      message: "Something went wrong while adding the cart",
    });
  },
});

export { addCartIntoDatabase };
