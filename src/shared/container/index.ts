import HistoriesRepository from '@modules/meets/infra/typeorm/repositories/HistoriesRepository';
import MeetsRepository from '@modules/meets/infra/typeorm/repositories/MeetsRepository';
import ParticipantsRepository from '@modules/meets/infra/typeorm/repositories/ParticipantsRepository';
import VotesRepository from '@modules/meets/infra/typeorm/repositories/VotesRepository';
import IHistoriesRepository from '@modules/meets/repositories/IHistoriesRepository';
import IMeetsRepository from '@modules/meets/repositories/IMeetsRepository';
import IParticipantsRepository from '@modules/meets/repositories/IParticipantsRepository';
import IVotesRepository from '@modules/meets/repositories/IVotesRepository';
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

container.registerSingleton<IHistoriesRepository>(
  'HistoriesRepository',
  HistoriesRepository,
);

container.registerSingleton<IVotesRepository>(
  'VotesRepository',
  VotesRepository,
);
