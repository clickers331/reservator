import IconInput from "./IconInput";
import { ReactComponent as UserIcon } from "../../../assets/icons/user_icon.svg";

export default function NameInput() {
  return (
    <IconInput
      type="text"
      name="fullName"
      placeholder="Isim Soyisim"
      iconData={{
        iconLeft: {
          icon: UserIcon,
          fill: true,
          stroke: true,
        },
      }}
    />
  );
}
