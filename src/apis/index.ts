import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:3000",
});

export interface LocationsPathParams {
  page?: string;
  location_name?: string;
  robot_id?: string;
  is_starred?: string;
}

export const fetchLocations = async (params?: LocationsPathParams) => {
  const response = await Axios.get("/locations", { params });
  return response.data;
};
