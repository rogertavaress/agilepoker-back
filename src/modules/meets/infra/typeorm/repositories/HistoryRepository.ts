import ICreateHistoryDTO from '@modules/meets/dtos/ICreateHistoryDTO';
import IHistoryRepository from '@modules/meets/repositories/IHistoryRepository';
import { getRepository, Repository } from 'typeorm';
import History from '../entities/History';

class HistoryRepository implements IHistoryRepository {
  private ormRepository: Repository<History>;

  constructor() {
    this.ormRepository = getRepository(History);
  }

  public async findByID(id: number): Promise<History | undefined> {
    return this.ormRepository.findOne(id);
  }

  public create(data: ICreateHistoryDTO): History {
    return this.ormRepository.create(data);
  }

  public async save(meet: History): Promise<History> {
    return this.ormRepository.save(meet);
  }

  public async destroy(meet: History): Promise<History> {
    return this.ormRepository.remove(meet);
  }
}

export default HistoryRepository;
