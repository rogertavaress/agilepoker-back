import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHistoriesRepository from '../repositories/IHistoriesRepository';
import Meet from '../infra/typeorm/entities/Meet';
import IMeetsRepository from '../repositories/IMeetsRepository';

interface IRequest {
  id: string;
}
@injectable()
class RemoveHistoryService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,

    @inject('HistoriesRepository')
    private historiesRepository: IHistoriesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Meet> {
    const history = await this.historiesRepository.findByID(id);

    if (!history) {
      throw new AppError('História não encontrada');
    }

    const { meet_id } = history;

    this.historiesRepository.destroy(history);

    const meet = await this.meetsRepository.findByID(meet_id);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    return meet;
  }
}

export default RemoveHistoryService;
