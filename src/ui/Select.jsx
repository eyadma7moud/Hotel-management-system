import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 3.2rem 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-color: var(--color-brand-600);
  }
  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px var(--color-brand-100);
  }
`;

function Select({ options, value, onChange, ...props }) {
  function formatText(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
  }

  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option key={formatText(option)} value={formatText(option)}>
          {option}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
