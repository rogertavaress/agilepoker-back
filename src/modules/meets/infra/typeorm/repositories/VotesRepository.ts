import ICreateVoteDTO from '@modules/meets/dtos/ICreateVoteDTO';
import IVotesRepository from '@modules/meets/repositories/IVotesRepository';
import { getRepository, Repository } from 'typeorm';
import Vote from '../entities/Vote';

class VotesRepository implements IVotesRepository {
  private ormRepository: Repository<Vote>;

  constructor() {
    this.ormRepository = getRepository(Vote);
  }

  public create(data: ICreateVoteDTO): Vote {
    return this.ormRepository.create(data);
  }

  public async save(meet: Vote): Promise<Vote> {
    return this.ormRepository.save(meet);
  }
}

export default VotesRepository;
