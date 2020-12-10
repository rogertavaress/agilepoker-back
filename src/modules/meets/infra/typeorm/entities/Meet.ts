import MeetStatusEnum from '@modules/meets/enums/MeetStatusEnum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import History from './History';
import Participant from './Participant';

@Entity('meets')
class Meet {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  historyId: string;

  @ManyToOne(() => History)
  @JoinColumn({ name: 'historyId' })
  history: History;

  @Column()
  participantId: string;

  @ManyToOne(() => Participant)
  @JoinColumn({ name: 'participantId' })
  participant: Participant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Meet;