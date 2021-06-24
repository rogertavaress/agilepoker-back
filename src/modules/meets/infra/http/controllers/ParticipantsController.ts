import JoinUserService from '@modules/meets/services/JoinMeetService';
import UpdateLocationService from '@modules/meets/services/UpdateLocationService';
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

  public async updateLocation(req: Request, res: Response): Promise<Response> {
    const { participant_id, altitude, latitude, longitude } = req.body;

    const update = container.resolve(UpdateLocationService);

    const participant = await update.execute({
      participant_id,
      altitude,
      latitude,
      longitude,
    });

    return res.status(200).json(participant);
  }
}
