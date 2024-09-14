import { Pagination } from "@mui/material";
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

export const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        "& .Mui-selected": {
          bgcolor: "#3961F8 !Important",
        },
      }}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
};
