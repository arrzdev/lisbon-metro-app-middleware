import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MetroService from '@ioc:diconium/MetroService';
import Cache from '@ioc:Adonis/Addons/Adonis5-Cache';

export default class LinesController {
  public async index() {
    return await Cache.get(`lines`, async () => await MetroService.getLinesStatus());
  }

  public async show({ request }: HttpContextContract) {
    const lineId = request.param('line');

    return await Cache.get(`line-${lineId}`, async () => await MetroService.getLineStatus(lineId));
  }

  public async waitingTimes({ request }: HttpContextContract) {
    const lineId = request.param('line');

    return await Cache.get(
      `line-${lineId}-waitingTime`,
      async () => await MetroService.getLineWaitingTimes(lineId),
    );
  }

  public async frequency({ request }: HttpContextContract) {
    const { line: lineId, day, hour } = request.params();

    return await Cache.get(
      `line-${lineId}-${day}-${hour ?? ''}-frequency`,
      async () => await MetroService.getLineFrequency(lineId, day, hour),
    );
  }
}
