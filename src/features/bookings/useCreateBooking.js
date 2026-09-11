import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createBookingMutation, isLoading: iscreating } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("Booking successfully created");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createBookingMutation, iscreating };
}
