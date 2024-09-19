import { Title } from '../title/title';
import { SearchBar } from '../searchBar/searchBar';
import { Select } from '../select/select';
import { Grid } from '../grid/grid';
import { Box } from '@mui/material';
import { useState } from 'react';

const getQueryKeyParams = (searchValue: string) => {
  if (searchValue === 'All Locations') {
    return null;
  }

  if (searchValue.includes('Starred')) {
    return {
      is_starred: 'true',
    };
  }

  return { location_name: searchValue };
};

export const FleetContent = () => {
  const [filteredValue, setFilteredValue] = useState('All Locations');
  const [searchValue, setSearchValue] = useState('');

  return (
    <Box component="main" sx={{ px: '52px', py: 5 }}>
      <Title>Your Fleet </Title>
      <Box
        sx={{
          display: 'flex',
          height: '40px',
          marginTop: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Select
            selectedValue={filteredValue}
            setSelectedValue={setFilteredValue}
          />
        </Box>
        <SearchBar
          placeholder="Search robot or location"
          setInputValue={setSearchValue}
        />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Grid filteredValue={filteredValue} searchValue={searchValue} />
      </Box>
    </Box>
  );
};
