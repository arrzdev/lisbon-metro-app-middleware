import Env from '@ioc:Adonis/Core/Env';

export const endpoint: string = Env.get('METRO_ENDPOINT');
export const token: string = Env.get('METRO_API_KEY');

export const LineMapping = {
  all: 'todos',
  blue: 'azul',
  green: 'verde',
  yellow: 'amarela',
  red: 'vermelha',
};
