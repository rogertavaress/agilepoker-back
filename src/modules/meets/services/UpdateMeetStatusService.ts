/* eslint-disable import/no-duplicates */
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { differenceInMilliseconds, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { inject, injectable } from 'tsyringe';
import MeetStatusEnum from '../enums/MeetStatusEnum';
import Meet from '../infra/typeorm/entities/Meet';
import IHistoriesRepository from '../repositories/IHistoriesRepository';
import IMeetsRepository from '../repositories/IMeetsRepository';

interface IRequest {
  meet_id: string;
  status_meet: string;
}

@injectable()
class UpdateMeetStatusService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,

    @inject('HistoriesRepository')
    private historiesRepository: IHistoriesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ meet_id, status_meet }: IRequest): Promise<Meet> {
    const meet = await this.meetsRepository.findByID(meet_id);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    const newStatus =
      MeetStatusEnum[status_meet.toUpperCase() as keyof typeof MeetStatusEnum];

    if (!newStatus) {
      throw new AppError('Status não encontrado');
    }

    if (
      newStatus === MeetStatusEnum.PAUSED &&
      meet.status === MeetStatusEnum.PLAYED
    ) {
      const history = meet.history_now;

      if (history) {
        history.time += differenceInMilliseconds(
          new Date(),
          new Date(meet.updated_at),
        );

        history.time_parsed = formatDistance(history.time, 0, {
          includeSeconds: true,
          locale: ptBR,
        });

        const historyIndex = meet.histories.findIndex(
          item => item.id === history.id,
        );

        if (historyIndex >= 0) {
          meet.histories[historyIndex] = history;
        }

        await this.historiesRepository.save(history);
      }
    }

    meet.status = newStatus;

    await this.meetsRepository.save(meet);

    await this.cacheProvider.invalidate(`meets:${meet.id}`);

    return meet;
  }
}

export default UpdateMeetStatusService;
