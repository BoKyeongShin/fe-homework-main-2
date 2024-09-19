import { IconButton } from '@mui/material';
import { MouseEvent } from 'react';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStar } from '../../apis';

interface StartToggleButtonProp {
  isStarred: boolean;
  locationId: string;
}

export const StartToggleButton: React.FC<StartToggleButtonProp> = ({
  locationId,
  isStarred,
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: () => updateStar(locationId, !isStarred),
  });
  const handleToggle = async (e: MouseEvent) => {
    e.stopPropagation();
    // update star > put starred_location_id
    try {
      await mutateAsync();
      queryClient.invalidateQueries();
    } catch (error) {
      // TODO: alert
      console.log('error');
    }
  };

  return (
    <IconButton
      aria-label="star"
      sx={{ color: isStarred ? '' : '8E8E8E' }}
      onClick={handleToggle}
    >
      {!isStarred && <StarOutlineIcon sx={{ color: '#8E8E8E' }} />}
      {isStarred && <StarIcon sx={{ color: '#F7B500' }} />}
    </IconButton>
  );
};
