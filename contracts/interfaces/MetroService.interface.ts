import { DestinationInformation } from 'Contracts/interfaces/data/DestionationInformation.model';
import { LineStatus } from 'Contracts/interfaces/data/LineStatus.model';
import { StationStatus } from 'Contracts/interfaces/data/StationStatus.model';
import { StationInfo } from 'Contracts/interfaces/data/StationInfo.model';
import { FrequencyInfo } from 'Contracts/interfaces/data/FrequencyInfo.model';

export default interface MetroServiceInterface {
  getLinesStatus(): Promise<LineStatus>;
  getLineStatus(lineId: string): Promise<LineStatus>;
  getLineWaitingTimes(lineId: string): Promise<StationStatus[]>;
  getLineFrequency(lineId: string, day: string, hour?: string): Promise<FrequencyInfo | FrequencyInfo[]>;

  getStationsInfo(): Promise<StationInfo[]>;
  getStationInfo(stationId: string): Promise<StationInfo>;
  getStationsWaitingTimes(): Promise<StationStatus[]>;
  getStationWaitingTimes(stationId: string): Promise<StationStatus[]>;

  getDestinationsInformation(): Promise<DestinationInformation[]>;
}
