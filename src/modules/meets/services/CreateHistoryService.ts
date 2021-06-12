import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
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

    return meet;
  }
}

export default CreateHistoryService;
