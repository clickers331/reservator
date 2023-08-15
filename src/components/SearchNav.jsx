import React from "react";
import {
  SearchNav as SearchNavContainer,
  TagButton,
  SearchInputContainer,
  SearchInput,
  SearchIconImg,
} from "./commonComponents";
import SearchIcon from "../assets/icons/search_fill.svg";

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
