import Route from '@ioc:Adonis/Core/Route';
import { LineMapping } from 'Config/metro';

const lineMatcher = RegExp(`\\b(${Object.keys(LineMapping).join('|')})\\b`);

Route.group(() => {
  Route.get('/', 'LinesController.index');
  Route.get('/:line', 'LinesController.show').where('line', lineMatcher);
  Route.get('/:line/waitingTimes', 'LinesController.waitingTimes').where('line', lineMatcher);
  Route.get('/:line/frequency/:day/:hour?', 'LinesController.frequency')
    .where('line', lineMatcher)
    .where('day', /^(S|s|F|f)$/)
    .where('hour', /^([01][0-9]|2[0-3])([0-5][0-9]){2}$/);
}).prefix('/lines');
