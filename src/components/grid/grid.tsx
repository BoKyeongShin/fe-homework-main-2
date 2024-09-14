import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { CustomPagination } from "./customPagination";
import { StarColumnHeader } from "./starColumnHeader";
import { StartToggleButton } from "./startToggleButton";
import { LocationButton } from "./locationButton";
import { RobotCell } from "./robotCell";
import { useFetchLocations } from "../../hooks/useFetchLocations";

const columns: GridColDef[] = [
  {
    field: "star",
    width: 60,
    disableColumnMenu: true,
    renderHeader: () => <StarColumnHeader />,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <StartToggleButton
        isStarred={params.row.isStarred}
        locationId={params.row.id}
      />
    ),
  },
  {
    field: "locations",
    headerName: "Locations",
    flex: 2,
    renderCell: (params: GridRenderCellParams) => (
      <LocationButton isDisabled={params.row.robotId === ""}>
        {params.value}
      </LocationButton>
    ),
  },
  {
    field: "robotId",
    headerName: "Robots",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <RobotCell noRobotId={params.row.robotId === ""} text={params.value} />
    ),
  },
  { field: "locationType", headerName: "Location Types", flex: 1 },
];

interface GridProps {
  filteredValue: string;
  searchValue: string;
}

const getParams = (filteredValue: string, searchValue: string) => {
  // 설계를 잘못해서 필터링이 안되는 문제가 발생함
  if (filteredValue === "All Locations") {
    return undefined;
  }

  if (filteredValue.includes("Starred")) {
    return {
      is_starred: "true",
      ...(searchValue.length > 0 ? { robot_id: searchValue } : {}),
      ...(searchValue.length > 0 ? { location_name: searchValue } : {}),
    };
  }

  return {
    location_name: filteredValue,
    ...(searchValue.length > 0 ? { robot_id: searchValue } : {}),
    ...(searchValue.length > 0 ? { location_name: searchValue } : {}),
  };
};

export const Grid: React.FC<GridProps> = ({ filteredValue, searchValue }) => {
  const { data: locations = [], isPending } = useFetchLocations(
    getParams(filteredValue, searchValue),
  );

  return (
    <DataGrid
      rows={locations}
      columns={columns}
      checkboxSelection
      loading={isPending}
      slotProps={{
        loadingOverlay: {
          variant: "skeleton",
          noRowsVariant: "skeleton",
        },
      }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 6,
          },
        },
      }}
      pageSizeOptions={[6]}
      slots={{
        pagination: CustomPagination,
      }}
      sx={{
        borderBottomStyle: "none",
        borderLeftStyle: "none",
        borderRightStyle: "none",
      }}
    />
  );
};
