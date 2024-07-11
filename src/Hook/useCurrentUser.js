import { useQuery } from "@tanstack/react-query";
import { authService } from "../appwrite";

const useCurrentUser = () => {
  return useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const response = await authService.getCurrentUser();
      return response;
    },
  });
};
export default useCurrentUser;
