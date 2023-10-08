import IconButton from "./IconButton";
import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg";
import { useTheme } from "styled-components";

export default function AddBtn() {
  const theme = useTheme();
  return (
    <IconButton
      size="56px"
      icon={AddIcon}
      backgroundColor={theme.colors.primaries[400]}
      borderRadius="10px"
      fill={false}
      stroke={true}
    />
  );
}
