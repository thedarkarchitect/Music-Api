import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository
    ){}

    async getAllUsers(): Promise<User[]>{
        return await this.userRepository.find();
    }

    async createSong(createUserDto: createUserDto): Promise<User>{
        const { username, email, password } = createUserDto

        const user = this.userRepository.create({ //this fill the fields in the db
            username,
            email,
            password
        });

        await this.userRepository.save(user); //interaction with db happens here
        return user;
    }

    async getSongById(id: number): Promise<User> {
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
