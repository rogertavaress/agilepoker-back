import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';
import Participant from '../infra/typeorm/entities/Participant';
import IParticipantsRepository from '../repositories/IParticipantsRepository';

interface IRequest {
  participant_id: string;
  altitude: number;
  latitude: number;
  longitude: number;
}

@injectable()
class UpdateLocationService {
  constructor(
    @inject('ParticipantsRepository')
    private participantsRepository: IParticipantsRepository,
  ) {}

  public async execute({
    participant_id,
    altitude,
    latitude,
    longitude,
  }: IRequest): Promise<Participant> {
    if (!validate(participant_id)) {
      throw new AppError('Participante inválido');
    }

    const participant = await this.participantsRepository.findByID(
      participant_id,
    );

    if (!participant) {
      throw new AppError('Participante não encontrado');
    }

    participant.altitude = altitude;
    participant.latitude = latitude;
    participant.longitude = longitude;

    await this.participantsRepository.save(participant);

    return participant;
  }
}

export default UpdateLocationService;
