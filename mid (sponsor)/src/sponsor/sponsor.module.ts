import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';
import { Sponsor } from './sponsor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sponsor])],
  providers: [SponsorService],
  controllers: [SponsorController],
})
export class SponsorModule {}
