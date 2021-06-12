import ICreateMeetDTO from '@modules/meets/dtos/ICreateMeetDTO';
import IFindMeetDTO from '@modules/meets/dtos/IFindMeetDTO';
import IMeetsRepository from '@modules/meets/repositories/IMeetsRepository';
import { getRepository, Repository } from 'typeorm';
import Meet from '../entities/Meet';

class MeetsRepository implements IMeetsRepository {
  private ormRepository: Repository<Meet>;

  constructor() {
    this.ormRepository = getRepository(Meet);
  }

  public async findByID(id: string): Promise<Meet | undefined> {
    return this.ormRepository.findOne(id, {
      relations: [
        'participants',
        'history_now',
        'history_now.votes',
        'history_now.votes.participant',
        'histories',
        'histories.votes',
        'histories.votes.participant',
      ],
    });
  }

  public async find(data: IFindMeetDTO): Promise<Meet[]> {
    return this.ormRepository.find({
      where: { ...data },
      relations: [
        'participants',
        'histories',
        'histories.votes',
        'histories.votes.participant',
      ],
    });
  }

  public create(data: ICreateMeetDTO): Meet {
    return this.ormRepository.create(data);
  }

  public async save(meet: Meet): Promise<Meet> {
    return this.ormRepository.save(meet);
  }
}

export default MeetsRepository;
