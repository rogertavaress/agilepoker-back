import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Meet from '../infra/typeorm/entities/Meet';
import IHistoryRepository from '../repositories/IHistoryRepository';
import IMeetsRepository from '../repositories/IMeetsRepository';
import IVotesRepository from '../repositories/IVotesRepository';

interface IRequest {
  number: number;
  participantId: string;
  historyId: string;
  meetId: string;
}
@injectable()
class CreateVotesService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,

    @inject('VotesRepository')
    private votesRepository: IVotesRepository,

    @inject('HistoryRepository')
    private historyRepository: IHistoryRepository,
  ) {}

  public async execute({
    number,
    participantId,
    historyId,
    meetId,
  }: IRequest): Promise<Meet> {
    let meet = await this.meetsRepository.findByID(meetId);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    const history = await this.historyRepository.findByID(historyId);

    if (!history) {
      throw new AppError('História não encontrada');
    }

    let vote = await this.votesRepository.findOne({
      historyId,
      participantId,
    });

    if (vote) {
      vote.number = number;
    } else {
      vote = this.votesRepository.create({
        number,
        participantId,
        historyId,
        meetId,
      });
    }

    await this.votesRepository.save(vote);

    meet = await this.meetsRepository.findByID(meetId);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    return meet;
  }
}

export default CreateVotesService;
