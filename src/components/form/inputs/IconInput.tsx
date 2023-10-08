import { FieldHookConfig, useField } from "formik";
import React from "react";
import styled, { useTheme } from "styled-components";
import { ReactComponent as TestIcon } from "../../../assets/icons/info_icon.svg";
import { StyledProps, ThemeObj } from "../../../styledUtils";
import ValidationMessage from "../ValidationMessage";

const StyledFieldContainer = styled.div`
  display: flex;
  gap: 0.3em;

  flex-direction: column;
`;

const StyledIconInput = styled.div<StyledProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.colors.neutrals[200]};
  * {
    padding: 0.4em;
  }
`;
const StyledField = styled.input<StyledProps>`
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  -moz-appearance: textfield;

  height: 100%;
  width: 100%;
  font-size: inherit;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.neutrals[800]};
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutrals[600]};
  }
`;
interface StyledIcon {
  $clickable?: boolean;
}

const StyledIcon = styled(TestIcon)<StyledIcon>`
  width: 1.3em;
  height: 1.3em;
  transition-duration: 100ms;
  ${StyledField}:hover {
    fill: white;
    width: 1.5em;
    height: 1.5em;
  }
  cursor: ${({ $clickable }: StyledIcon) => $clickable && "pointer"};
`;

export interface IconObj {
  fill?: boolean;
  stroke?: boolean;
  clickHandler?: Function;
  icon: React.FC;
}

export interface IconData {
  iconRight?: IconObj;
  iconLeft: IconObj;
}

export default function IconInput({
  iconData: { iconRight, iconLeft },
  ...props
}: {
  iconData: IconData;
} & any) {
  const [field, meta, helpers] = useField(props);
  const theme: ThemeObj = useTheme() as ThemeObj;
  return (
    <StyledFieldContainer>
      <StyledIconInput>
        <StyledIcon
          fill={iconLeft.fill ? theme.colors.neutrals[400] : "none"}
          stroke={iconLeft.stroke ? theme.colors.neutrals[400] : "none"}
          as={iconLeft.icon}
        />
        <StyledField {...field} {...props} />
        {iconRight && (
          <StyledIcon
            $clickable
            fill={iconRight.fill ? theme.colors.neutrals[400] : "none"}
            stroke={iconRight.stroke ? theme.colors.neutrals[400] : "none"}
            as={iconRight.icon}
            onClick={iconRight.clickHandler || function () {}}
          />
        )}
      </StyledIconInput>
      {meta.error && meta.touched ? (
        <ValidationMessage>{meta.error}</ValidationMessage>
      ) : null}
    </StyledFieldContainer>
  );
}
