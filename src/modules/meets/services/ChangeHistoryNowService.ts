import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Meet from '../infra/typeorm/entities/Meet';
import IHistoriesRepository from '../repositories/IHistoriesRepository';
import IMeetsRepository from '../repositories/IMeetsRepository';

interface IRequest {
  meet_id: string;
  history_id: string;
}
@injectable()
class ChangeHistoryNowService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,

    @inject('HistoriesRepository')
    private historiesRepository: IHistoriesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ meet_id, history_id }: IRequest): Promise<Meet> {
    let meet = await this.meetsRepository.findByID(meet_id);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    const history = await this.historiesRepository.findByID(history_id);

    if (!history) {
      throw new AppError('História não encontrada');
    }

    meet.history_now_id = history_id;
    meet.history_now = undefined;

    await this.meetsRepository.save(meet);

    meet = await this.meetsRepository.findByID(meet_id);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    await this.cacheProvider.invalidate(`meets:${meet.id}`);

    return meet;
  }
}

export default ChangeHistoryNowService;
