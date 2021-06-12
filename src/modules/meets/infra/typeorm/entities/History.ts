import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Meet from './Meet';
import Vote from './Vote';

@Entity('histories')
class History {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ default: 0 })
  time: number;

  @Column({ default: '' })
  time_parsed: string;

  @OneToMany(() => Vote, vote => vote.history)
  votes: Vote[];

  @Column()
  meetId: string;

  @ManyToOne(() => Meet)
  @JoinColumn({ name: 'meetId' })
  meet: Meet;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

export default History;
