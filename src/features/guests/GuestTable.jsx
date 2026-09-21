import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import GuestRow from "./GuestRow";
import { useGuests } from "./useGuest";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import { useState } from "react";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 1.4fr 1.2fr 1.8fr 1.4fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function GuestTable() {
  const [pageSize, setPageSize] = useState(5);

  const { isLoading, guests, count } = useGuests(pageSize);
  
  const [searchParams] = useSearchParams();


  if (isLoading) return <Spinner />;
  if (!guests || !guests.length) return <Empty resourceName="guests" />;


  // ---------------- SORT ----------------

  const sortBy = searchParams.get("sortBy") || "none";

  const sortedGuests = [...guests].sort((a, b) => {
    switch (sortBy) {
      case "sort-by-latest":
        return new Date(b.created_at) - new Date(a.created_at);

      case "sort-by-name-asc":
        return a.fullName.localeCompare(b.fullName);

      case "sort-by-name-desc":
        return b.fullName.localeCompare(a.fullName);

      case "sort-by-nationality-asc":
        return a.nationality.localeCompare(b.nationality);

      default:
        return 0;
    }
  });

  // ---------------- RENDER ----------------

  if (!guests.length) return <Empty resourceName="guests" />;

  return (
    <Table columns="0.6fr 1.8fr 1.4fr 1.2fr 1.8fr 1.4fr 1fr">
      <Table.Header role="row">
        <div></div>
        <div>Full name</div>
        <div>National ID</div>
        <div>Phone</div>
        <div>Email</div>
        <div>Nationality</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={sortedGuests}
        render={(guest) => <GuestRow guest={guest} key={guest.id} />}
      />
              <Table.Footer>
          <Pagination
            count={count}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </Table.Footer>
    </Table>
  );
}

export default GuestTable;
