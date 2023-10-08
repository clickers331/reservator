import styled from "styled-components";

const Container = styled.div`
  overflow: hidden;
  margin: 3em 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 30px;
  border: 5px solid ${({ theme }) => theme.colors.primaries[600]};
  width: 90%;
  min-height: 50vh;
  border: solid 1px red;
  * {
    border: solid 1px black;
  }
`;

const TagButton = styled.button`
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.neutrals[700]};
  color: ${({ theme }) => theme.colors.neutrals[100]};
  border-radius: 10px;
  padding: 0.5em 1em;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

const TableContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 1em;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
`;

export { Container, TagButton, TableContainer };
