import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Select = styled.select`
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  border-radius: var(--border-radius-sm);
  padding: 0.6rem 3.2rem 0.6rem 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: var(--color-brand-600);
  }

  &:focus {
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 2px var(--color-brand-100);
  }

  option {
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);
  }
`;

function Pagination({ count, pageSize, setPageSize }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const PageCount = Math.ceil(count / pageSize);

  //? Calculate which bookings are currently shown
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, count);

  function nextPage() {
    const next = currentPage === PageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <LeftSide>
        <p>
          Showing <strong>{from}</strong> to <strong>{to}</strong> of{" "}
          <strong>{count}</strong>
        </p>

        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </Select>
      </LeftSide>

      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Prev</span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === PageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
