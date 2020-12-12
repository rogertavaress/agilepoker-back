import { inject, injectable } from 'tsyringe';
import Votes from '../infra/typeorm/entities/Vote';
import IVotesRepository from '../repositories/IVotesRepository';

interface IRequest {
    number: number;
    participantId: string;
    historyId: string;
}
@injectable()
class CreateVotesService {
    constructor(
        @inject('VotesRepository')
        private votesRepository: IVotesRepository,
    ) { }

    public async execute({ number, participantId, historyId }: IRequest): Promise<Votes> {
        const vote = this.votesRepository.create({
            number, participantId, historyId
        });

        await this.votesRepository.save(vote);

        return vote;
    }
}

export default CreateVotesService;
