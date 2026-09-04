import styled from "styled-components";

import StyledFormRow from "../../ui/FormRow";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";

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

function CreateCabinForm({ onClose }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  // function onCreateCabin(cabin) {
  //   console.log(cabin);
  //   createCabin(cabin);
  //   toast.success("Cabin successfully created");
  // }

  const { createCabinMutation, iscreating } = useCreateCabin();

  function onSubmit(data) {
    createCabinMutation(
      { ...data, image: data.image[0] },
      {
        onSuccess: () => onClose(),
      },
    );
  }

  // function onError(errors) {
  //   console.log(errors);
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledFormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={iscreating}
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
          disabled={iscreating}
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
          disabled={iscreating}
          {...register("regularPrice", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={iscreating}
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
        disabled={iscreating}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={iscreating}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={iscreating}
          accept="image/*"
          type="file"
          {...register("image", { required: "This field is required" })}
        />
      </StyledFormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={iscreating}>
          {iscreating ? "Creating..." : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
