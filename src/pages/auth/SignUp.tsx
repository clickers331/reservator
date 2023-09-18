import { Form, Formik, Field } from "formik";
import { db, auth } from "../../firebaseObjects";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { createNewAccount } from "../../api";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import EmailInput from "../../components/form/inputs/EmailInput";
import PasswordInput from "../../components/form/inputs/PasswordInput";
import IconInput from "../../components/form/inputs/IconInput";
import { type StyledProps } from "../../styledUtils";

const StyledForm = styled(Form)<StyledProps>`
  display: flex;
  flex-direction: column;
  gap: 1em;
  border: 5px solid;
  border-color: ${({ theme }) => theme.colors.neutrals[400]};
  padding: 1em;
  border-radius: 20px;
  border: red solid 1px;
  width: 1000px;
`;

const StyledFormSection = styled.div`
  border: red solid 1px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5em;
  align-items: stretch;
`;
const StyledFormSectionHeader = styled.div`
  font-size: 1.3em;
`;

export default function SignUp() {
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <div>
          <h1>Sign Up</h1>
          <Formik
            initialValues={{
              email: "",
              fullName: "",
              phone: "",
              bloodType: "A+",
              birthPlace: "",
              birthDate: "",
              tcid: "",
            }}
            onSubmit={createNewAccount}
          >
            <StyledForm>
              <StyledFormSection>
                <StyledFormSectionHeader>
                  Kişisel Bilgiler
                </StyledFormSectionHeader>
                <EmailInput />
                <PasswordInput id={true} />
              </StyledFormSection>
              <Field type="text" name="birthPlace" placeholder="Birth Place" />
              <Field type="date" name="birthDate" placeholder="Birth Day" />
              <Field type="phone" name="phone" placeholder="Phone Number" />
              <Field as="select" name="bloodType" placeholder="Blood Type">
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Field>

              <button type="submit">Submit </button>
            </StyledForm>
          </Formik>
          <button onClick={() => signOut(auth)}>Signout</button>
        </div>
      )}
    </>
  );
}

//A positive (A+).
//A negative (A-).
//B positive (B+).
//B negative (B-).
//AB positive (AB+).
//AB negative (AB-).
//O positive (O+).
//O negative (O-).
