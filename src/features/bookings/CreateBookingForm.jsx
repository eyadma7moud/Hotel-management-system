import styled from "styled-components";
import { useForm } from "react-hook-form";
import { differenceInCalendarDays } from "date-fns";

import StyledFormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";

import { useCreateBooking } from "./useCreateBooking";
import { useGuests } from "./useGuests";
import { useCabinsForBooking } from "./useCabinsForBooking";
import { useSettings } from "../settings/useSettings";

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
  width: 100%;
  padding: 0.8rem 1.2rem;

  font-size: 1.4rem;
  font-family: inherit;

  color: var(--color-grey-700);
  background-color: var(--color-grey-0);

  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);

  box-shadow: var(--shadow-sm);
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px var(--color-brand-100);
  }

  &:disabled {
    background-color: var(--color-grey-100);
    cursor: not-allowed;
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const SummaryBox = styled.div`
  background-color: var(--color-grey-50);
  padding: 1.2rem 2rem;
  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;
  font-family: "Sono";
  color: var(--color-grey-700);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

function CreateBookingForm({ onClose }) {
  const { settings, isLoading } = useSettings();

  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      status: "unconfirmed",
      numGuests: 1,
      isPaid: false,
      hasBreakfast: false,
    },
  });

  if (isLoading) return <Spinner />;

  const { breakfastPrice } = settings;
  
  const { errors } = formState;

  const { createBookingMutation, isCreating } = useCreateBooking();
  const { guests, isLoading: isLoadingGuests } = useGuests();
  const { cabins, isLoading: isLoadingCabins } = useCabinsForBooking();

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const cabinId = watch("cabinId");
  const numGuests = Number(watch("numGuests")) || 0;
  const hasBreakfast = watch("hasBreakfast");

  const selectedCabin = cabins?.find((c) => String(c.id) === String(cabinId));

  const numNights =
    startDate && endDate
      ? Math.max(
          differenceInCalendarDays(new Date(endDate), new Date(startDate)),
          0,
        )
      : 0;

  const cabinPrice = selectedCabin
    ? (selectedCabin.regularPrice - (selectedCabin.discount || 0)) * numNights
    : 0;

  const extraPrice = hasBreakfast ? numNights * numGuests * breakfastPrice : 0;
  const totalPrice = cabinPrice + extraPrice;

  const isWorking = isCreating || isLoadingGuests || isLoadingCabins;

  if (isLoadingGuests || isLoadingCabins) return <Spinner />;

  function onSubmit(data) {
    const newBooking = {
      guestId: Number(data.guestId),
      cabinId: Number(data.cabinId),
      startDate: data.startDate,
      endDate: data.endDate,
      numNights,
      numGuests: Number(data.numGuests),
      cabinPrice,
      extraPrice,
      totalPrice,
      hasBreakfast: data.hasBreakfast,
      isPaid: data.isPaid,
      status: data.status,
      observations: data.observations,
    };

    createBookingMutation(newBooking, {
      onSuccess: () => onClose(),
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledFormRow label="Guest" error={errors?.guestId?.message}>
        <StyledSelect
          id="guestId"
          disabled={isWorking}
          defaultValue=""
          {...register("guestId", { required: "This field is required" })}
        >
          <option value="" disabled>
            Select a guest
          </option>
          {guests?.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.fullName} ({guest.email})
            </option>
          ))}
        </StyledSelect>
      </StyledFormRow>

      <StyledFormRow label="Cabin" error={errors?.cabinId?.message}>
        <StyledSelect
          id="cabinId"
          disabled={isWorking}
          defaultValue=""
          {...register("cabinId", { required: "This field is required" })}
        >
          <option value="" disabled>
            Select a cabin
          </option>
          {cabins?.map((cabin) => (
            <option key={cabin.id} value={cabin.id}>
              {cabin.name} (max {cabin.maxCapacity} guests)
            </option>
          ))}
        </StyledSelect>
      </StyledFormRow>

      <StyledFormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isWorking}
          {...register("startDate", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          disabled={isWorking}
          {...register("endDate", {
            required: "This field is required",
            validate: (value) =>
              !startDate ||
              new Date(value) > new Date(startDate) ||
              "End date must be after start date",
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Number of guests"
        error={errors?.numGuests?.message}
      >
        <Input
          type="number"
          id="numGuests"
          disabled={isWorking}
          {...register("numGuests", {
            required: "This field is required",
            min: { value: 1, message: "At least 1 guest" },
            validate: (value) =>
              !selectedCabin ||
              Number(value) <= selectedCabin.maxCapacity ||
              `Max capacity for this cabin is ${selectedCabin.maxCapacity}`,
          })}
        />
      </StyledFormRow>

      <StyledFormRow label="Breakfast included?">
        <CheckboxRow>
          <input
            type="checkbox"
            id="hasBreakfast"
            disabled={isWorking}
            {...register("hasBreakfast")}
          />
        </CheckboxRow>
      </StyledFormRow>

      <StyledFormRow label="Already paid?">
        <CheckboxRow>
          <input
            type="checkbox"
            id="isPaid"
            disabled={isWorking}
            {...register("isPaid")}
          />
        </CheckboxRow>
      </StyledFormRow>

      <StyledFormRow label="Status">
        <StyledSelect id="status" disabled={isWorking} {...register("status")}>
          <option value="unconfirmed">Unconfirmed</option>
          <option value="checked-in">Checked in</option>
          <option value="checked-out">Checked out</option>
        </StyledSelect>
      </StyledFormRow>

      <StyledFormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          id="observations"
          disabled={isWorking}
          defaultValue=""
          {...register("observations")}
        />
      </StyledFormRow>

      <StyledFormRow label="Summary">
        <SummaryBox>
          <span>Nights: {numNights}</span>
          <span>Cabin price: {cabinPrice}</span>
          <span>Extra (breakfast): {extraPrice}</span>
          <span>Total price: {totalPrice}</span>
        </SummaryBox>
      </StyledFormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isCreating ? "Creating..." : "Create booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
