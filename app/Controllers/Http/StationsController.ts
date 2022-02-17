import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MetroService from '@ioc:diconium/MetroService';
import Cache from '@ioc:Adonis/Addons/Adonis5-Cache';
import { StationInfo } from 'Contracts/interfaces/data/StationInfo.model';

export default class StationsController {
  public async index() {
    return await Cache.get<StationInfo[]>(`stations`, async () => await MetroService.getStationsInfo());
  }

  public async show({ request }: HttpContextContract) {
    const stationId = request.param('station');

    return await Cache.get<StationInfo>(
      `station-${stationId}`,
      async () => await MetroService.getStationInfo(stationId),
    );
  }

  public async waitingTimes({ request }: HttpContextContract) {
    const stationId = request.param('station');

    if (stationId === 'all') {
      return await Cache.get(`station-all-waitingTime`, async () => await MetroService.getStationsWaitingTimes());
    }

    return await Cache.get(
      `station-${stationId}-waitingTime`,
      async () => await MetroService.getStationWaitingTimes(stationId),
      1800,
    );
  }
}
