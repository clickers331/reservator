import IconInput from "./IconInput";
import { ReactComponent as PhoneIcon } from "../../../assets/icons/phone_icon.svg";

export default function PhoneInput() {
  return (
    <IconInput
      type="tel"
      name="phone"
      placeholder="Phone Number"
      iconData={{
        iconLeft: {
          icon: PhoneIcon,
          fill: true,
          stroke: false,
        },
      }}
    />
  );
}
