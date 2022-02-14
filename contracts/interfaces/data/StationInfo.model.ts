export interface StationInfo {
  id: string;
  name: string;
  position: {
    lat: string;
    long: string;
  };
  urls: string[];
  line: string[];
  zoneId: string;
}
