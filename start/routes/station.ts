import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('/', 'StationsController.index');
  Route.get('/:station', 'StationsController.show');
  Route.get('/:station/waitingTimes', 'StationsController.waitingTimes');
}).prefix('/stations');
