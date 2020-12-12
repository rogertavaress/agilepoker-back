import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHistoryRepository from '../repositories/IHistoryRepository';
import IMeetsRepository from '../repositories/IMeetsRepository';
import Meet from '../infra/typeorm/entities/Meet';

interface IRequest {
  name: string;
  category: string;
  meetId: string;
}
@injectable()
class CreateHistoryService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,

    @inject('HistoryRepository')
    private historyRepository: IHistoryRepository,
  ) {}

  public async execute({ name, category, meetId }: IRequest): Promise<Meet> {
    const meet = await this.meetsRepository.findByID(meetId);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    const history = this.historyRepository.create({
      name,
      category,
      meetId,
    });

    await this.historyRepository.save(history);

    if (meet.histories.length) {
      meet.histories.push(history);
    } else {
      meet.histories = [history];
    }

    return meet;
  }
}

export default CreateHistoryService;
