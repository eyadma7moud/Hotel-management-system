import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useEditBooking() {
  const queryClient = useQueryClient();

  const { mutate: editBookingMutation, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, obj }) => updateBooking(id, obj),
    onSuccess: () => {
      toast.success("Booking successfully updated");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editBookingMutation, isEditing };
}
