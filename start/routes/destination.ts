import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('/', 'DestinationsController.index');
}).prefix('/destinations');
