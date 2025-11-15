import { Controller, Post, Get, Body, Headers } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { RegisterDto } from "./dto/register.dto"
import { LoginDto } from "./dto/login.dto"

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  async logout(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    return this.authService.logout(token);
  }

  @Get('profile')
  async getProfile(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    const user = await this.authService.verifyToken(token);
    return this.authService.getUserProfile(user.id);
  }
}
