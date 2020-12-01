import MeetsRepository from '@modules/meets/infra/typeorm/repositories/MeetsRepository';
import IMeetsRepository from '@modules/meets/repositories/IMeetsRepository';
import { container } from 'tsyringe';

import './providers';

container.registerSingleton<IMeetsRepository>(
  'MeetsRepository',
  MeetsRepository,
);
