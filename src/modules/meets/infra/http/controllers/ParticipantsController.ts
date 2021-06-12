import JoinUserService from '@modules/meets/services/JoinMeetService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ParticipantsController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { meet_id, name } = req.body;

    const joinUser = container.resolve(JoinUserService);

    const meet = await joinUser.execute({
      id: meet_id,
      name,
    });

    return res.status(200).json(meet);
  }
}
