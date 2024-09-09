import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Session,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { SponsorService } from './sponsor.service';
  import { CoorDto, SponsorDto, SponsorUpdateDto, loginDto } from './sponsor.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { MulterError, diskStorage } from 'multer';
  import { CoorEntity, SponsorEntity } from './sponsor.entity';
  import { EventEntity } from 'src/event/event.entity';
  import * as session from 'express-session';
  import { SessionGuard } from './sponsor.guard';
  import { LoginDto } from 'src/auth/dto/login.dto';
  
  @Controller('sponsor')
  export class SponsorController {
  
    constructor(private readonly sponsorService: SponsorService) {}
  
    @Get('profile')
    getSponsor(): object {
      return this.sponsorService.getSponsor();
    }
  
    @Get('get/:id')
    @UseGuards(SessionGuard)
    getSponsorByIdp(@Param('id', ParseIntPipe) id: number, @Session() session): object {
      // console.log(typeof id);
      console.log(session.user);
      return this.sponsorService.getSponsorById(id);
    }
  
    @Get('getbyusername/:username')
    getSponsorByUsername(@Param('username') username: string): Promise<SponsorEntity> {
      return this.sponsorService.getSponsorByUsername(username);
    }
  
    @Get('get/id/:id/name/:name')
    getSponsorByIdAndNamep(@Param('id') id: number,@Param('name') name: string,): object {
      return this.sponsorService.getSponsorByIdAndName(id, name);
    }
  
    @Get('getdetail')
    getSponsorByIdAndNameq(
      @Query('id') id: number,
      @Query('name') name: string,
    ): object {
      return this.sponsorService.getSponsorByIdAndName(id, name);
    }
  
    @Post('getdetail')
    getSponsorAll(@Body() body: { id: number; name: string }): object {
      const { id, name } = body;
      return this.sponsorService.getSponsorAll(id, name);
    }
  
    @Delete('delete/:id')
    deleteSponsorById(@Param('id') id: number): object {
      return this.sponsorService.deleteSponsorById(id);
    }
  
    @Post('addsponsor')
    @UsePipes(new ValidationPipe()) // Apply the validation
    addSponsor(@Body() data: SponsorDto): Promise<SponsorEntity> {
      return this.sponsorService.addSponsor(data);
    }
  
    @Post('addcoor')
    @UsePipes(new ValidationPipe())
    addCoor(@Body() data: CoorDto): Promise<CoorEntity> {
      return this.sponsorService.addCoor(data);
    }
  
    @Post('getdetailc')
    getCoorAll(@Body() body: { id: number; name: string }): object {
      const { id, name } = body;
      return this.sponsorService.getCoorAll(id, name);
    }
  
    @Get('getsponsordetail')
    getAllDetail(): Promise<SponsorEntity[]> {
      // console.log(myobj);
      return this.sponsorService.getAllDetails();
    }
  
    @Put('updatesponsor/:id')
    updateSponsor(@Body() myobj: SponsorUpdateDto, @Param('id') id: number): object {
      return this.sponsorService.updateSponsor(myobj, id);
    }
  
    @Post('addimage')
    @UseInterceptors(
      FileInterceptor('myfile', {
        fileFilter: (req, file, cb) => {
          if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
            cb(null, true);
          } else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
          }
        },
        limits: { fileSize: 5000000 }, // 30 KB limit
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname)
          },
        }),
      }),
    )
    addImage(@Body() myobj: object, @UploadedFile() file: Express.Multer.File) {
      console.log(file);
      console.log(myobj);
      return myobj;
    }
  
    @Post('addevent/:sponsorid')
    addEvent(@Param('sponsorid') sponsorid : SponsorEntity, @Body() event : EventEntity) : Promise<EventEntity> {
      return this.sponsorService.addEvent(sponsorid, event);
    }
  
    @Get('getsponsorwithevent') 
    getSponsorWithEvent(): Promise<SponsorEntity[]> {
      return this.sponsorService.getSponsorWithEvents();
    }
  
    @Get('getsponsorwitheventbyid/:sponsorid') 
    getSponsorWithEventById(@Param('sponsorid') sponsorid : number): Promise<SponsorEntity[]> {
      return this.sponsorService.getSponsorWithEventsById(sponsorid);
    }
  
    @Get('geteventdetails')
    getAllEvent(): Promise<EventEntity[]> {
      return this.sponsorService.getAllEvents();
    }
  
    @Get('geteventdetailswithsponsor')
    getAllEventWithSponsor(): Promise<EventEntity[]> {
      return this.sponsorService.getAllEventsWithSponsor();
    }
  
    @Get('geteventdetailswithsponsorid')
    getAllEventWithSponsorId(): Promise<EventEntity[]> {
      return this.sponsorService.getAllEventsWithSponsorId();
    }
  
  //   @Post('login')
  //   async login(@Body() myobj: loginDto, @Session() session): Promise<any> {
  //     const res = await this.sponsorService.login(myobj);
  //     if (res === true) {
  //       session.user = myobj.username;
  //     }
  //     return this.sponsorService.login(myobj);
  //   }
  // }
  @Post('login')
  async login(@Body() myobj: LoginDto, @Session() session): Promise<any> {
    const isMatch = await this.sponsorService.login(myobj);
    if (isMatch) {
      session.user = myobj.username;
      return { message: 'Login successful' };
    } else {
      return { message: 'Invalid username or password' };
    }
  }
}
  