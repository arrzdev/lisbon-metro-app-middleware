import { DestinationInformation } from 'Contracts/interfaces/data/DestinationInformation.model';
import { LineStatus } from 'Contracts/interfaces/data/LineStatus.model';
import {
  DestinationInformationData,
  FrequencyInfoData,
  LineStatusData,
  StationInfoData,
  StationStatusData,
} from 'Contracts/interfaces/data/service.interface';
import { StationInfo } from 'Contracts/interfaces/data/StationInfo.model';
import { StationStatus } from 'Contracts/interfaces/data/StationStatus.model';
import { FrequencyInfo } from 'Contracts/interfaces/data/FrequencyInfo.model';
import { LineMapping } from 'Config/metro';

export class MetroServiceMapper {
  public static fromStationData(data: StationStatusData): StationStatus {
    return {
      id: data.stop_id,
      destination: data.destino,
      dock: data.cais,
      hour: data.hora,
      trains: [
        { id: data.comboio, arriveIn: data.tempoChegada1 },
        { id: data.comboio2, arriveIn: data.tempoChegada2 },
        { id: data.comboio3, arriveIn: data.tempoChegada3 },
      ],
    };
  }

  public static fromStationInfoData(data: StationInfoData): StationInfo {
    return {
      id: data.stop_id,
      name: data.stop_name,
      position: {
        lat: data.stop_lat,
        lon: data.stop_lon,
      },
      urls: MetroServiceMapper.parseArrays(data.stop_url),
      line: MetroServiceMapper.parseArrays(data.linha).map(MetroServiceMapper.mapColor).filter(Boolean) as string[],
      zoneId: data.zone_id,
    };
  }

  public static fromLineStatus(data: Partial<LineStatusData>): Partial<LineStatus> {
    return {
      ...(data.amarela ? { yellow: { status: data.amarela?.trim(), message: data.tipo_msg_am } } : {}),
      ...(data.verde ? { green: { status: data.verde?.trim(), message: data.tipo_msg_vd } } : {}),
      ...(data.azul ? { blue: { status: data.azul?.trim(), message: data.tipo_msg_az } } : {}),
      ...(data.vermelha ? { red: { status: data.vermelha?.trim(), message: data.tipo_msg_vm } } : {}),
    };
  }

  public static fromDestinationInformationData(data: DestinationInformationData): DestinationInformation {
    return {
      id: Number(data.id_destino),
      name: data.nome_destino,
    };
  }

  public static fromFrequencyInfoData(data: FrequencyInfoData): FrequencyInfo {
    const line = Object.entries(LineMapping).find(([, value]) => value === data.Linha.toLowerCase());
    if (!line) {
      throw `${data.Linha} is unknown`;
    }

    return {
      line: line[0],
      start: data.HoraInicio,
      end: data.HoraFim,
      frequency: data.Intervalo,
    };
  }

  private static parseArrays(data: string) {
    return data
      .replace(/[\[\]]/g, '')
      .split(',')
      .map((s) => s.trim());
  }

  private static mapColor(color: string) {
    return Object.entries(LineMapping).find(([, lineColor]) => lineColor === color.toLocaleLowerCase())?.[0];
  }
}
