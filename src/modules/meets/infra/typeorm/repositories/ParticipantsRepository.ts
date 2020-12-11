import ICreateParticipantDTO from '@modules/meets/dtos/ICreateParticipantDTO';
import IParticipantsRepository from '@modules/meets/repositories/IParticipantsRepository';
import { getRepository, Repository } from 'typeorm';
import Participant from '../entities/Participant';

class ParticipantsRepository implements IParticipantsRepository {
  private ormRepository: Repository<Participant>;

  constructor() {
    this.ormRepository = getRepository(Participant);
  }

  public async findByID(id: string): Promise<Participant | undefined> {
    return this.ormRepository.findOne(id);
  }

  public create(data: ICreateParticipantDTO): Participant {
    return this.ormRepository.create(data);
  }

  public async save(participant: Participant): Promise<Participant> {
    return this.ormRepository.save(participant);
  }
}

export default ParticipantsRepository;
