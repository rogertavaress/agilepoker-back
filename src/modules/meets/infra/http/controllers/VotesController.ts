import CreateVotesService from '@modules/meets/services/CreateVotesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class VotesController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { number, participantId, historyId, meetId } = req.body;

    const createVotes = container.resolve(CreateVotesService);

    const meet = await createVotes.execute({
      number,
      participantId,
      historyId,
      meetId,
    });

    return res.status(200).json(meet);
  }
}
