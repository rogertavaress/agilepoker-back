import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { validate } from 'uuid';
import Meet from '../infra/typeorm/entities/Meet';
import IMeetsRepository from '../repositories/IMeetsRepository';

interface IRequest {
  id: string;
}

@injectable()
class GetMeetByIdService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Meet> {
    let meet =
      (await this.cacheProvider.recover<Meet>(`meets:${id}`)) ?? undefined;

    if (meet) {
      return meet;
    }

    if (!validate(id)) {
      throw new AppError('Identificador inválido');
    }

    meet = await this.meetsRepository.findByID(id);

    if (!meet) {
      throw new AppError('Reunião não encontrada');
    }

    return meet;
  }
}

export default GetMeetByIdService;
