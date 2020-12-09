import ICreateMeetDTO from '@modules/meets/dtos/ICreateMeetDTO';
import IFindMeetDTO from '@modules/meets/dtos/IFindMeetDTO';
import Meet from '@modules/meets/infra/typeorm/entities/Meet';
import { uuid } from 'uuidv4';
import IMeetsRepository from '../IMeetsRepository';

class FakeMeetsRepository implements IMeetsRepository {
  private meets: Meet[] = [];

  public async findByID(id: string): Promise<Meet | undefined> {
    const findMeet = this.meets.find(meet => meet.idMeet === id);

    return findMeet;
  }

  public async find(data: IFindMeetDTO): Promise<Meet[]> {
    const findMeet =
      this.meets.filter(
        meet =>
          meet.idMeet === data.idMeet ||
          meet.name === data.name ||
          meet.email === data.email,
      ) ?? [];

    return findMeet;
  }

  public create(data: ICreateMeetDTO): Meet {
    const meet = new Meet();

    Object.assign(meet, { id: uuid() }, data);

    this.meets.push(meet);

    return meet;
  }

  public async save(meet: Meet): Promise<Meet> {
    const findIndex = this.meets.findIndex(findMeet => findMeet.idMeet === meet.idMeet);

    this.meets[findIndex] = meet;

    return meet;
  }
}

export default FakeMeetsRepository;
