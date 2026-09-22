import { useState } from "react";
import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";
import Modal from "../../ui/Modal";

function AddBooking() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal(!isOpenModal)}>
        Add new booking
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateBookingForm onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddBooking;