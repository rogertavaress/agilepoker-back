import MeetStatusEnum from '@modules/meets/enums/MeetStatusEnum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
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
    default: MeetStatusEnum.AWAITING_SIGN,
  })
  status: MeetStatusEnum;

  @Column({ nullable: true })
  history_now_id: string;

  @ManyToOne(() => History)
  @JoinColumn({ name: 'history_now_id' })
  history_now?: History;

  @OneToMany(() => History, history => history.meet)
  histories: History[];

  @OneToMany(() => Participant, participant => participant.meet)
  participants: Participant[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

export default Meet;
