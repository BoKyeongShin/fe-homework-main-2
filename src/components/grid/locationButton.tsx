import { Button } from "@mui/material";
import { MouseEvent, ReactNode } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface LocationButtonProps {
  isDisabled: boolean;
  children: ReactNode;
}

export const LocationButton: React.FC<LocationButtonProps> = ({
  isDisabled,
  children,
}) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <Button
      variant="contained"
      sx={{
        width: "100%",
        background: "#0091FF",
        borderRadius: "8px",
      }}
      disabled={isDisabled}
      endIcon={<ChevronRightIcon />}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};
