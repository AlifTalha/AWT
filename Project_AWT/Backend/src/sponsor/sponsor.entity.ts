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


@Entity('register') 
export class RegisterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullname: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 15 })
  phonenumber: string;

  @Column({ length: 10 })
  gender: string;

  @Column()
  password: string;

  @OneToMany(() => EventEntity, (event) => event.sponsor)
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

