import { useState } from "react";
import Button from "../../ui/Button";
import CreateGuestForm from "./CreateGuestForm";
import Modal from "../../ui/Modal";

function AddGuest() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal(!isOpenModal)}>
        Add new guest
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateGuestForm onClose={() => setIsOpenModal(false)}/>
        </Modal>
      )}
    </div>
  );
}

export default AddGuest;
