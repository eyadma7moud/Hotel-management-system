import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export function useGuests() {
  const { isLoading, data } = useQuery({
    queryKey: ["guests-all"],
    queryFn: () => getGuests({}),
  });

  return { isLoading, guests: data?.data };
}
