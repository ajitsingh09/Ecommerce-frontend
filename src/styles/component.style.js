import styled, { css } from "styled-components";

export const Center = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Table = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: 0.7rem;
  }
  td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  ${(props) =>
    props.disabled &&
    css`
      background-color: #d4d3d2;
      color: #000;
    `}
`;
