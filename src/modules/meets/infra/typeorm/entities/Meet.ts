import MeetStatusEnum from '@modules/meets/enums/MeetStatusEnum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import History from './History';
import Participant from './Participant';

@Entity('meets')
class Meet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: MeetStatusEnum,
    default: MeetStatusEnum.STARTED,
  })
  status: MeetStatusEnum;

  @OneToMany(() => History, history => history.meet)
  histories: History[];

  @OneToMany(() => Participant, participant => participant.meet)
  participants: Participant[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Meet;
