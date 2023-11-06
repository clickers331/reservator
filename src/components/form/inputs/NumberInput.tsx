import IconInput, { type IconData } from "./IconInput";
import { ReactComponent as FileAddIcon } from "../../../assets/icons/file_add.svg";

interface NumberInputProps {
  name: string;
  placeholder: string;
  iconData?: IconData;
}

export default function NumberInput({
  name,
  placeholder,
  iconData = {
    iconLeft: {
      icon: FileAddIcon,
      fill: false,
      stroke: true,
    },
  },
}: NumberInputProps) {
  return (
    <IconInput
      type="number"
      name={name}
      placeholder={placeholder}
      iconData={iconData}
    />
  );
}
