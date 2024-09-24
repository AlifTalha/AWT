
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SponsorController } from './sponsor/sponsor.controller';
import { SponsorModule } from './sponsor/sponsor.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SponsorModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'updatetable',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController, SponsorController],
  providers: [AppService],
})
export class AppModule {}
