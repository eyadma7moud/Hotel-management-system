import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuest as createGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useEditGuest() {
  const queryClient = useQueryClient();

  const { mutate: editGuest, isPending: isEditing } = useMutation({
    mutationFn: ({ guestData, id }) => createGuestApi(guestData, id),
    onSuccess: () => {
      toast.success("Guest successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editGuest, isEditing };
}
