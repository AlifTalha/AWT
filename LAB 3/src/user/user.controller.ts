import { Controller, Post, Get, Delete, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, GetUsersByFullNameSubstringDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { username, fullName, isActive } = createUserDto;
    return this.userService.createUser(username, fullName, isActive);
  }

//   @Get('search')
//   async getUsersByFullNameSubstring(@Body() getUsersByFullNameSubstringDto: GetUsersByFullNameSubstringDto): Promise<User[]> {
//     const { substring } = getUsersByFullNameSubstringDto;
//     return this.userService.getUsersByFullNameSubstring(substring);
//   }
@Get('user/search')
async getUsersByFullNameSubstring(@Query('substring') substring: string): Promise<User[]> {
  return this.userService.getUsersByFullNameSubstring(substring);
}

  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<User | undefined> {
    return this.userService.getUserByUsername(username);
  }

  @Delete(':username')
  async removeUserByUsername(@Param('username') username: string): Promise<void> {
    await this.userService.removeUserByUsername(username);
  }
}
