import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CoorEntity, SponsorEntity } from '../sponsor/sponsor.entity';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => SponsorEntity, sponsor => sponsor.events)
  sponsor: SponsorEntity;
}
