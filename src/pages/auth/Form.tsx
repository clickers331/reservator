import styled from "styled-components";
import { Form as FormikForm } from "formik";
import { type StyledProps } from "../../styledUtils";

const Form = styled(FormikForm)<StyledProps>`
  display: flex;
  flex-direction: column;
  gap: 1em;
  border: 5px solid;
  border-color: ${({ theme }) => theme.colors.neutrals[400]};
  padding: 1em;
  border-radius: 20px;
  width: 70%;
  max-width: 1000px;
`;

export default Form;
