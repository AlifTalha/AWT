import { IsOptional, IsString } from 'class-validator';
import { EventEntity } from 'src/event/event.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';



  

//   @OneToMany(() => EventEntity, event => event.sponsor, { cascade: true })
//   events: EventEntity[];
// }
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

export class CreateSponsorDto {
  @IsString()
  fullname: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}



export class SponsorUpdateDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;
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
