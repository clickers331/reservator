import { useState } from "react";
import IconInput from "./IconInput";
import { ReactComponent as PasswordIcon } from "../../../assets/icons/password_icon.svg";
import { ReactComponent as VisibleIcon } from "../../../assets/icons/visibility_visible.svg";
import { ReactComponent as HiddenIcon } from "../../../assets/icons/visibility_hidden.svg";
import { ReactComponent as IDIcon } from "../../../assets/icons/id_icon.svg";

interface PasswordInputProps {
  id?: boolean;
}

export default function PasswordInput({
  id,
  ...props
}: PasswordInputProps & any) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const iconData = {
    iconLeft: {
      icon: id ? IDIcon : PasswordIcon,
      fill: false,
      stroke: true,
    },
    iconRight: {
      stroke: true,
      fill: passwordVisibility,
      icon: passwordVisibility ? HiddenIcon : VisibleIcon,
      clickHandler: () => {
        setPasswordVisibility((prev) => !prev);
      },
    },
  };
  return (
    <IconInput
      type={passwordVisibility ? "text" : "password"}
      name="tcid"
      placeholder={id ? "TC Kimlik No." : "Şifre"}
      iconData={iconData}
    />
  );
}
