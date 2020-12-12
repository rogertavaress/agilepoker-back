import CreateUserService from '@modules/meets/services/CreateMeetService';
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
}
