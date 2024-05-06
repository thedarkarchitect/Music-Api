import { Controller, Get, Post, Delete, Patch, Param, Body } from '@nestjs/common';
import { User } from './user.entity';
import { SongService } from 'src/song/song.service';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Post()
    async createUser(@Body() createUserDto: createUserDto): Promise<User>{
        return this.userService.createSong(createUserDto)
    }

    @Get(":id")
    async getSongById(@Param("id") id: string): Promise<User> {
        return this.userService.getSongById(Number(id));
    }

    @Patch(":id")
    async updateUserById(@Param("id") id: string, @Body() updateUserDto: updateUserDto): Promise<{status: string, user?: User }> {
        return this.userService.updateUserById(Number(id), updateUserDto);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<{status: string, user?: User}> {
        return this.userService.deleteUser(Number(id));
    }
}
