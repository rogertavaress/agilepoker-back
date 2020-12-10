import CreateUserService from '@modules/meets/services/CreateMeetService';
import JoinUserService from '@modules/meets/services/JoinMeetService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class MeetsController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createdUser = container.resolve(CreateUserService);

    const meet = await createdUser.execute({
      name,
      email,
    });

    return res.status(200).json(meet);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id, name } = req.body;

    const joinUser = container.resolve(JoinUserService);

    const meet = await joinUser.execute({
      id,
      name,
    });

    return res.status(200).json(meet);
  }
}
