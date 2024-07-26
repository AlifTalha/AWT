import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sponsor } from './sponsor.entity';
import { UpdateSponsorDto } from './update-sponsor.dto';

@Injectable()
export class SponsorService {
  constructor(
    @InjectRepository(Sponsor)
    private readonly sponsorRepository: Repository<Sponsor>,
  ) {}

  async createSponsor(sponsor: Partial<Sponsor>): Promise<Sponsor> {
    const newSponsor = this.sponsorRepository.create(sponsor);
    return this.sponsorRepository.save(newSponsor);
  }

  async updateSponsorImage(id: number, imagePath: string): Promise<Sponsor> {
    const sponsor = await this.sponsorRepository.findOne({ where: { id } });
    sponsor.image = imagePath;
    return this.sponsorRepository.save(sponsor);
  }

  async getSponsorByFullNameSubstring(substring: string): Promise<Sponsor[]> {
    return this.sponsorRepository
      .createQueryBuilder('sponsor')
      .where('sponsor.fullName LIKE :substring', { substring: `%${substring}%` })
      .getMany();
  }

  async getSponsorByUsername(username: string): Promise<Sponsor> {
    return this.sponsorRepository.findOne({ where: { username } });
  }

  async removeSponsorByUsername(username: string): Promise<void> {
    await this.sponsorRepository.delete({ username });
  }

  async getAllSponsors(): Promise<Sponsor[]> {
    return this.sponsorRepository.find();
  }

  async updateSponsor(id: number, updateSponsorDto: UpdateSponsorDto): Promise<Sponsor> {
    const sponsor = await this.sponsorRepository.findOne({ where: { id } });
    if (updateSponsorDto.fullName) sponsor.fullName = updateSponsorDto.fullName;
    if (updateSponsorDto.password) sponsor.password = updateSponsorDto.password;
    if (updateSponsorDto.image) sponsor.image = updateSponsorDto.image;
    return this.sponsorRepository.save(sponsor);
  }
}




























// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Sponsor } from './sponsor.entity';

// @Injectable()
// export class SponsorService {
//   constructor(
//     @InjectRepository(Sponsor)
//     private readonly sponsorRepository: Repository<Sponsor>,
//   ) {}

//   async createSponsor(sponsor: Partial<Sponsor>): Promise<Sponsor> {
//     const newSponsor = this.sponsorRepository.create(sponsor);
//     return this.sponsorRepository.save(newSponsor);
//   }

//   async updateSponsorImage(id: number, imagePath: string): Promise<Sponsor> {
//     const sponsor = await this.sponsorRepository.findOne({ where: { id } });
//     sponsor.image = imagePath;
//     return this.sponsorRepository.save(sponsor);
//   }

//   async getSponsorByFullNameSubstring(substring: string): Promise<Sponsor[]> {
//     return this.sponsorRepository
//       .createQueryBuilder('sponsor')
//       .where('sponsor.fullName LIKE :substring', { substring: `%${substring}%` })
//       .getMany();
//   }

//   async getSponsorByUsername(username: string): Promise<Sponsor> {
//     return this.sponsorRepository.findOne({ where: { username } });
//   }

//   async removeSponsorByUsername(username: string): Promise<void> {
//     await this.sponsorRepository.delete({ username });
//   }

//   async getAllSponsors(): Promise<Sponsor[]> {
//     return this.sponsorRepository.find();
//   }
// }
