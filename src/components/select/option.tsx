import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import Check from "@mui/icons-material/Check";
import { ListItem } from "./options";

interface OptionProps {
  isSelected: boolean;
  onClick: () => void;
  option: ListItem;
}

export const Option: React.FC<OptionProps> = ({
  isSelected,
  onClick,
  option,
}) => {
  return (
    <MenuItem
      sx={{
        background: isSelected ? "rgba(184, 221, 255, 0.2)" : "transparent",
      }}
      onClick={onClick}
    >
      {option.icon !== undefined && (
        <option.icon
          sx={{ color: option.iconColor ?? "#000000", marginRight: "5px" }}
        />
      )}
      <ListItemText>{option.name}</ListItemText>
      {isSelected && (
        <ListItemIcon>
          <Check sx={{ color: "#133BD3" }} />
        </ListItemIcon>
      )}
    </MenuItem>
  );
};
