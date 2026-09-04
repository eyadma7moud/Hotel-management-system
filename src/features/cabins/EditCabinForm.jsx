import styled from "styled-components";

import StyledFormRow from "../../ui/FormRow";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useEditCabin } from "./useEditCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function EditCabinForm({ cabin = {}, onClose }) {
  const { id: editId, ...editValues } = cabin;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editId ? editValues : {},
  });
  const { errors } = formState;

  const { editCabinMutation, isEditing } = useEditCabin();

  function onSubmit(data) {
    const image =
      data.image instanceof FileList && data.image.length > 0
        ? data.image[0]
        : editValues.image;

    editCabinMutation(
      {
        cabinData: { ...data, image },
        id: editId,
      },
      {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledFormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isEditing}
          {...register("name", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isEditing}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
            max: { value: 5, message: "Capacity should be at most 5" },
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isEditing}
          {...register("regularPrice", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isEditing}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price!",
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Description for website"
        disabled={isEditing}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isEditing}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isEditing}
          accept="image/*"
          type="file"
          {...register("image")}
        />
      </StyledFormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isEditing}>
          {isEditing ? "Updating..." : "Update"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default EditCabinForm;