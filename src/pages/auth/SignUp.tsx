import { Formik } from "formik";
import { auth } from "../../firebaseObjects";
import styled from "styled-components";
import { createNewAccount } from "../../api";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import EmailInput from "../../components/form/inputs/EmailInput";
import PasswordInput from "../../components/form/inputs/PasswordInput";
import { type StyledProps } from "../../styledUtils";
import DateInput from "../../components/form/inputs/DateInput";
import SelectInput from "../../components/form/inputs/SelectInput";
import { ReactComponent as BloodIcon } from "../../assets/icons/blood_droplet.svg";
import { ReactComponent as NavIcon } from "../../assets/icons/location_icon.svg";
import AuthBtn from "../../components/form/AuthBtn";
import Form from "./Form";
import PhoneInput from "../../components/form/inputs/PhoneInput";
import NameInput from "../../components/form/inputs/NameInput";
import { ValidationError, object, string } from "yup";
import ValidationMessage from "../../components/form/ValidationMessage";
import { useState } from "react";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const StyledFormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.7em;
  align-items: stretch;
  border-bottom: gray solid 1px;
  padding-bottom: 1em;
`;
const StyledFormSectionHeader = styled.div`
  font-size: 1.3em;
`;

const SignUpFormSchema = object({
  email: string()
    .email("Geçersiz e-posta adresi")
    .required("E-posta adresi zorunludur"),
  fullName: string().required("İsim Soyisim zorunludur"),
  phone: string().matches(phoneRegExp, "Telefon numarası geçersiz"),
  birthDate: string(),
  password: string()
    .length(6, "Şifreniz en az 6 haneli olmalıdır")
    .required("Şifre zorunludur"),
});

export default function SignUp() {
  const [user] = useAuthState(auth);
  const [error, setError] = useState({});
  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <>
          <h1>Hesap Oluştur</h1>
          <Formik
            initialValues={{
              email: "",
              fullName: "",
              phone: "",
              bloodType: "A+",
              birthDate: "",
              password: "",
            }}
            validationSchema={SignUpFormSchema}
            onSubmit={(values) => {
              setError(createNewAccount(values));
            }}
          >
            <Form>
              <StyledFormSection>
                <NameInput />
                <EmailInput />
                <PhoneInput />
                <PasswordInput />
                <DateInput />
                <SelectInput
                  name="bloodType"
                  placeholder="Blood Type"
                  iconData={{
                    iconLeft: {
                      icon: BloodIcon,
                      stroke: true,
                      fill: false,
                    },
                  }}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </SelectInput>
              </StyledFormSection>
              <AuthBtn>Kayıt Ol</AuthBtn>
            </Form>
          </Formik>
        </>
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
