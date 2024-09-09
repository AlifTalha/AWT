// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SponsorController } from './sponsor/sponsor.controller'; // Changed to SponsorController
import { SponsorModule } from './sponsor/sponsor.module'; // Changed to SponsorModule
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SponsorModule, // Changed to SponsorModule
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'updatetable', // Change to your database name
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController, SponsorController], // Added SponsorController
  providers: [AppService],
})
export class AppModule {}
