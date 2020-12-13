import ICreateVoteDTO from '@modules/meets/dtos/ICreateVoteDTO';
import IFindOneVoteDTO from '@modules/meets/dtos/IFindOneVoteDTO';
import IVotesRepository from '@modules/meets/repositories/IVotesRepository';
import { getRepository, Repository } from 'typeorm';
import Vote from '../entities/Vote';

class VotesRepository implements IVotesRepository {
  private ormRepository: Repository<Vote>;

  constructor() {
    this.ormRepository = getRepository(Vote);
  }

  public async findByID(id: string): Promise<Vote | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findOne(data: IFindOneVoteDTO): Promise<Vote | undefined> {
    return this.ormRepository.findOne({ ...data });
  }

  public create(data: ICreateVoteDTO): Vote {
    return this.ormRepository.create({ ...data });
  }

  public async save(meet: Vote): Promise<Vote> {
    return this.ormRepository.save(meet);
  }
}

export default VotesRepository;
