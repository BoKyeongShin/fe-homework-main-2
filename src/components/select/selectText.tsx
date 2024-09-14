import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

export const SelectText = ({ children }: { children: ReactNode }) => {
  return (
    <Typography
      variant="button"
      sx={{
        display: "block",
        flex: 1,
        textAlign: "start",
        textTransform: "none",
      }}
    >
      {children}
    </Typography>
  );
};
