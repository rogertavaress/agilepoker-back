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

@Entity('votes')
class Vote {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  number: number;

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

export default Vote;
