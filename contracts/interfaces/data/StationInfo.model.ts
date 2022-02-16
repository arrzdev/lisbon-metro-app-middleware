export interface StationInfo {
  id: string;
  name: string;
  position: {
    lat: string;
    lon: string;
  };
  urls: string[];
  line: string[];
  zoneId: string;
}
