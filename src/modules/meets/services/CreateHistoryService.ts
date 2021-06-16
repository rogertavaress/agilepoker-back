import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHistoriesRepository from '../repositories/IHistoriesRepository';
import IMeetsRepository from '../repositories/IMeetsRepository';
import Meet from '../infra/typeorm/entities/Meet';

interface IRequest {
  name: string;
  category: string;
  meet_id: string;
}
@injectable()
class CreateHistoryService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,

    @inject('HistoriesRepository')
    private historiesRepository: IHistoriesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, category, meet_id }: IRequest): Promise<Meet> {
    const meet = await this.meetsRepository.findByID(meet_id);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    const history = this.historiesRepository.create({
      name,
      category,
      meet_id,
    });

    await this.historiesRepository.save(history);

    if (meet.histories.length) {
      meet.histories.push(history);
    } else {
      meet.histories = [history];
    }

    await this.cacheProvider.invalidate(`meets:${meet.id}`);

    return meet;
  }
}

export default CreateHistoryService;
