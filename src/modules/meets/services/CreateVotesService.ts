import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMeetsRepository from '../repositories/IMeetsRepository';
import IVotesRepository from '../repositories/IVotesRepository';

interface IRequest {
    number: number;
    participantId: string;
    historyId: string;
    meetId: string;
}
@injectable()
class CreateVotesService {
    constructor(
        @inject('MeetsRepository')
        private meetsRepository: IMeetsRepository,

        @inject('VotesRepository')
        private votesRepository: IVotesRepository,
    ) { }

    public async execute({ number, participantId, historyId, meetId }: IRequest): Promise<any> {
        const vote = this.votesRepository.create({
            number, participantId, historyId, meetId
        });
        const meet = await this.meetsRepository.findByID(meetId);

        if (!meet) {
            throw new AppError('Reunião não encontrada');
        }

        await this.votesRepository.save(vote);

        return meet;
    }
}

export default CreateVotesService;
