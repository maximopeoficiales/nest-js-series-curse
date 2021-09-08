import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Config } from "src/config/config.key";
import { ConfigService } from "src/config/config.service";
import { AuthRepository } from "../auth.repository";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly _configService: ConfigService,
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository) {
        super({
            wtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: _configService.get(Config.JWT_SECRET),
        });
    }

    async validate(payload: IJwtPayload) {
        const { username } = payload;
        // se busca un usuario por username
        const user = await this._authRepository.findOne({ where: { username, status: true } })
        if (!user) {
            throw new UnauthorizedException();
        }
        return payload;
    }
}