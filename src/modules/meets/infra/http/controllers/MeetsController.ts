import CreateUserService from '@modules/meets/services/CreateMeetService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class MeetsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createdUser = container.resolve(CreateUserService);

    const isCreated = await createdUser.create({
      name,
      email
    });

    return res.status(200).json({ isCreated: isCreated });
  }

  public async joinMeet(req: Request, res: Response): Promise<Response> {
    const { idMeet, name } = req.body;

    const createdUser = container.resolve(CreateUserService);

    const meet = await createdUser.joinMeet({
      idMeet, name
    });

    return res.status(200).json({ meetObject: meet });
  }
}
