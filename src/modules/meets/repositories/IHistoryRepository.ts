import ICreateHistoryDTO from '../dtos/ICreateHistoryDTO';
import History from '../infra/typeorm/entities/History';

export default interface IHistoryRepository {
  findByID(id: string): Promise<History | undefined>;
  create(data: ICreateHistoryDTO): History;
  save(history: History): Promise<History>;
  destroy(history: History): Promise<History>;
}
