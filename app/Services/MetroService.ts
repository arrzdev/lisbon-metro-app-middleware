import axios from 'axios';
import MetroServiceInterface from 'Contracts/interfaces/MetroService.interface';
import { endpoint, token, LineMapping } from 'Config/metro';
import {
  CommonResponse,
  DestinationInformationData,
  FrequencyInfoData,
  LineStatusData,
  StationInfoData,
  StationStatusData,
} from 'Contracts/interfaces/data/service.interface';
import { LineColor } from 'Contracts/interfaces/data/LineStatus.model';

import { MetroServiceMapper } from './MetroService.mapper';

axios.defaults.baseURL = endpoint;
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

export class MetroService implements MetroServiceInterface {
  public getLinesStatus() {
    return axios
      .get<CommonResponse<LineStatusData>>('/estadoLinha/todos')
      .then(({ data }) => MetroServiceMapper.fromLineStatus(data.resposta));
  }

  public getLineStatus(lineId: LineColor) {
    return axios
      .get<CommonResponse<LineStatusData>>(`estadoLinha/${LineMapping[lineId]}`)
      .then(({ data }) => MetroServiceMapper.fromLineStatus(data.resposta));
  }

  public getLineWaitingTimes(lineId: LineColor) {
    return axios
      .get<CommonResponse<StationStatusData[]>>(`tempoEspera/Linha/${LineMapping[lineId]}`)
      .then(({ data }) => data.resposta.map(MetroServiceMapper.fromStationData));
  }

  public getLineFrequency(lineId: string, day: string, hour?: string) {
    if (hour) {
      return axios
        .get<CommonResponse<FrequencyInfoData>>(`/infoIntervalos/${LineMapping[lineId]}/${day}/${hour}`)
        .then(({ data }) => MetroServiceMapper.fromFrequencyInfoData(data.resposta));
    }

    return axios
      .get<CommonResponse<FrequencyInfoData[]>>(`/infoIntervalos/${LineMapping[lineId]}/${day}`)
      .then(({ data }) => data.resposta.map(MetroServiceMapper.fromFrequencyInfoData));
  }

  public getStationsInfo() {
    return axios
      .get<CommonResponse<StationInfoData[]>>(`/infoEstacao/todos`)
      .then(({ data }) => data.resposta.map(MetroServiceMapper.fromStationInfoData));
  }

  public getStationInfo(stationId: string) {
    return axios
      .get<CommonResponse<StationInfoData[]>>(`/infoEstacao/${stationId}`)
      .then(({ data }) => MetroServiceMapper.fromStationInfoData(data.resposta?.[0]));
  }

  public getStationsWaitingTimes() {
    return axios
      .get<CommonResponse<StationStatusData[]>>(`/tempoEspera/Estacao/todos`)
      .then(({ data }) => data.resposta.map(MetroServiceMapper.fromStationData));
  }

  public getStationWaitingTimes(stationId: string) {
    return axios
      .get<CommonResponse<StationStatusData[]>>(`/tempoEspera/Estacao/${stationId}`)
      .then(({ data }) => data.resposta.map(MetroServiceMapper.fromStationData));
  }

  public getDestinationsInformation() {
    return axios
      .get<CommonResponse<DestinationInformationData[]>>(`/infoDestinos/todos`)
      .then(({ data }) => data.resposta.map(MetroServiceMapper.fromDestinationInformationData));
  }
}
