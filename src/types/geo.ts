export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Point = {
  id: string;
  title: string;
} & Location;
