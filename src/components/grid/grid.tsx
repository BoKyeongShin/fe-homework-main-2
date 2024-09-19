import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CustomPagination } from './customPagination';
import { StarColumnHeader } from './starColumnHeader';
import { StartToggleButton } from './startToggleButton';
import { LocationButton } from './locationButton';
import { RobotCell } from './robotCell';
import { useFetchLocations } from '../../hooks/useFetchLocations';
import { useCallback, useEffect, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface GridProps {
  filteredValue: string;
  searchValue: string;
}

const getSearchParmas = (searchValue: string) => {
  if (searchValue.toLowerCase().startsWith('pennybot')) {
    return { robot_id: searchValue };
  }
  return { location_name: searchValue };
};

const getParams = (filteredValue: string, searchValue: string) => {
  // TODO: 설계를 잘못해서 필터링이 안되는 문제가 발생함
  // TODO: 필터링 버그 픽스 하기

  if (filteredValue.includes('Starred')) {
    return {
      is_starred: 'true',
      ...(searchValue.length > 0 ? getSearchParmas(searchValue) : {}),
    };
  }

  return {
    ...(filteredValue === 'All Locations'
      ? {}
      : { location_name: filteredValue }),
    ...(searchValue.length > 0 ? getSearchParmas(searchValue) : {}),
  };
};

export const Grid: React.FC<GridProps> = ({ filteredValue, searchValue }) => {
  const queryClient = useQueryClient();
  const { data: locations = [], isPending } = useFetchLocations(
    getParams(filteredValue, searchValue)
  );

  const handleSetFilteredValue = useCallback(async () => {
    if (filteredValue.includes('Starred')) {
      queryClient.invalidateQueries({
        queryKey: ['locations'],
      });
    }
  }, [filteredValue, queryClient]);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'star',
        width: 60,
        disableColumnMenu: true,
        renderHeader: () => <StarColumnHeader />,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <StartToggleButton
            isStarred={params.row.isStarred}
            locationId={params.row.id}
            onToggle={handleSetFilteredValue}
          />
        ),
      },
      {
        field: 'locations',
        headerName: 'Locations',
        flex: 2,
        renderCell: (params: GridRenderCellParams) => (
          <LocationButton isDisabled={params.row.robotId === ''}>
            {params.value}
          </LocationButton>
        ),
      },
      {
        field: 'robotId',
        headerName: 'Robots',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => (
          <RobotCell
            noRobotId={params.row.robotId === ''}
            text={params.value}
          />
        ),
      },
      { field: 'locationType', headerName: 'Location Types', flex: 1 },
    ],
    [handleSetFilteredValue]
  );

  return (
    <DataGrid
      rows={locations}
      columns={columns}
      checkboxSelection
      loading={isPending}
      slotProps={{
        loadingOverlay: {
          variant: 'skeleton',
          noRowsVariant: 'skeleton',
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
        borderBottomStyle: 'none',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
      }}
    />
  );
};
