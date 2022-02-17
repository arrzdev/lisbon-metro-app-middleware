import MetroService from '@ioc:diconium/MetroService';
import Cache from '@ioc:Adonis/Addons/Adonis5-Cache';
import { DestinationInformation } from 'Contracts/interfaces/data/DestinationInformation.model';

export default class DestinationsController {
  public async index() {
    return await Cache.get<DestinationInformation[]>(
      `destinations`,
      async () => await MetroService.getDestinationsInformation(),
    );
  }
}
