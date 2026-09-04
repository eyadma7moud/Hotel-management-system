import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin () {
  const queryClient = useQueryClient();

  const { mutate: editCabinMutation, isLoading: isEditing } = useMutation({
    mutationFn: ({ cabinData, id }) => createCabin(cabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabinMutation, isEditing };
}
