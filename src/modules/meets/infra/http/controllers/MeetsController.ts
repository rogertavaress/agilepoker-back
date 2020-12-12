import ChangeHistoryNowService from '@modules/meets/services/ChangeHistoryNowService';
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

  public async updateHistoryNow(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { idMeet, idHistoryNow } = req.body;

    const changeHistoryNow = container.resolve(ChangeHistoryNowService);

    const meet = await changeHistoryNow.execute({
      idMeet,
      idHistory: idHistoryNow,
    });

    return res.status(200).json(meet);
  }
}
