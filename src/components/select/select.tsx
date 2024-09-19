import Button from '@mui/material/Button';
import { useState, MouseEvent, useMemo, Dispatch, useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { SelectText } from './selectText';
import { Options } from './options';
import StarIcon from '@mui/icons-material/Star';
import { useFetchLocations } from '../../hooks/useFetchLocations';

const iconCommonStyleProps = {
  width: '24px',
  height: '24px',
  color: '#000000',
};

const STARRED_PREFIX = 'Starred';

interface SelectProps {
  selectedValue: string;
  setSelectedValue: Dispatch<React.SetStateAction<string>>;
}

export const Select: React.FC<SelectProps> = ({
  selectedValue,
  setSelectedValue,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'dropdown-popover' : undefined;
  const { data: allLocations = [] } = useFetchLocations();

  const optionList = useMemo(() => {
    const locations = allLocations.map((item) => ({
      name: item.locations,
      id: item.id.toString(),
    }));

    const starredCount = allLocations.filter((item) => item.isStarred).length;

    return [
      { id: 'all', name: 'All Locations' },
      {
        id: 'starred',
        name: `${STARRED_PREFIX}(${starredCount})`,
        icon: StarIcon,
        iconColor: '#F7B500',
      },
      ...locations,
    ];
  }, [allLocations]);

  const starredCount = useMemo(() => {
    return allLocations.filter((item) => item.isStarred).length;
  }, [allLocations]);

  useEffect(() => {
    if (selectedValue.includes(STARRED_PREFIX)) {
      setSelectedValue(`${STARRED_PREFIX}(${starredCount})`);
    }
  }, [starredCount, selectedValue, setSelectedValue]);

  const handleTogglePopover = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-describedby={id}
        variant="outlined"
        sx={{
          width: '220px',
          py: '7px',
          backgroundColor: '#FAFAFA',
          borderWidth: 1,
          borderColor: isOpen ? '#133BD3' : '#E4E4E4',
          borderStyle: 'solid',
          borderRadius: '8px',
          color: isOpen ? '#222222' : '#8E8E8E',
        }}
        endIcon={
          isOpen ? (
            <ArrowDropUpIcon sx={iconCommonStyleProps} />
          ) : (
            <ArrowDropDownIcon sx={iconCommonStyleProps} />
          )
        }
        onClick={handleTogglePopover}
      >
        <SelectText>{selectedValue}</SelectText>
      </Button>
      <Options
        id={id}
        isOpen={isOpen}
        anchorEl={anchorEl}
        list={optionList}
        selectedValue={selectedValue}
        onClose={handleClose}
        onSetSelectedValue={setSelectedValue}
      />
    </>
  );
};
