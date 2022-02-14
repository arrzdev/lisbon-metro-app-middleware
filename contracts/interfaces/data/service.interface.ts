export interface CommonResponse<T> {
  resposta: T;
}

export interface StationInfoData {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_long: string;
  stop_url: string;
  linha: string;
  zone_id: string;
}

export interface StationStatusData {
  stop_id: string;
  cais: string;
  hora: string;
  comboio: string;
  tempoChegada1: string;
  comboio2: string;
  tempoChegada2: string;
  comboio3: string;
  tempoChegada3: string;
  destino: string;
  sairServico: string;
  UT: string;
}

export type LineColor = 'amarela' | 'azul' | 'verde' | 'vermelha';
type LineMessageType = 'tipo_msg_am' | 'tipo_msg_az' | 'tipo_msg_vd' | 'tipo_msg_vm';

export type LineStatusData = {
  [key in LineColor]?: string;
} & {
  [key in LineMessageType]?: string;
};

export interface DestinationInformationData {
  id_destino: string;
  nome_destino: string;
}

export interface FrequencyInfoData {
  Linha: string;
  HoraInicio: string;
  HoraFim: string;
  Intervalo: string;
  UT: number;
}
