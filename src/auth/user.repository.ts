import { DataSource, EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { createUserDto } from "./dto/create-user.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager())
    }

    async createUser(createUserDto: createUserDto): Promise<User>{
        const { name, password, country, born, gender } = createUserDto

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const user = this.create({
            name,
            password: hash,
            country,
            born,
            gender
        });

        await this.save(user); //interaction with db happens here
        return user;
    }
}