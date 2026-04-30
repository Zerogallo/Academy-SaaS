import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(file: Express.Multer.File, registerDto: RegisterDto): Promise<import("../users/user.entity").User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
