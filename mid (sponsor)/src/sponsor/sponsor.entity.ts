import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sponsor_table')
export class Sponsor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 150 })
  fullName: string;

  @Column()
  password: string;

  @Column({ nullable: true }) // Allow the image field to be nullable
  image: string;
}
