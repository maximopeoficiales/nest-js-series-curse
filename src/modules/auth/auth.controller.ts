import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {

    }

    @Post("/signup")
    async signup(@Body() signupDto: SignupDto): Promise<void> {
        return this._authService.signup(signupDto);
    }

    @Post("/signin")
    async signin(@Body() signinDto: SigninDto): Promise<{ token: string; }> {
        return this._authService.signin(signinDto);
    }

}
