import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHistoryRepository from '../repositories/IHistoryRepository';
import History from '../infra/typeorm/entities/History';

interface IRequest {
    id?: string
}
@injectable()
class RemoveHistoryService {
    constructor(
        @inject('HistoryRepository')
        private historyRepository: IHistoryRepository,
    ) { }

    public async destroy({ id }: IRequest): Promise<History> {
        if (!id) {
            throw new AppError('Dados incorretos');
        }

        return this.historyRepository.destroy({
            id
        });
    }
}

export default RemoveHistoryService;
