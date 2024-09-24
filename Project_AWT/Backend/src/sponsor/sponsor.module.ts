
import { Module } from "@nestjs/common";
import { SponsorController } from "./sponsor.controller";
import { SponsorService } from "./sponsor.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoorEntity, SponsorEntity } from "./sponsor.entity";
import { EventEntity } from "src/event/event.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  
  imports: [
    TypeOrmModule.forFeature([SponsorEntity, CoorEntity, EventEntity]), 
    JwtModule.register({
      secret: 'your-secret-key',  
      signOptions: { expiresIn: '1h' },  
    }),
  ],
  exports: [SponsorService],
  controllers: [SponsorController],
  providers: [SponsorService],
})
export class SponsorModule {}
