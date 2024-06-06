import { useQuery } from "@tanstack/react-query";
import { authService } from "../appwrite";

const useCurrentUser = () => {
  return useQuery({
    queryKey: ["login"],
    queryFn: async () => authService.getCurrentUser(),
  });
};

export default useCurrentUser;
