import ICreateHistoryDTO from '../dtos/ICreateHistoryDTO';
import History from '../infra/typeorm/entities/History';

export default interface IHistoryRepository {
  findByID(id: string): Promise<History | undefined>;
  create(data: ICreateHistoryDTO): History;
  save(meet: History): Promise<History>;
  destroy(meet: History): Promise<History>;
}
