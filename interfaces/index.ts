export interface Item {
  id?: string;
  name: string;
  author: string;
  description: string;
  quantity: number;
  location: string;
}

export interface City {
  name: string;
  lat: number;
  lon: number;
}
