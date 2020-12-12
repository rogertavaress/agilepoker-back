import CreateUserService from '@modules/meets/services/CreateMeetService';
import UpdateMeetStatusService from '@modules/meets/services/UpdateMeetStatusService';
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

  public async updateStatus(req: Request, res: Response): Promise<Response> {
    const { idMeet, statusMeet } = req.body;

    const updateMeetStatus = container.resolve(UpdateMeetStatusService);

    const meet = await updateMeetStatus.execute({
      idMeet,
      statusMeet,
    });
    return res.status(200).json(meet);
  }
}
