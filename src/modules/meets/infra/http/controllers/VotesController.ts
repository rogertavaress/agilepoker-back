import CreateVotesService from '@modules/meets/services/CreateVotesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class VotesController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { number, participant_id, history_id, meet_id } = req.body;

    const createVotes = container.resolve(CreateVotesService);

    const meet = await createVotes.execute({
      number,
      participant_id,
      history_id,
      meet_id,
    });

    return res.status(200).json(meet);
  }
}
