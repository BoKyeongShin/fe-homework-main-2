import { Link, Typography, Box } from "@mui/material";
import { MouseEvent } from "react";
import CircleIcon from "@mui/icons-material/Circle";

interface LocationButtonRobotCellProps {
  noRobotId: boolean;
  text: string;
}

export const RobotCell: React.FC<LocationButtonRobotCellProps> = ({
  noRobotId,
  text,
}) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation(); // don't select this row after clicking
  };
  if (noRobotId) {
    return (
      <Link href="#" onClick={handleClick}>
        Add
      </Link>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100%", gap: 2, alignItems: "center" }}>
      <CircleIcon sx={{ color: "#00D15E", fontSize: "16px" }} />
      <Typography variant="subtitle1">{text}</Typography>
    </Box>
  );
};
