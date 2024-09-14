import { Popover, Box, SvgIconTypeMap } from "@mui/material";
import { SearchBar } from "../searchBar/searchBar";
import MenuList from "@mui/material/MenuList";
import { Dispatch } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Option } from "./option";

export interface ListItem {
  name: string;
  id: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
  iconColor?: string;
}

interface OptionsProps {
  id?: string;
  isOpen: boolean;
  anchorEl: HTMLButtonElement | null;
  list: ListItem[];
  selectedValue: string;
  onClose: () => void;
  onSetSelectedValue: Dispatch<React.SetStateAction<string>>;
}

export const Options: React.FC<OptionsProps> = ({
  id,
  isOpen,
  anchorEl,
  list,
  selectedValue,
  onClose,
  onSetSelectedValue,
}) => {
  const isSelected = (name: string) => {
    return selectedValue === name;
  };

  const handleClick = (selectedValue: string) => {
    onSetSelectedValue(selectedValue);
    onClose();
  };

  const handleSetOptions = (inputValue: string) => {
    console.log("list", list);
    if (inputValue === "All Locations") {
      return;
    }
  };

  return (
    <Popover
      id={id}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{ top: "5px" }}
      PaperProps={{
        style: {
          width: "220px",
          maxHeight: "224px",
          paddingTop: "8px",
          paddingBottom: "8px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.16)",
        },
      }}
    >
      <Box sx={{ px: "8px" }}>
        <SearchBar
          placeholder="Search Group"
          iconColor="#8E8E8E"
          borderStyle="none"
          backgroundColor="#EEEEEE"
          py="5px"
          setInputValue={handleSetOptions}
        />
      </Box>

      <MenuList>
        {list.map((option) => {
          const isSelectedItem = isSelected(option.name);
          return (
            <Option
              key={option.id}
              isSelected={isSelectedItem}
              option={option}
              onClick={() => handleClick(option.name)}
            />
          );
        })}
      </MenuList>
    </Popover>
  );
};
