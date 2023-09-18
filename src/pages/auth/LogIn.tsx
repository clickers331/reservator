import { Form, Formik, Field } from "formik";
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

export default function LogIn() {
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
              tcid: "",
            }}
            onSubmit={signIn}
          >
            <StyledForm>
              <EmailInput />
              <PasswordInput />
              <AuthBtn onClick={() => signOut(auth)}>Giriş Yap</AuthBtn>
            </StyledForm>
          </Formik>
        </>
      )}
    </>
  );
}
