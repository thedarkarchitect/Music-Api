import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import "dotenv/config";
import { JwtPayload } from "./payload.interface";
import { User } from "./user.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private configService: ConfigService
    ){
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()//this willl extract the token from the authorization header
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { name } = payload;
        const user: User = await this.userRepository.findOneBy({ name });

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}