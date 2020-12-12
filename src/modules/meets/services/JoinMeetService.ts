import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMeetsRepository from '../repositories/IMeetsRepository';
import IParticipantsRepository from '../repositories/IParticipantsRepository';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class JoinMeetService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,

    @inject('ParticipantsRepository')
    private participantsRepository: IParticipantsRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<any> {
    const meet = await this.meetsRepository.findByID(id);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    const participant = this.participantsRepository.create({
      meetId: meet.id,
      name,
    });

    await this.participantsRepository.save(participant);

    return {
      meet: {
        ...meet,
        participants: meet.participants
          ? [...meet.participants, participant]
          : [participant],
      },
      participant,
    };
  }
}

export default JoinMeetService;
