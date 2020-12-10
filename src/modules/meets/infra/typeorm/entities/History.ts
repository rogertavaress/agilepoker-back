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
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @OneToMany(() => Vote, vote => vote.history)
  votes: Vote[];

  @Column()
  meetId: string;

  @ManyToOne(() => Meet)
  @JoinColumn({ name: 'meetId' })
  meet: Meet;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default History;
