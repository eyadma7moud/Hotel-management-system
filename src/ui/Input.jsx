import styled from "styled-components";

const Input = styled.input`
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

  &::placeholder {
    color: var(--color-grey-400);
  }
`;
export default Input;
