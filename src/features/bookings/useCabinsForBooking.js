import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabinsForBooking() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins-all"],
    queryFn: getCabins,
  });

  return { isLoading, cabins };
}