import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { authUserDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { createUserDto } from './dto/create-user.dto';
import *as bcrypt from "bcrypt";
import { JwtPayload } from './payload.interface';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    async signUp(createUserDto: createUserDto): Promise<User> {
        return this.userRepository.createUser(createUserDto);
    }

    async loginUser(authUserDto: authUserDto): Promise<{ accessToken: string}> {
        const { name, password } = authUserDto;

        const login = await this.userRepository.findOneBy({ name: name });

        if(login && (await bcrypt.compare(password, login.password))) {
            const payload: JwtPayload = { name };
            const accessToken: string = this.jwtService.sign(payload); //create the token
            return { accessToken };
        } else {
            throw new UnauthorizedException("Please check your login credentials")
        }
    }

    async getAllUsers(): Promise<User[]>{
        return await this.userRepository.find();
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({
            id: id
        });
        if(!user){
            throw new NotFoundException(`user with ID ${id} not found`);
        }
        return user;
    }

    async updateAuthById(id: number, updateAuthDto: updateUserDto): Promise<{status: string, user?: User}> {
        const user = await this.userRepository.findOneBy({id:id});

        if(!user) {
            throw new NotFoundException(`User with this ID ${id} not found.`)
        }

        Object.assign(user, updateUserDto);
        const updateduser = await this.userRepository.save(user);
        if(updateduser) {
            return {status: "User updated", user: user};
        } else {
            return {status: "User was not updated"};
        }
    }

    async deleteUser(id: number): Promise<{status: string, user?: User}> {
        const user = await this.userRepository.findOneBy({id:id});

        if(!user) {
            throw new NotFoundException(`User with this ID ${id} not found.`)
        }

        const deleted = await this.userRepository.delete(id);
        if(deleted){
            return {status: "User deleted succcessfully", user: user} 
        } else {
            return {status: "User not deleted"}
        }
    }
}
