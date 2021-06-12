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
  id: string;

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
  meet_id: string;

  @ManyToOne(() => Meet)
  @JoinColumn({ name: 'meet_id' })
  meet: Meet;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

export default History;
