import IconButton from "./IconButton";
import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg";
import { useTheme } from "styled-components";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/rootReducer";

interface AddBtnProps {
  disabled?: boolean;
}

export default function AddBtn(props: AddBtnProps) {
  const theme = useTheme();
  const user = useSelector((state: ReduxState) => state.users.self);
  return (
    <IconButton
      size="56px"
      icon={AddIcon}
      backgroundColor={theme.colors.primaries[400]}
      borderRadius="10px"
      fill={false}
      stroke={true}
      disabled={user.lessonCount <= 0 || props.disabled}
    />
  );
}
