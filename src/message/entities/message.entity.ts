import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  text: string;
  @Column({ type: 'varchar', length: 50 })
  from: string;
  @Column({ type: 'varchar', length: 50 })
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
