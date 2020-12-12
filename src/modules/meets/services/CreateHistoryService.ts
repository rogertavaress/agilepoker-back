import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHistoryRepository from '../repositories/IHistoryRepository';
import History from '../infra/typeorm/entities/History';

interface IRequest {
    name: string,
    category?: string,
    meetId: string
}
@injectable()
class CreateHistoryService {
    constructor(
        @inject('HistoryRepository')
        private historyRepository: IHistoryRepository,
    ) { }

    public async execute({ name, category, meetId }: IRequest): Promise<History> {
        if (!name || !category || !meetId) {
            throw new AppError('Dados incorretos');
        }

        const history = this.historyRepository.create({
            name, category, meetId
        });

        await this.historyRepository.save(history);

        return history;
    }
}

export default CreateHistoryService;
