import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Meet from './Meet';
import Vote from './Vote';

@Entity('participants')
class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  meetId: string;

  @ManyToOne(() => Meet)
  @JoinColumn({ name: 'meetId' })
  meet: Meet;

  @OneToMany(() => Vote, vote => vote.participant)
  votes: Vote[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Participant;
