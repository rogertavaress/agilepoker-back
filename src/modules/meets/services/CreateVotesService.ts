import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Meet from '../infra/typeorm/entities/Meet';
import IHistoriesRepository from '../repositories/IHistoriesRepository';
import IMeetsRepository from '../repositories/IMeetsRepository';
import IVotesRepository from '../repositories/IVotesRepository';

interface IRequest {
  number: number;
  participant_id: string;
  history_id: string;
  meet_id: string;
}
@injectable()
class CreateVotesService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,

    @inject('VotesRepository')
    private votesRepository: IVotesRepository,

    @inject('HistoriesRepository')
    private historiesRepository: IHistoriesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    number,
    participant_id,
    history_id,
    meet_id,
  }: IRequest): Promise<Meet> {
    let meet = await this.meetsRepository.findByID(meet_id);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    const history = await this.historiesRepository.findByID(history_id);

    if (!history) {
      throw new AppError('História não encontrada');
    }

    let vote = await this.votesRepository.findOne({
      history_id,
      participant_id,
    });

    if (vote) {
      vote.number = number;
    } else {
      vote = this.votesRepository.create({
        number,
        participant_id,
        history_id,
        meet_id,
      });
    }

    await this.votesRepository.save(vote);

    meet = await this.meetsRepository.findByID(meet_id);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    await this.cacheProvider.invalidate(`meets:${meet.id}`);

    return meet;
  }
}

export default CreateVotesService;
