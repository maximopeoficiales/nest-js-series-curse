import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { RolType } from '../role/types/rol.types';
import { User } from '../user/entitys/user.entity';
import { AuthRepository } from './auth.repository';
import { SigninDto, SignupDto } from './dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ) { }

    // registra
    async signup(signupDto: SignupDto): Promise<void> {
        const { username, email } = signupDto;
        const userExists = await this._authRepository.findOne({ where: [{ username }, { email }] })

        if (userExists) {
            throw new ConflictException("username o email already exists");
        }
        return this._authRepository.signup(signupDto);
    }

    // login
    async signin(signinDto: SigninDto): Promise<{ token: string }> {
        const { username, password } = signinDto;
        const user: User = await this._authRepository.findOne({ where: { username } });

        if (!user) {
            throw new NotFoundException("User doest not exist");
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException("Invalid Credentials");
        }
        const payload: IJwtPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles.map(r => r.name as RolType)
        }

        const token = await this._jwtService.signAsync(payload);
        return { token }
    }
}
