import IconInput from "./IconInput";
import { ReactComponent as EmailIcon } from "../../../assets/icons/email_icon.svg";

export default function EmailInput() {
  return (
    <IconInput
      type="email"
      name="email"
      placeholder="E-Posta Adresi"
      iconData={{
        iconLeft: {
          icon: EmailIcon,
          fill: true,
          stroke: true,
        },
      }}
    />
  );
}
