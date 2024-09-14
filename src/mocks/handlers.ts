import { http, HttpResponse } from "msw";

import { Location, locations } from "./db";

export interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const handlers = [
  http.get<LocationsPathParams>("/locations", ({ params, request }) => {
    const url = new URL(request.url);
    const locationName = url.searchParams.get("location_name");
    const robotId = url.searchParams.get("robot_id");
    const isStarredStr = url.searchParams.get("is_starred");

    if (isStarredStr !== null) {
      const isStarred = isStarredStr === "true";
      const filteredLocations = locations.filter(
        (locationData) => locationData.is_starred === isStarred,
      );
      const result: LocationsResult = {
        total_count: filteredLocations.length,
        locations: filteredLocations,
      };

      return HttpResponse.json(result);
    }

    if (locationName !== null) {
      const filteredLocations = locations.filter((locationData) =>
        locationData.name.includes(locationName),
      );
      const result: LocationsResult = {
        total_count: filteredLocations.length,
        locations: filteredLocations,
      };

      return HttpResponse.json(result);
    }

    if (robotId !== null) {
      const filteredLocations = locations.filter(
        (locationData) => locationData.id === parseInt(robotId),
      );
      const result: LocationsResult = {
        total_count: filteredLocations.length,
        locations: filteredLocations,
      };

      return HttpResponse.json(result);
    }

    const result: LocationsResult = {
      total_count: locations.length,
      locations: locations,
    };

    return HttpResponse.json(result);
  }),

  http.get("/starred_location_ids", () => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]",
    );

    return HttpResponse.json({
      location_ids,
    });
  }),

  http.put("/starred_location_ids", ({ request }) => {
    if (!request.body) {
      return HttpResponse.json(
        { error_msg: "Encountered unexpected error" },
        { status: 500 },
      );
    }

    sessionStorage.setItem(
      "starred_location_ids",
      JSON.stringify(request.body),
    );

    return HttpResponse.json(null, { status: 204 });
  }),
];
