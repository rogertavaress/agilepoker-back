import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Meet from '../infra/typeorm/entities/Meet';
import IMeetsRepository from '../repositories/IMeetsRepository';

interface IRequest {
  idMeet: string;
  idHistory: number;
}
@injectable()
class ChangeHistoryNowService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,
  ) {}

  public async execute({ idMeet, idHistory }: IRequest): Promise<Meet> {
    let meet = await this.meetsRepository.findByID(idMeet);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    meet.historyNowId = idHistory;
    meet.historyNow = undefined;

    await this.meetsRepository.save(meet);

    meet = await this.meetsRepository.findByID(idMeet);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    return meet;
  }
}

export default ChangeHistoryNowService;
