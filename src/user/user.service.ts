import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { authUserDto } from './dto/auth-credentials.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/payload.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    async getAllUsers(): Promise<User[]>{
        return await this.userRepository.find();
    }

    async createUser(createUserDto: createUserDto): Promise<User>{
        const { name, password, country, born, gender } = createUserDto

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            name,
            password: hash,
            country,
            born,
            gender
        });

        await this.userRepository.save(user); //interaction with db happens here
        return user;
    }

    async loginUser(authUserDto: authUserDto): Promise<{ accessToken: string}> {
        const { name, password } = authUserDto;

        const login = await this.userRepository.findOneBy({ name: name });

        if(login && (await bcrypt.compare(password, login.password))) {
            const payload: JwtPayload = { name };
            const accessToken: string = this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException("Please check your login credentials")
        }
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({
            id: id
        });
        if(!user){
            throw new NotFoundException(`Song with ID ${id} not found`);
        }
        return user;
    }

    async updateUserById(id: number, updateUserDto: updateUserDto): Promise<{status: string, user?: User}> {
        const user = await this.userRepository.findOneBy({id:id});

        if(!user) {
            throw new NotFoundException(`User with this ID ${id} not found.`)
        }

        Object.assign(user, updateUserDto);
        const updatedUser = await this.userRepository.save(user);
        if(updatedUser) {
            return {status: "User updated", user: user};
        } else {
            return {status: "Song was not updated"};
        }
    }

    async deleteUser(id: number): Promise<{status: string, user?: User}> {
        const user = await this.userRepository.findOneBy({id:id});

        if(!user) {
            throw new NotFoundException(`Song with this ID ${id} not found.`)
        }

        const deleted = await this.userRepository.delete(id);
        if(deleted){
            return {status: "User deleted succcessfully", user: user} 
        } else {
            return {status: "User not deleted"}
        }
    }
}
