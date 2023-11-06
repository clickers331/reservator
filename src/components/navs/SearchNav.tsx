import styled from "styled-components";
import TagButton from "../buttons/TagButton";
import SearchIcon from "../../assets/icons/search_fill.svg";
import type { StyledProps } from "../../styledUtils";

const SearchIconImg = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3em;
  aspect-ratio: 1;
`;

const SearchInput = styled.input<StyledProps>`
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

const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 40%;
  font-size: 1.2rem;
`;

const SearchNavContainer = styled.nav<StyledProps>`
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
export default function SearchNav() {
  return (
    <SearchNavContainer>
      <TagButton>PDF</TagButton>
      <SearchInputContainer>
        <SearchInput placeholder="Search" />
        <SearchIconImg>
          <img src={SearchIcon} alt="Search Icon" width="30" />
        </SearchIconImg>
      </SearchInputContainer>
    </SearchNavContainer>
  );
}
