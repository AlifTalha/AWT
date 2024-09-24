import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SponsorEntity } from '../sponsor/sponsor.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SponsorEntity)
    private sponsorRepository: Repository<SponsorEntity>,
  ) {}

  async validateUser(username: string, password: string): Promise<SponsorEntity> {
    const sponsor = await this.sponsorRepository.findOne({ where: { username } });
    if (sponsor && sponsor.password === password) {
      // Passwords match
      return sponsor;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const sponsor = await this.validateUser(username, password);

    if (sponsor) {
      return sponsor;
    }
    return null;
  }
}
