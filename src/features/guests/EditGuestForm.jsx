import styled from "styled-components";

import StyledFormRow from "../../ui/FormRow";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useEditGuest } from "./useEditGuest";

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

function EditGuestForm({ guest = {}, onClose }) {
  const { id: editId, ...editValues } = guest;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: editId ? editValues : {},
  });
  const { errors } = formState;

  const { editGuest, isEditing } = useEditGuest();

  function onSubmit(data) {
    editGuest(
      {
        guestData: { ...data },
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
      <StyledFormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isEditing}
          {...register("fullName", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isEditing}
          {...register("nationalID", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="Phone" error={errors?.phone?.message}>
        <Input
          type="text"
          id="phone"
          disabled={isEditing}
          {...register("phone")}
        />
      </StyledFormRow>

      <StyledFormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isEditing}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </StyledFormRow>

      <StyledFormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          disabled={isEditing}
          {...register("nationality", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Country flag URL"
        error={errors?.countryFlag?.message}
      >
        <Input
          type="text"
          id="countryFlag"
          disabled={isEditing}
          {...register("countryFlag")}
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

export default EditGuestForm;
