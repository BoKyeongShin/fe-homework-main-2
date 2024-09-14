import { IconButton } from "@mui/material";
import { MouseEvent } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

export const StarColumnHeader = () => {
  const handleRefresh = (e: MouseEvent) => {
    e.stopPropagation();
    console.log("refresh");
    // TODO: request get API again
  };
  return (
    <IconButton aria-label="refresh" onClick={handleRefresh}>
      <RefreshIcon />
    </IconButton>
  );
};
