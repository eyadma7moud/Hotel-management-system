import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getGuests } from "../../services/apiGuests";

export function useGuests(pageSize) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filterValue = searchParams.get("hasPhone");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "phone", value: filterValue === "has-phone" };

  // SORT
  const sortBy = searchParams.get("sortBy") || "sort-by-latest";

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data } = useQuery({
    queryKey: ["guests", filter, sortBy, page, pageSize],
    queryFn: () => getGuests({ filter, sortBy, page, pageSize }),
  });

  //? PRE-FETCHING
  const pageCount = Math.ceil(data?.count / pageSize);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["guests", filter, sortBy, page + 1, pageSize],
      queryFn: () => getGuests({ filter, sortBy, page: page + 1, pageSize }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["guests", filter, sortBy, page - 1, pageSize],
      queryFn: () => getGuests({ filter, sortBy, page: page - 1, pageSize }),
    });

  return {
    isLoading,
    guests: data?.data,
    count: data?.count,
  };
}
