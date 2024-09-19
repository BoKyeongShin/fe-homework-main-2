import { useMutation } from '@tanstack/react-query';
import { updateStar } from '../apis';

export const useStarredMutate = (locationId: string, isStarred: boolean) => {
  return useMutation({
    mutationFn: () => updateStar(locationId, isStarred),
  });
};
