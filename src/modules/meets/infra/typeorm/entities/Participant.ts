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
  meet_id: string;

  @Column({ nullable: true })
  longitude: number;

  @Column({ nullable: true })
  latitude: number;

  @ManyToOne(() => Meet)
  @JoinColumn({ name: 'meet_id' })
  meet: Meet;

  @OneToMany(() => Vote, vote => vote.participant)
  votes: Vote[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

export default Participant;
