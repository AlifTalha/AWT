import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SponsorEntity } from '../sponsor/sponsor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SponsorEntity])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
