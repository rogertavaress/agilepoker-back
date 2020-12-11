import ICreateParticipantDTO from '../dtos/ICreateParticipantDTO';
import Participant from '../infra/typeorm/entities/Participant';

export default interface IParticipantsRepository {
  findByID(id: string): Promise<Participant | undefined>;
  create(data: ICreateParticipantDTO): Participant;
  save(participant: Participant): Promise<Participant>;
}
