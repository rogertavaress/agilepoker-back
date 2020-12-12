import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHistoryRepository from '../repositories/IHistoryRepository';
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

    @inject('HistoryRepository')
    private historyRepository: IHistoryRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Meet> {
    const history = await this.historyRepository.findByID(id);

    if (!history) {
      throw new AppError('História não encontrada');
    }

    const { meetId } = history;

    this.historyRepository.destroy(history);

    const meet = await this.meetsRepository.findByID(meetId);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    return meet;
  }
}

export default RemoveHistoryService;
