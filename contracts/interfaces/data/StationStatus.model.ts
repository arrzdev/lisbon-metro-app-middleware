export interface StationStatus {
  id: string;
  dock: string;
  hour: string;
  trains: {
    id: string;
    arriveIn: string;
  }[];
  destination: string;
  // sairServico: string; ??
  // UT: number; ??
}
