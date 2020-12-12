import { inject, injectable } from 'tsyringe';
import Meet from '../infra/typeorm/entities/Meet';
import IMeetsRepository from '../repositories/IMeetsRepository';

interface IRequest {
  name: string;
  email: string;
}
@injectable()
class CreateMeetService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Meet> {
    const meet = this.meetsRepository.create({
      name,
      email,
    });

    await this.meetsRepository.save(meet);

    return meet;
  }
}

export default CreateMeetService;
