import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MeetStatusEnum from '../enums/MeetStatusEnum';
import Meet from '../infra/typeorm/entities/Meet';
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

    meet.status = newStatus;

    await this.meetsRepository.save(meet);

    return meet;
  }
}

export default UpdateMeetStatusService;
