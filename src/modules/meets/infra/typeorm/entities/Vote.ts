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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @Column()
  history_id: string;

  @ManyToOne(() => History)
  @JoinColumn({ name: 'history_id' })
  history: History;

  @Column()
  participant_id: string;

  @ManyToOne(() => Participant)
  @JoinColumn({ name: 'participant_id' })
  participant: Participant;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

export default Vote;
