import CreateHistoryService from '@modules/meets/services/CreateHistoryService';
import RemoveHistoryService from '@modules/meets/services/RemoveHistoryService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class HistoryController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { name, category, meet_id } = req.body;

    const createHistory = container.resolve(CreateHistoryService);

    const meet = await createHistory.execute({
      name,
      category,
      meet_id,
    });

    return res.status(200).json(meet);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    const createHistory = container.resolve(RemoveHistoryService);

    const history = await createHistory.execute({
      id,
    });

    return res.status(200).json(history);
  }
}
