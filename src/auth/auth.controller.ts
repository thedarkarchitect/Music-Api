import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { authUserDto } from './dto/auth-credentials.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body() createUserDto: createUserDto): Promise<User> {
        return this.authService.signUp(createUserDto);
    }

    @Post('/login')
    loginUser(
        @Body() authUserDto: authUserDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.loginUser(authUserDto);
    }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.authService.getAllUsers();
    }

    @Get(":id")
    getUserById(@Param("id") id: string): Promise<User> {
        return this.authService.getUserById(Number(id));
    }

    @Patch(":id")
    updateAuthById(@Param("id") id: string, @Body() updateUserDto: updateUserDto): Promise<{status: string, user?: User }> {
        return this.authService.updateAuthById(Number(id), updateUserDto);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<{status: string, user?: User }> {
        return this.authService.deleteUser(Number(id));
    }
}
