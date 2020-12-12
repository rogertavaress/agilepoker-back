import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MeetStatusEnum from '../enums/MeetStatusEnum';
import meetsRouter from '../infra/http/routes/meets.routes';
import Meet from '../infra/typeorm/entities/Meet';
import IMeetsRepository from '../repositories/IMeetsRepository';

interface IRequest {
  idMeet?: string;
  name?: string;
  email?: string;
  statusMeet?: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('MeetsRepository')
    private meetsRepository: IMeetsRepository,
  ) { }

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

  public async updateStatus({ idMeet, statusMeet }: IRequest): Promise<Meet> {
    if (!idMeet || !statusMeet) {
      throw new AppError('Dados incorretos');
    }
    var meet: Meet = new Meet();
    return this.meetsRepository.findByID(idMeet).then(async selectedMeet => {
      switch (statusMeet.toLowerCase()) {
        case 'started':
          selectedMeet!.status = MeetStatusEnum.STARTED;
          break;
        case 'pause':
          selectedMeet!.status = MeetStatusEnum.PAUSE;
          break;
        case 'finished':
          selectedMeet!.status = MeetStatusEnum.FINISHED;
          break;
        default:
          throw new AppError('Status não reconhecido');
      }
      meet = await this.meetsRepository.save(selectedMeet!);
      
      return meet;
    }).catch(() => {
      throw new AppError('Reunião não encontrada')
    });
  }
}

export default CreateUserService;
