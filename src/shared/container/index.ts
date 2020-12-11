import MeetsRepository from '@modules/meets/infra/typeorm/repositories/MeetsRepository';
import ParticipantsRepository from '@modules/meets/infra/typeorm/repositories/ParticipantsRepository';
import IMeetsRepository from '@modules/meets/repositories/IMeetsRepository';
import IParticipantsRepository from '@modules/meets/repositories/IParticipantsRepository';
import { container } from 'tsyringe';

import './providers';

container.registerSingleton<IMeetsRepository>(
  'MeetsRepository',
  MeetsRepository,
);

container.registerSingleton<IParticipantsRepository>(
  'ParticipantsRepository',
  ParticipantsRepository,
);
