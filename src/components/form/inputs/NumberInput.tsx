import IconInput from "./IconInput";
import { ReactComponent as FileAddIcon } from "../../../assets/icons/file_add.svg";

export default function NumberInput({ name, placeholder }) {
  return (
    <IconInput
      type="number"
      name={name}
      placeholder={placeholder}
      iconData={{
        iconLeft: {
          icon: FileAddIcon,
          fill: false,
          stroke: true,
        },
      }}
    />
  );
}
