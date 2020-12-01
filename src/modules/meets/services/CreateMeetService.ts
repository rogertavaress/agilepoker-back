import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import Meet from '../infra/typeorm/entities/Meet';
import IMeetsRepository from '../repositories/IMeetsRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Meet> {
    const checkMeetsExists = await this.meetsRepository.find({ email });

    if (checkMeetsExists.length > 0) {
      const meetsUpdated = checkMeetsExists.map(value => value.email === email);
    }

    return checkMeetsExists[0];
  }
}

export default CreateUserService;
