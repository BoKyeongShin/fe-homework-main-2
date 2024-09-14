import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface SearchBarProps {
  placeholder?: string;
  borderColor?: string;
  borderStyle?: string;
  backgroundColor?: string;
  iconColor?: string;
  py?: string;
  setInputValue?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  borderColor = "#E4E4E4",
  borderStyle = "solid",
  backgroundColor = "#FAFAFA",
  iconColor = "#000000",
  py = "0",
  setInputValue,
}) => {
  // TODO: button 클릭 시 동작
  // TODO: input keydown 시 동작 -> debounce 0.5초 걸어서 이벤트 발생하도록 하기
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue?.(inputValue);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: "16px",
        py,
        backgroundColor,
        borderWidth: 1,
        borderColor,
        borderStyle,
        borderRadius: "8px",
        rowGap: "5px",
      }}
    >
      <InputBase
        placeholder={placeholder}
        inputProps={{ "aria-label": "search" }}
        sx={{
          width: "173px",
          fontSize: "14px",
        }}
        onChange={handleChange}
      />
      <IconButton
        aria-label="search"
        size="large"
        sx={{ color: iconColor, p: 0 }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};
