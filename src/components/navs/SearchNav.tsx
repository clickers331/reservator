import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search_fill.svg";
import type { StyledProps } from "../../styledUtils";
import { searchUserByName } from "../../api";

const SearchIconImg = styled(SearchIcon)`
  fill: ${({ theme }) => theme.colors.neutrals[400]};
  stroke: ${({ theme }) => theme.colors.neutrals[400]};
  width: 1.5em;
  height: 1.5em;
  aspect-ratio: 1;
`;

const SearchInput = styled.input<StyledProps>`
  border: none;
  box-sizing: border-box;
  padding: 0.5em 1em;
  font-size: inherit;
  background-color: transparent;
  width: 100%;
`;

const SearchInputContainer = styled.div`
  font-weight: 500;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.neutrals[100]};
  border: 3px solid ${({ theme }) => theme.colors.neutrals[400]};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  font-size: 1.2rem;
`;

const SearchNavContainer = styled.nav<StyledProps>`
  box-sizing: border-box;
  padding: 1em;
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
export default function SearchNav() {
  return (
    <SearchNavContainer>
      <SearchInputContainer>
        <SearchIconImg />
        <SearchInput
          placeholder="Search Names"
          onChange={(e) => {
            searchUserByName(e.target.value);
          }}
        />
      </SearchInputContainer>
    </SearchNavContainer>
  );
}
