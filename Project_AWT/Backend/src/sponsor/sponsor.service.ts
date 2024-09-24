import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CoorDto, SponsorDto, loginDto } from "./sponsor.dto";
import { CoorEntity, SponsorEntity, SponsorUpdateDto } from "./sponsor.entity";
import { CreateSponsorDto } from "./sponsor.dto";
import { Repository, } from "typeorm";
import { InjectRepository, } from "@nestjs/typeorm";
import { EventEntity } from "src/event/event.entity";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "src/auth/dto/login.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class SponsorService {
    getAllDetails(): Promise<SponsorEntity[]> {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectRepository(SponsorEntity) private sponsorRepo: Repository<SponsorEntity>,
        @InjectRepository(CoorEntity) private coorRepo: Repository<CoorEntity>,
        @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>,
        private readonly jwtService: JwtService,
    ) {}
    

    getSponsor(): object {
        return { message: 'Sponsor Profile' };
    }

    getSponsorById(id: number): Promise<SponsorEntity> {
        return this.sponsorRepo.findOneBy({ sponsorid: id });
    }

    getSponsorByUsername(username: string): Promise<SponsorEntity> {
        return this.sponsorRepo.findOneBy({ username: username });
    }

    getSponsorByIdAndName(id: number, name: string): object {
        return { message: 'Id :' + id + " Sponsor name :" + name };
    }

    getSponsorByIdAndNameQuery(id: number, name: string): object {
        return { message: 'Id :' + id + ' Sponsor name :' + name };
    }

    getSponsorAll(id: number, name: string): object {
        return { message: 'Id :' + id + ' Sponsor name :' + name };
    }


    async deleteSponsorById(id: number): Promise<{ message: string }> {
        
        const sponsor = await this.sponsorRepo.findOneBy({ sponsorid: id });

        if (!sponsor) {
            throw new HttpException('Sponsor not found', HttpStatus.NOT_FOUND);
        }

        
        await this.sponsorRepo.delete({ sponsorid: id });
        return { message: `Sponsor with ID: ${id} has been deleted.` };
    }


    async addSponsor(myobj: CreateSponsorDto): Promise<SponsorEntity> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(myobj.password, salt);
        myobj.password = hashedPassword;
    
  
        const sponsor = this.sponsorRepo.create(myobj); 
        return this.sponsorRepo.save(sponsor); 
    }
    

    // getAllSponsors(): Promise<SponsorEntity[]> {
    //     return this.sponsorRepo.find();
    // }

    async updateSponsor(myobj: SponsorUpdateDto, id: number): Promise<object> {
        
        const sponsor = await this.sponsorRepo.findOne({ where: { sponsorid: id } });
        if (!sponsor) {
            throw new HttpException('Sponsor not found', HttpStatus.NOT_FOUND);
        }
    
        
        if (myobj.fullname) {
            sponsor.fullname = myobj.fullname; 
        }
        if (myobj.username) {
            sponsor.username = myobj.username; 
        }
        if (myobj.password) {
            
            sponsor.password = await bcrypt.hash(myobj.password, 10);
        }
    
      
        await this.sponsorRepo.save(sponsor);
    
        return { message: 'Sponsor updated successfully', sponsor };
    }


    


    async getEventById(id: number): Promise<EventEntity> {
        const event = await this.eventRepo.findOne({
          where: { id: id },
          relations: ['sponsor'], 
        });
      
        if (!event) {
          throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        }
      
        return event;
      }
      

    
    

    getCoorAll(id: number, name: string): object {
        return { message: 'Id :' + id + ' Coordinator name :' + name };
    }

    addCoor(myobj: CoorDto): Promise<CoorEntity> {
        return this.coorRepo.save(myobj);
    }

    async addEvent(sponsorId, event: EventEntity): Promise<EventEntity> {
        event.sponsor = sponsorId;
        console.log(event.sponsor);
        return this.eventRepo.save(event);
    }

    getSponsorWithEvents(): Promise<SponsorEntity[]> {
        return this.sponsorRepo.find({ relations: ["events"] });
    }

    getSponsorWithEventsById(sponsorId: number): Promise<SponsorEntity[]> {
        return this.sponsorRepo.find({ relations: ["events"], where: { sponsorid: sponsorId } });
    }

    getAllEvents(): Promise<EventEntity[]> {
        return this.eventRepo.find();
    }
    
    getAllEventsWithSponsor(): Promise<EventEntity[]> {
        return this.eventRepo.find({ relations: ["sponsor"] });
    }

    getAllEventsWithSponsorId(): Promise<EventEntity[]> {
        return this.eventRepo.find({
            relations: ["sponsor"],
            select: {
                sponsor: {
                    sponsorid: true,
                }
            }
        });
    }

    getAllSponsors(): Promise<SponsorEntity[]> {
        return this.sponsorRepo.find();
      }
      


    
    async login(myobj: LoginDto): Promise<{ accessToken: string; user: { id: number; name: string; username: string } } | null> {
        const user = await this.sponsorRepo.findOneBy({ username: myobj.username });
    
        if (user) {
            const isMatch = await bcrypt.compare(myobj.password, user.password);
    
            if (isMatch) {
                const payload = { username: user.username, sub: user.sponsorid };
                const token = this.jwtService.sign(payload);
                return {
                    accessToken: token,
                    user: {
                        id: user.sponsorid,
                        name: user.fullname,
                        username: user.username,
                    },
                }; 
            }
        }
    
        return null; 
    }
    
    
    }

