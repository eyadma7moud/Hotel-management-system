import styled from "styled-components";
import { useState } from "react";
import EditGuestForm from "./EditGuestForm";
import Modal from "../../ui/Modal";
import { useDeleteGuest } from "./useDeleteGuest";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 2.8rem;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  border-radius: 2px;
`;

const Guest = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function GuestRow({ guest }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { isDeleting, deleteGuest } = useDeleteGuest();

  const {
    id: guestId,
    fullName,
    nationalID,
    phone,
    email,
    nationality,
    countryFlag,
  } = guest;

  return (
    <Table.Row>
      <Img src={countryFlag} />
      <Guest>{fullName}</Guest>
      <div>{nationalID}</div>
      <div>{phone || "—"}</div>
      <div>{email}</div>
      <div>{nationality}</div>

      <Menus>
        <Menus.Menu>
          <Menus.Toggle id={guestId} />
          <Menus.List id={guestId}>
            <Menus.Button
              icon={<HiPencil />}
              onClick={() => setIsEditOpen(true)}
            >
              Edit
            </Menus.Button>
            <Menus.Button
              icon={<HiTrash color="var(--color-red-700)" />}
              color={{
                color: "var(--color-red-700)",
              }}
              onClick={() => setIsDeleteOpen(true)}
            >
              Delete
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Menus>

      {isEditOpen && (
        <Modal onClose={() => setIsEditOpen(false)}>
          <EditGuestForm guest={guest} onClose={() => setIsEditOpen(false)} />
        </Modal>
      )}
      {isDeleteOpen && (
        <Modal onClose={() => setIsDeleteOpen(false)}>
          <ConfirmDelete
            resourceName={fullName}
            deletedItem="guest"
            disabled={isDeleting}
            onConfirm={() => {
              deleteGuest(guestId);
            }}
            onCloseModal={() => setIsDeleteOpen(false)}
          />
        </Modal>
      )}
    </Table.Row>
  );
}

export default GuestRow;
