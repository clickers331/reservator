import styled from "styled-components";

const Container = styled.div`
  margin: 3em 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 30px;
  border: 5px solid ${({ theme }) => theme.colors.primaries[600]};
  width: 60%;
  min-height: 50vh;
`;

const SearchNav = styled.nav`
  box-sizing: border-box;
  padding: 1em 2em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid ${({ theme }) => theme.colors.neutrals[300]};
  width: 100%;
  * {
    margin: 0;
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

const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 40%;
  font-size: 1.2rem;
`;

const SearchInput = styled.input`
  background-color: ${({ theme }) => theme.colors.neutrals[100]};
  border: 3px solid ${({ theme }) => theme.colors.neutrals[400]};
  box-sizing: border-box;
  padding: 0.5em 1em;
  padding-left: 3em;
  width: 100%;
  font-weight: 500;
  font-size: inherit;
  border-radius: 15px;
`;

const SearchIconImg = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3em;
  aspect-ratio: 1;
`;

const TableItemContainer = styled.div`
  border: red solid 1px;
  min-width: fit-content;
  ${({
    children: {
      props: { itemwidth },
    },
  }) => {
    itemwidth && console.log(itemwidth);
    return itemwidth && `width:${itemwidth} !important`;
  }}
`;

const TableRow = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  width: 100%;
  border-radius: 15px;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "guide":
        return theme.colors.neutrals[600];
      case "red":
        return theme.colors.accents.red[300];
      case "yellow":
        return theme.colors.accents.yellow[300];
      default:
        return theme.colors.primaries[300];
    }
  }};
  color: ${({ type, theme }) => {
    return type === "guide"
      ? theme.colors.neutrals[200]
      : theme.colors.neutrals[900];
  }};
  font-size: ${({ type }) => (type === "guide" ? "1.2rem" : "1rem")};
  font-weight: 600;
  & > ${TableItemContainer} {
    width: ${({ children }) => 100 / children.length}%;
  }
`;

const TableContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 1em;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  padding: 2em;
`;

export {
  Container,
  SearchNav,
  TagButton,
  SearchInputContainer,
  SearchInput,
  SearchIconImg,
  TableRow,
  TableItemContainer,
  TableContainer,
};
