import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/exampleModule/services/CreateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createdUser = container.resolve(CreateUserService);

    const user = await createdUser.execute({
      name,
      email,
      password,
    });

    return res.json(classToClass(user));
  }
}
