import IFindMeetDTO from '../dtos/IFindMeetDTO';
import Meet from '../infra/typeorm/entities/Meet';

export default interface IMeetsRepository {
  findByID(id: string): Promise<Meet | undefined>;
  find(data: IFindMeetDTO): Promise<Meet[]>;
  create(data: Meet): Meet;
  save(meet: Meet): Promise<Meet>;
}
