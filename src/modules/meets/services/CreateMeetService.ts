import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Meet from '../infra/typeorm/entities/Meet';
import IMeetsRepository from '../repositories/IMeetsRepository';

interface IRequest {
  idMeet?: string;
  name: string;
  email?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Meet> {
    if (!name || !email) {
      throw new AppError('Dados incorretos');
    }

    const meet = this.meetsRepository.create({
      name,
      email,
    });

    await this.meetsRepository.save(meet);

    return meet;
  }
}

export default CreateUserService;