import { Injectable } from "@nestjs/common";
import { CoorDto, SponsorDto, loginDto } from "./sponsor.dto";
import { CoorEntity, SponsorEntity } from "./sponsor.entity";
import { CreateSponsorDto } from "./sponsor.dto";
import { Repository, } from "typeorm";
import { InjectRepository, } from "@nestjs/typeorm";
import { EventEntity } from "src/event/event.entity";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "src/auth/dto/login.dto";


@Injectable()
export class SponsorService {
    getAllDetails(): Promise<SponsorEntity[]> {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectRepository(SponsorEntity) private sponsorRepo: Repository<SponsorEntity>,
        @InjectRepository(CoorEntity) private coorRepo: Repository<CoorEntity>,
        @InjectRepository(EventEntity) private eventRepo: Repository<EventEntity>,
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

    deleteSponsorById(id: number): object {
        return { message: 'Id :' + id + ' Deleted' };
    }

    async addSponsor(myobj: SponsorDto): Promise<SponsorEntity> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(myobj.password, salt);
        myobj.password = hashedPassword;
        return this.sponsorRepo.save(myobj);
    }

    getAllSponsors(): Promise<SponsorEntity[]> {
        return this.sponsorRepo.find();
    }

    updateSponsor(myobj: object, id: number): object {
        return { message: "update sponsor: " + id, body: myobj };
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

    // async login(myobj: loginDto): Promise<boolean> {
    //     const pass = await this.sponsorRepo.findOneBy({ username: myobj.username });
    //     if (pass) {
    //         const isMatch = await bcrypt.compare(myobj.password, pass.password);
    //         return isMatch;
    //     } else {
    //         return false;
    //     }
    // }
    async login(myobj: LoginDto): Promise<boolean> {
        const user = await this.sponsorRepo.findOneBy({ username: myobj.username });
        if (user) {
          const isMatch = await bcrypt.compare(myobj.password, user.password);
          return isMatch;
        }
        return false;
      }
    }

