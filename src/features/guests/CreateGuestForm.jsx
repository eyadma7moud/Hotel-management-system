import styled from "styled-components";

import StyledFormRow from "../../ui/FormRow";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useCreateGuest } from "./useCreateGuest";
import { COUNTRIES } from "../../data/countries";

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

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function CreateGuestForm({ onClose }) {
  const { register, handleSubmit, reset, setValue, formState } = useForm();
  const { errors } = formState;

  const { createGuest, isCreating } = useCreateGuest();

  function onSubmit(data) {
    createGuest(
      { ...data },
      {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      },
    );
  }

  function handleNationalityChange(e) {
    const selected = COUNTRIES.find((c) => c.name === e.target.value);
    setValue(
      "countryFlag",
      selected ? `https://flagcdn.com/${selected.code}.svg` : "",
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledFormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreating}
          {...register("fullName", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isCreating}
          {...register("nationalID", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="Phone" error={errors?.phone?.message}>
        <Input
          type="text"
          id="phone"
          disabled={isCreating}
          {...register("phone")}
        />
      </StyledFormRow>

      <StyledFormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreating}
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
        <StyledSelect
          id="nationality"
          disabled={isCreating}
          defaultValue=""
          {...register("nationality", {
            required: "This field is required",
            onChange: handleNationalityChange,
          })}
        >
          <option value="" disabled>
            Select a country
          </option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </StyledSelect>
      </StyledFormRow>

      <input type="hidden" {...register("countryFlag")} />

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isCreating ? "Creating..." : "Create guest"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
