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
  fullName: string(),
  phone: string().matches(phoneRegExp, "Telefon numarası geçersiz"),
  birthDate: string(),
  tcid: string()
    .length(11, "TC Kimlik Numaranız 11 sayıdan oluşmalıdır")
    .required("TC Kimlik Numarası zorunludur"),
});

const firebaseErrorMessages = {
  "auth/email-already-in-use": "Bu emaili kullanan bir hesap var.",
  "auth/invalid-password": "Şifreniz yanlış",
};

export default function SignUp() {
  const [createUserWithEmailAndPassword, newUser, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [user] = useAuthState(auth);
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
              birthPlace: "",
              birthDate: "",
              tcid: "",
            }}
            validationSchema={SignUpFormSchema}
            onSubmit={(values) => {
              createUserWithEmailAndPassword(values.email, values.tcid);
            }}
          >
            <Form>
              {error && (
                <ValidationMessage>
                  {firebaseErrorMessages[error.code] || "Bir hata gerçekleşti"}
                </ValidationMessage>
              )}
              <StyledFormSection>
                <StyledFormSectionHeader>
                  Kişisel Bilgiler
                </StyledFormSectionHeader>
                <NameInput />
                <PasswordInput id={true} />
                <SelectInput
                  name="birthPlace"
                  placeholder="Birth Place"
                  iconData={{
                    iconLeft: {
                      icon: NavIcon,
                      fill: true,
                      stroke: true,
                    },
                  }}
                >
                  <option value="adana">Adana</option>
                  <option value="adiyaman">Adıyaman</option>
                  <option value="afyonkarahisar">Afyonkarahisar</option>
                  <option value="agri">Ağrı</option>
                  <option value="aksaray">Aksaray</option>
                  <option value="amasya">Amasya</option>
                  <option value="ankara">Ankara</option>
                  <option value="antalya">Antalya</option>
                  <option value="ardahan">Ardahan</option>
                  <option value="artvin">Artvin</option>
                  <option value="aydin">Aydın</option>
                  <option value="balikesir">Balıkesir</option>
                  <option value="bartin">Bartın</option>
                  <option value="batman">Batman</option>
                  <option value="bayburt">Bayburt</option>
                  <option value="bilecik">Bilecik</option>
                  <option value="bingol">Bingöl</option>
                  <option value="bitlis">Bitlis</option>
                  <option value="bolu">Bolu</option>
                  <option value="burdur">Burdur</option>
                  <option value="bursa">Bursa</option>
                  <option value="canakkale">Çanakkale</option>
                  <option value="cankiri">Çankırı</option>
                  <option value="corum">Çorum</option>
                  <option value="denizli">Denizli</option>
                  <option value="diyarbakir">Diyarbakır</option>
                  <option value="duzce">Düzce</option>
                  <option value="edirne">Edirne</option>
                  <option value="elazig">Elazığ</option>
                  <option value="erzincan">Erzincan</option>
                  <option value="erzurum">Erzurum</option>
                  <option value="eskisehir">Eskişehir</option>
                  <option value="gaziantep">Gaziantep</option>
                  <option value="giresun">Giresun</option>
                  <option value="gumushane">Gümüşhane</option>
                  <option value="hakkari">Hakkari</option>
                  <option value="hatay">Hatay</option>
                  <option value="igdir">Iğdır</option>
                  <option value="isparta">Isparta</option>
                  <option value="istanbul">İstanbul</option>
                  <option value="izmir">İzmir</option>
                  <option value="kahramanmaras">Kahramanmaraş</option>
                  <option value="karabuk">Karabük</option>
                  <option value="karaman">Karaman</option>
                  <option value="kars">Kars</option>
                  <option value="kastamonu">Kastamonu</option>
                  <option value="kayseri">Kayseri</option>
                  <option value="kirikkale">Kırıkkale</option>
                  <option value="kirklareli">Kırklareli</option>
                  <option value="kirsehir">Kırşehir</option>
                  <option value="kilis">Kilis</option>
                  <option value="kocaeli">Kocaeli</option>
                  <option value="konya">Konya</option>
                  <option value="kutahya">Kütahya</option>
                  <option value="malatya">Malatya</option>
                  <option value="manisa">Manisa</option>
                  <option value="mardin">Mardin</option>
                  <option value="mersin">Mersin</option>
                  <option value="mugla">Muğla</option>
                  <option value="mus">Muş</option>
                  <option value="nevsehir">Nevşehir</option>
                  <option value="nigde">Niğde</option>
                  <option value="ordu">Ordu</option>
                  <option value="osmaniye">Osmaniye</option>
                  <option value="rize">Rize</option>
                  <option value="sakarya">Sakarya</option>
                  <option value="samsun">Samsun</option>
                  <option value="sanliurfa">Şanlıurfa</option>
                  <option value="siirt">Siirt</option>
                  <option value="sinop">Sinop</option>
                  <option value="sivas">Sivas</option>
                  <option value="sirnak">Şırnak</option>
                  <option value="tekirdag">Tekirdağ</option>
                  <option value="tokat">Tokat</option>
                  <option value="trabzon">Trabzon</option>
                  <option value="tunceli">Tunceli</option>
                  <option value="usak">Uşak</option>
                  <option value="van">Van</option>
                  <option value="yalova">Yalova</option>
                  <option value="yozgat">Yozgat</option>
                  <option value="zonguldak">Zonguldak</option>
                </SelectInput>
                <DateInput />
              </StyledFormSection>
              <StyledFormSection>
                <StyledFormSectionHeader>İletişim</StyledFormSectionHeader>
                <PhoneInput />
                <EmailInput />
              </StyledFormSection>
              <StyledFormSection>
                <StyledFormSectionHeader>Sağlık</StyledFormSectionHeader>
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
