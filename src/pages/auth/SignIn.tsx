import { Formik, Field } from "formik";
import Form from "./Form";
import { auth } from "../../firebaseObjects";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { signIn } from "../../api";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import EmailInput from "../../components/form/inputs/EmailInput";
import PasswordInput from "../../components/form/inputs/PasswordInput";
import AuthBtn from "../../components/form/AuthBtn";
import { StyledProps } from "../../styledUtils";
import { object, string } from "yup";
import ValidationMessage from "../../components/form/ValidationMessage";

const StyledForm = styled(Form)<StyledProps>`
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

const SignInFormSchema = object({
  email: string()
    .email("You email isn't correctly formatted")
    .required("You email is required"),
  password: string().required("Password is required"),
});

export default function SignIn() {
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <>
          <h1>Giriş Yap</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignInFormSchema}
            onSubmit={signIn}
          >
            {({ errors, touched }) => {
              return (
                <Form>
                  <EmailInput />
                  <PasswordInput />
                  <AuthBtn onClick={() => signOut(auth)}>Sign In</AuthBtn>
                </Form>
              );
            }}
          </Formik>
        </>
      )}
    </>
  );
}
