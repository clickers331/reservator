import styled from "styled-components";
import { Form as FormikForm } from "formik";
import { type StyledProps } from "../../styledUtils";

const Form = styled(FormikForm)<StyledProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1em;
  border: 5px solid;
  border-color: ${({ theme }) => theme.colors.neutrals[400]};
  padding: 1em;
  border-radius: 20px;
  width: 70%;
  max-width: 1000px;
  @media screen and (max-width: ${({ theme }) => theme.screenSizes.tablet}) {
    width: 95%;
  }
`;

export default Form;
