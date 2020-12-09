import { inject, injectable } from 'tsyringe';
import Meet from '../infra/typeorm/entities/Meet';
import IMeetsRepository from '../repositories/IMeetsRepository';
import { v4 as uuidv4 } from 'uuid';
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
  ) { }

  public async create({ name, email }: IRequest): Promise<Boolean> {
    const data = new Date();
    const meetObjeto = new Meet()

    meetObjeto.idMeet = uuidv4().toString();
    meetObjeto.name = name;
    meetObjeto.email = email ? email : '';
    meetObjeto.status = '';
    meetObjeto.created_at = new Date(data.toLocaleString());
    meetObjeto.updated_at = new Date(data.toLocaleString());

    const checkMeetsExists = await this.meetsRepository.create(meetObjeto);
    const insert = await this.meetsRepository.save(checkMeetsExists);

    return insert !== null;
  }

  public async joinMeet({ idMeet, name }: IRequest): Promise<Meet[]> {
    const meetObjeto = new Meet()

    const checkMeetsExists = await this.meetsRepository.find({ idMeet: idMeet });

    if (checkMeetsExists) {
      meetObjeto.idMeet = checkMeetsExists[0].idMeet;
      meetObjeto.name = name;
      meetObjeto.email = '';
      meetObjeto.status = '';
      const createdUser = await this.meetsRepository.create(meetObjeto);
      const insertedObject = await this.meetsRepository.save(createdUser);
      if (insertedObject) {
        createdUser.isCreated = true;
      } else {
        createdUser.isCreated = false;
      }
    }

    return checkMeetsExists;
  }
}

export default CreateUserService;
