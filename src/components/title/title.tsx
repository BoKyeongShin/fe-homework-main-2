import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

export const Title = ({ children }: { children: ReactNode }) => {
  return <Typography variant="h5">{children}</Typography>;
};
