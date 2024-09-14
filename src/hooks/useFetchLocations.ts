import { useQuery } from "@tanstack/react-query";
import { fetchLocations, LocationsPathParams } from "../apis";
import { LocationsResult } from "../mocks/handlers";
import { Location } from "../mocks/db";

export const useFetchLocations = (
  // keyParam: "location_name" | "robot_id" | "is_starred" | "all",
  params?: LocationsPathParams,
) => {
  return useQuery({
    queryKey: ["locations", params],
    queryFn: () => fetchLocations(params),
    select: (data: LocationsResult) => {
      return data.locations.map((locationData: Location) => {
        return {
          id: locationData.id,
          locations: locationData.name,
          robotId: locationData.robot.id,
          isStarred: locationData.is_starred,
          // locationType에 대한 정보가 없어서 임의로 추가함
          locationType: "Serving",
        };
      });
    },
  });
};
