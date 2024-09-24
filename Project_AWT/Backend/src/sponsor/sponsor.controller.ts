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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { CoorDto, CreateSponsorDto, SponsorDto, SponsorUpdateDto } from './sponsor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { CoorEntity, SponsorEntity } from './sponsor.entity';
import { EventEntity } from 'src/event/event.entity';
import { SessionGuard } from './sponsor.guard';
import { LoginDto } from 'src/auth/dto/login.dto';

@Controller('sponsor')
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService) {}

  @Get('profile')
  async getSponsor(): Promise<object> {
    try {
      return await this.sponsorService.getSponsor();
    } catch (error) {
      throw new HttpException(
        { message: 'Error fetching sponsor profile', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get/:id')
  @UseGuards(SessionGuard)
  async getSponsorByIdp(@Param('id', ParseIntPipe) id: number, @Session() session): Promise<object> {
    try {
      console.log(session.user);
      return await this.sponsorService.getSponsorById(id);
    } catch (error) {
      throw new HttpException(
        { message: 'Error fetching sponsor by ID', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('getbyusername/:username')
  async getSponsorByUsername(@Param('username') username: string): Promise<SponsorEntity> {
    try {
      return await this.sponsorService.getSponsorByUsername(username);
    } catch (error) {
      throw new HttpException(
        { message: 'Error fetching sponsor by username', error: error.message },
        HttpStatus.NOT_FOUND,
      );
    }
  }


@Put('updatesponsor/:id')
async updateSponsor(@Body() myobj: SponsorUpdateDto, @Param('id') id: number): Promise<object> {
  try {
    return await this.sponsorService.updateSponsor(myobj, id);
  } catch (error) {
    throw new HttpException(
      { message: 'Error updating sponsor', error: error.message },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

  




  @Post('addsponsor') 
  @UsePipes(new ValidationPipe()) 
  async addSponsor(@Body() data: CreateSponsorDto): Promise<SponsorEntity> {
    console.log('Incoming data:', data); 

    try {
      const sponsor = await this.sponsorService.addSponsor(data);
      console.log('Data after processing:', sponsor); 
      return sponsor;
    } catch (error) {
      console.error('Error in addSponsor:', error); 

      throw new HttpException(
        { message: 'Error adding sponsor', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('addcoor')
  @UsePipes(new ValidationPipe())
  async addCoor(@Body() data: CoorDto): Promise<CoorEntity> {
    try {
      return await this.sponsorService.addCoor(data);
    } catch (error) {
      throw new HttpException(
        { message: 'Error adding coordinator', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }



  @Delete('delete/:id')
  async deleteSponsorById(@Param('id', ParseIntPipe) id: number): Promise<object> {
    try {
      return await this.sponsorService.deleteSponsorById(id);
    } catch (error) {
      throw new HttpException(
        { message: 'Error deleting sponsor', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }



@Post('login')
async login(@Body() myobj: LoginDto, @Session() session): Promise<{ accessToken: string; user: { id: number; name: string; username: string } } | { message: string }> {
    try {
        const result = await this.sponsorService.login(myobj);

        if (result && result.accessToken) { 
            session.user = myobj.username; 
            return result; 
        } else {
            return { message: 'Invalid username or password' }; 
        }
    } catch (error) {
        throw new HttpException(
            { message: 'Error during login', error: error.message },
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
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
      limits: { fileSize: 5000000 }, 
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async addImage(@Body() myobj: object, @UploadedFile() file: Express.Multer.File): Promise<object> {
    try {
      console.log(file);
      console.log(myobj);
      return myobj;
    } catch (error) {
      throw new HttpException(
        { message: 'Error uploading image', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('addevent/:sponsorid')
  async addEvent(@Param('sponsorid') sponsorid: SponsorEntity, @Body() event: EventEntity): Promise<EventEntity> {
    try {
      return await this.sponsorService.addEvent(sponsorid, event);
    } catch (error) {
      throw new HttpException(
        { message: 'Error adding event', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


@Get('event/:id')
async getEventById(@Param('id', ParseIntPipe) id: number): Promise<EventEntity> {
  try {
    return await this.sponsorService.getEventById(id);
  } catch (error) {
    throw new HttpException(
      { message: 'Error fetching event details', error: error.message },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}


@Get('showAllSponsors')
async showAllSponsors(): Promise<SponsorEntity[]> {
  try {
    return await this.sponsorService.getAllSponsors();
  } catch (error) {
    throw new HttpException(
      { message: 'Error fetching all sponsors', error: error.message },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}



  @Get('geteventdetails')
  async getAllEvent(): Promise<EventEntity[]> {
    try {
      return await this.sponsorService.getAllEvents();
    } catch (error) {
      throw new HttpException(
        { message: 'Error fetching event details', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
