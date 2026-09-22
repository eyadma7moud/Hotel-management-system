import styled, { css } from "styled-components";

const Form = styled.form`
  max-height: 85vh;
  overflow-y: auto;
  overflow-x: hidden;

  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
      max-height: 90vh;
      overflow-y: auto;
    `}

  overflow-x: hidden;
  font-size: 1.4rem;
`;

export default Form;
