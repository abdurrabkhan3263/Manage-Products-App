import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { databaseService } from "../appwrite";

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
    console.log("Something Went Wrong While Adding The Order ::: ", error);
  },
});

export { addCartIntoDatabase };
