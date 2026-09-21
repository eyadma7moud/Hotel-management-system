import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";

import { useSearchParams } from "react-router-dom";

export function useBooking(pageSize) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortBy = searchParams.get("sortBy") || "sort-by-date-(recent-first)";

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data } = useQuery({
    queryKey: ["bookings", filter, sortBy, page, pageSize],
    queryFn: () => getBookings({ filter, sortBy, page, pageSize }),
  });

  //? PRE-FETCHING
  const pageCount = Math.ceil(data?.count / pageSize);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1, pageSize],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1, pageSize }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1, pageSize],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1, pageSize }),
    });

  return {
    isLoading,
    bookings: data?.data,
    count: data?.count,
  };
}
