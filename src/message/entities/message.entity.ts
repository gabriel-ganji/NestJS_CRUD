import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  //Many messages can be send by only one person (sender)
  @ManyToOne(() => Messages)
  //Specifies the 'from' column of who sent the message
  @JoinColumn({ name: 'from' })
  from: string;

  //Many messages can be send by only one person (receiver)
  @ManyToOne(() => Messages)
  //Specifies the 'from' column of who received the message
  @JoinColumn({ name: 'to' })
  to: string;

  @Column({ default: false })
  read: boolean;

  @Column()
  date: Date; //created_at

  @CreateDateColumn()
  createdAt?: Date; //created_at

  @UpdateDateColumn()
  updatedAt?: Date; //updated _at
}
