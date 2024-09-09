import { EventEntity } from 'src/event/event.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sponsorentity')
export class SponsorEntity {
  @PrimaryGeneratedColumn()
  sponsorid: number;

  @Column()
  fullname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => EventEntity, event => event.sponsor, { cascade: true })
  events: EventEntity[];
}

@Entity('coorentity')
export class CoorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  date: Date;

  @Column()
  socialMediaLink: string;

  // @OneToMany(() => EventEntity, event => event.coor, { cascade: true })
  // events: EventEntity[];
}
