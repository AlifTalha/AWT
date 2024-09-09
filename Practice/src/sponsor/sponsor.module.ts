import { Module } from "@nestjs/common";
import { SponsorController } from "./sponsor.controller";
import { SponsorService } from "./sponsor.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoorEntity, SponsorEntity } from "./sponsor.entity";
import { EventEntity } from "src/event/event.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SponsorEntity, CoorEntity, EventEntity])],
    exports: [SponsorService],
    controllers: [SponsorController],
    providers: [SponsorService],
})
export class SponsorModule {
}
