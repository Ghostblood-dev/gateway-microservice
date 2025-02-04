import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { NAST_SERVICES } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';

@Controller('auth')
export class AuthController {

  constructor(@Inject(NAST_SERVICES) private readonly authClient: ClientProxy) { }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authClient.send('auth.register.user', registerUserDto).pipe(
      catchError(error => {
        throw new RpcException(error)
      })
    )
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authClient.send('auth.login.user', loginUserDto).pipe(
      catchError(error => {
        throw new RpcException(error)
      })
    )
  }

  @UseGuards(AuthGuard)
  @Get('verify-token')
  verifyToken(@User() user: any, @Token() token: string) {
    return { user, token }
  }
}
