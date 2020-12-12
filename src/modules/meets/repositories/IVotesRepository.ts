import ICreateVoteDTO from '../dtos/ICreateVoteDTO';
import Vote from '../infra/typeorm/entities/Vote';

export default interface IVotesRepository {
  create(data: ICreateVoteDTO): Vote;
  save(meet: Vote): Promise<Vote>;
}
