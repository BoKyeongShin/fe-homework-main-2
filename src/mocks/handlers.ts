import { http, HttpResponse } from 'msw';

import { Location, locations } from './db';

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
  http.get<LocationsPathParams>('/locations', ({ params, request }) => {
    const url = new URL(request.url);
    const locationName = url.searchParams.get('location_name');
    const robotId = url.searchParams.get('robot_id');
    const isStarredStr = url.searchParams.get('is_starred');

    if (isStarredStr !== null && locationName === null && robotId === null) {
      const isStarred = isStarredStr === 'true';
      const filteredLocations = locations.filter(
        (locationData) => locationData.is_starred === isStarred
      );
      const result: LocationsResult = {
        total_count: filteredLocations.length,
        locations: filteredLocations,
      };

      return HttpResponse.json(result);
    }

    if (locationName !== null) {
      const locationNameLowerCase = locationName.toLowerCase();
      let filteredLocations = locations.filter((locationData) =>
        locationData.name.toLowerCase().includes(locationNameLowerCase)
      );

      if (isStarredStr !== null) {
        const isStarred = isStarredStr === 'true';
        filteredLocations = filteredLocations.filter(
          (locationData) => locationData.is_starred === isStarred
        );
      }

      const result: LocationsResult = {
        total_count: filteredLocations.length,
        locations: filteredLocations,
      };

      return HttpResponse.json(result);
    }

    if (robotId !== null) {
      const robotIdLowerCase = robotId.toLowerCase();
      let filteredLocations = locations.filter((locationData) =>
        locationData.robot?.id.toLowerCase().includes(robotIdLowerCase)
      );

      if (isStarredStr !== null) {
        const isStarred = isStarredStr === 'true';
        filteredLocations = filteredLocations.filter(
          (locationData) => locationData.is_starred === isStarred
        );
      }
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

  http.get('/starred_location_ids', () => {
    // TODO: 구현하기
    const location_ids = JSON.parse(
      sessionStorage.getItem('starred_location_ids') || '[]'
    );

    return HttpResponse.json({
      location_ids,
    });
  }),

  http.put('/starred_location_ids', async ({ request, params }) => {
    const body = (await request.json()) as { id: number; is_starred: boolean };
    if (!body) {
      return HttpResponse.json(
        { error_msg: 'Encountered unexpected error' },
        { status: 500 }
      );
    }

    // db.ts를 업데이트 하기 위해 원본 locations 데이터 조작
    const result = locations;
    locations.forEach((location) => {
      if (location.id === body.id) {
        location.is_starred = body.is_starred;
      }
    });

    // TODO: sessionStorage 구현
    // sessionStorage.setItem('starred_location_ids', JSON.stringify(result));

    return HttpResponse.json(result);
  }),
];
