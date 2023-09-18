import styled from "styled-components";
import { StyledProps } from "../../styledUtils";
import { ReactComponent as AuthIcon } from "../../assets/icons/auth_btn_icon.svg";

const StyledSubmitBtn = styled.button<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 1em;
  border-radius: 20px;
  font-weight: 900;
  border: none;
  color: white;
  background: ${({ theme }) => theme.colors.primaries[400]};
`;

export default function AuthBtn({
  children,
  ...props
}: { children: React.FC } & any) {
  return (
    <StyledSubmitBtn {...props} type="submit">
      {children}
      <AuthIcon />
    </StyledSubmitBtn>
  );
}
