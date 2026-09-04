import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useState } from "react";
import EditCabinForm from "./EditCabinForm";
import Modal from "../../ui/Modal";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { createCabinMutation, iscreating } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  function handleDuplicate() {
    createCabinMutation({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  }

  return (
    <Table.Row>
      <Img src={image}></Img>
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      {/* <div>
          <Button disabled={iscreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </Button>
          <Button onClick={() => setIsEditOpen(true)}>
            <HiPencil />
          </Button>

          <Button
            style={{ backgroundColor: "var(--color-red-700)", padding: "8px" }}
            onClick={() => setIsDeleteOpen(true)}
            disabled={isDeleting}
          >
            <HiTrash />
          </Button>
        </div> */}
      <Menus>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>
            <Menus.Button
              icon={<HiPencil />}
              onClick={() => setIsEditOpen(true)}
            >
              Edit
            </Menus.Button>
            <Menus.Button
              icon={<HiTrash color="var(--color-red-700)"/>}
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
          <EditCabinForm cabin={cabin} onClose={() => setIsEditOpen(false)} />
        </Modal>
      )}
      {isDeleteOpen && (
        <Modal onClose={() => setIsDeleteOpen(false)}>
          <ConfirmDelete
            resourceName={name}
            disabled={isDeleting}
            onConfirm={() => {
              deleteCabin(cabinId);
            }}
            onCloseModal={() => setIsDeleteOpen(false)}
          />
        </Modal>
      )}
    </Table.Row>
  );
}

export default CabinRow;
