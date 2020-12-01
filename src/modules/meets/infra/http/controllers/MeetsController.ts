import { Request, Response } from 'express';

export default class MeetsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    // const createdUser = container.resolve(CreateUserService);

    // const user = await createdUser.execute({
    //   name,
    //   email,
    //   password,
    // });

    return res.json();
  }
}
