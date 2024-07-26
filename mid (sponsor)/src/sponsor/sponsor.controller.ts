import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SponsorService } from './sponsor.service';
import { Sponsor } from './sponsor.entity';
import { CreateSponsorDto } from './sponsor.dto';
import { UpdateSponsorDto } from './update-sponsor.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('sponsor')
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService) {}

  @Post('add')
  async createSponsor(@Body() createSponsorDto: CreateSponsorDto): Promise<Sponsor> {
    return this.sponsorService.createSponsor(createSponsorDto);
  }

  @Post('upload-image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${Date.now()}${ext}`);
        },
      }),
    }),
  )
  async uploadImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Sponsor> {
    const imagePath = file.path;
    return this.sponsorService.updateSponsorImage(id, imagePath);
  }

  @Get('search')
  async getSponsorByFullNameSubstring(
    @Query('substring') substring: string,
  ): Promise<Sponsor[]> {
    return this.sponsorService.getSponsorByFullNameSubstring(substring);
  }

  @Get(':username')
  async getSponsorByUsername(@Param('username') username: string): Promise<Sponsor> {
    return this.sponsorService.getSponsorByUsername(username);
  }

  @Delete(':username')
  async removeSponsorByUsername(@Param('username') username: string): Promise<void> {
    return this.sponsorService.removeSponsorByUsername(username);
  }

  @Get()
  async getAllSponsors(): Promise<Sponsor[]> {
    return this.sponsorService.getAllSponsors();
  }

  @Put('update/:id')
  async updateSponsor(
    @Param('id') id: number,
    @Body() updateSponsorDto: UpdateSponsorDto,
  ): Promise<Sponsor> {
    return this.sponsorService.updateSponsor(id, updateSponsorDto);
  }
}



















// import { Controller, Post, Body, Get, Query, Delete, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { SponsorService } from './sponsor.service';
// import { Sponsor } from './sponsor.entity';
// import { CreateSponsorDto } from './sponsor.dto';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

// @Controller('sponsor')
// export class SponsorController {
//   constructor(private readonly sponsorService: SponsorService) {}

//   @Post('add')
//   async createSponsor(@Body() createSponsorDto: CreateSponsorDto): Promise<Sponsor> {
//     return this.sponsorService.createSponsor(createSponsorDto);
//   }

//   @Post('upload-image/:id')
//   @UseInterceptors(FileInterceptor('image', {
//     storage: diskStorage({
//       destination: './uploads',
//       filename: (req, file, cb) => {
//         const ext = extname(file.originalname);
//         cb(null, `${file.fieldname}-${Date.now()}${ext}`);
//       },
//     }),
//   }))
//   async uploadImage(@Param('id') id: number, @UploadedFile() file: Express.Multer.File): Promise<Sponsor> {
//     const imagePath = file.path;
//     return this.sponsorService.updateSponsorImage(id, imagePath);
//   }
//   @Get('search')
//   async getSponsorByFullNameSubstring(@Query('substring') substring: string): Promise<Sponsor[]> {
//     return this.sponsorService.getSponsorByFullNameSubstring(substring);
//   }

//   @Get(':username')
//   async getSponsorByUsername(@Param('username') username: string): Promise<Sponsor> {
//     return this.sponsorService.getSponsorByUsername(username);
//   }

//   @Delete(':username')
//   async removeSponsorByUsername(@Param('username') username: string): Promise<void> {
//     return this.sponsorService.removeSponsorByUsername(username);
//   }

//   @Get()
//   async getAllSponsors(): Promise<Sponsor[]> {
//     return this.sponsorService.getAllSponsors();
//   }
// }
