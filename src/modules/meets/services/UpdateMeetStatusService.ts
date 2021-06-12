/* eslint-disable import/no-duplicates */
import AppError from '@shared/errors/AppError';
import { differenceInMilliseconds, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { inject, injectable } from 'tsyringe';
import MeetStatusEnum from '../enums/MeetStatusEnum';
import Meet from '../infra/typeorm/entities/Meet';
import IHistoryRepository from '../repositories/IHistoryRepository';
import IMeetsRepository from '../repositories/IMeetsRepository';

interface IRequest {
  idMeet: string;
  statusMeet: string;
}

@injectable()
class UpdateMeetStatusService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,

    @inject('HistoryRepository')
    private historyRepository: IHistoryRepository,
  ) {}

  public async execute({ idMeet, statusMeet }: IRequest): Promise<Meet> {
    const meet = await this.meetsRepository.findByID(idMeet);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    const newStatus =
      MeetStatusEnum[statusMeet.toUpperCase() as keyof typeof MeetStatusEnum];

    if (!newStatus) {
      throw new AppError('Status não encontrado');
    }

    if (
      newStatus === MeetStatusEnum.PAUSED &&
      meet.status === MeetStatusEnum.PLAYED
    ) {
      const history = meet.historyNow;

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

        await this.historyRepository.save(history);
      }
    }

    meet.status = newStatus;

    await this.meetsRepository.save(meet);

    return meet;
  }
}

export default UpdateMeetStatusService;
