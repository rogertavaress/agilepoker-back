import { container } from 'tsyringe';

import '@modules/exampleModule/providers';
import './providers';

import IUsersRepository from '@modules/exampleModule/repositories/IUsersRepository';
import UsersRepository from '@modules/exampleModule/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/exampleModule/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/exampleModule/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
