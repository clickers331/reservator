import IconInput, { type IconData } from "./IconInput";
import { useTheme } from "styled-components";
import styled from "styled-components";

interface SelectInputProps {
  children: JSX.Element[];
  name: string;
  placeholder: string;
  iconData: IconData;
}

const StyledSelectInput = styled.div`
  select {
    color: ${({ theme }) => theme.colors.neutrals[400]};
  }
`;

export default function SelectInput({
  children,
  name,
  placeholder,
  iconData,
}: SelectInputProps) {
  const theme = useTheme();
  return (
    <StyledSelectInput>
      <IconInput
        as="select"
        name={name}
        placeholder={placeholder}
        iconData={iconData}
      >
        {children}
      </IconInput>
    </StyledSelectInput>
  );
}
