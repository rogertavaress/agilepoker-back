import ICreateVoteDTO from '../dtos/ICreateVoteDTO';
import IFindOneVoteDTO from '../dtos/IFindOneVoteDTO';
import Vote from '../infra/typeorm/entities/Vote';

export default interface IVotesRepository {
  findByID(id: string): Promise<Vote | undefined>;
  findOne(data: IFindOneVoteDTO): Promise<Vote | undefined>;
  create(data: ICreateVoteDTO): Vote;
  save(meet: Vote): Promise<Vote>;
}
